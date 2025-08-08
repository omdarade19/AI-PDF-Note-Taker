"use client"
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditer from "../_components/TextEditer";

function Workpace(){
    const {fileId}=useParams();
    console.log(fileId);
    const fileInfo=useQuery(api.fileStorage.GetFileRecord,{
        fileId:fileId
    })

    useEffect(()=>{
        console.log(fileInfo)
    },[fileInfo])
   
    return(
        <div>
          <WorkspaceHeader fileName={fileInfo?.fileName}/>

          <div className="grid grid-cols-2 gap-5">
              
              <div>
                {/* text Editor */}
                <TextEditer fileId={fileId}/>
              </div>
               <div>
                {/* Pdf viewer */}
                <PdfViewer fileUrl={fileInfo?.fileUrl}/>
              </div>
          </div>
        </div>
    )
}

export default Workpace;