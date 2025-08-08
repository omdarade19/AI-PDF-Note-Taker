'use client'
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ingest } from "@/convex/myAction";
import { toast } from "sonner";

function UploadPdfDialog({children, isMaxFiles}){

  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry= useMutation(api.fileStorage.AddFileEntryToDb);
  const embeddDocument= useAction(api.myAction.ingest);
  const getFileUrl= useMutation(api.fileStorage.getFileUrl);
  const [file,setFile]=useState();
  const [loading,setLoading]=useState(false);
  const {user}= useUser();
  const [fileName,setFileName]=useState();
  const [open, setOpen]=useState(false);
  const onFileSelect=(event)=>{
    setFile(event.target.files[0]);
  }

  const OnUpload=async(event)=>{
     setLoading(true)
    //  1: Get short lived upload url
     const postUrl= await generateUploadUrl();

     //2: Post the file to the Url
     const result= await fetch(postUrl,{
          method: "POST",
          headers: {"Content-Type": file?.type},
          body: file,
     });
     const { storageId }= await result.json();
     console.log("storageId ",storageId);
     const fileId = uuid4();//save newly allocated storage id to the database

     const fileUrl=await getFileUrl({storageId:storageId})

     const resp= await addFileEntry({
      fileId:fileId,
      storageId:storageId,
      fileName:fileName??'untitled File',
      fileUrl:fileUrl,
      createdBy:user?.primaryEmailAddress?.emailAddress
     })

     console.log(resp);

     // api Call to fetch PDF process data
     const ApiResp= await axios.get('/api/pdf-loader?pdfUrl='+fileUrl);
     console.log(ApiResp.data.result);
     await embeddDocument({
      splitText:ApiResp.data.result,
      fileId:fileId,
     });
     //console.log(embeddresult)
     setLoading(false);
     setOpen(false);

     toast("PDF Uploaded !");
  }

    return(
      <Dialog open={open}>
  <DialogTrigger asChild>
    <Button onClick={()=>setOpen(true)} disabled={isMaxFiles} className='w-full'>+Upload Pdf File !</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload PDF File</DialogTitle>
      <DialogDescription asChilde>
           <div>
            <h2 className="mt-5"> Select a file to upload</h2>
              <div className="gap-2 p-3 rounded-md border">
            
                 <input className=" hover:bg-slate-100 " type="file" accept="application/pdf"
                  onChange={(event)=>{
                    onFileSelect(event);
                  }}/>
              </div>

              <div>
                <label>File Name</label>
                 <Input placeHolder="File Name" 
                 onChange={(e)=>setFileName(e.target.value)} />
              </div>

           </div>
      </DialogDescription>
     </DialogHeader>
     <DialogFooter>
        <DialogClose asChild>
           <Button type="button" variant="secondary">
             Close
           </Button>
        </DialogClose>
        <Button onClick={OnUpload} disabled={loading}>
          {loading?
          <Loader2Icon className="animate-spin"/>:'Upload'
       }
       </Button>
     </DialogFooter>
    </DialogContent>
  </Dialog>  
    )
}

export default UploadPdfDialog