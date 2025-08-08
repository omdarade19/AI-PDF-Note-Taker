"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress"
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideBar(){

      const { user } = useUser();
      const path= usePathname();
      const GetUserInfo= useQuery(api.user.GetUserInfo,{
        userEmail:user?.primaryEmailAddress?.emailAddress
      })

      console.log(GetUserInfo);
    
      const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

    return(

        <div className="shadow-md h-screen p-7">
         
         <Image src={'/logo.svg'} alt='logo' width={170} height={120}/>

          <div className="mt-10">
             
             <UploadPdfDialog isMaxFiles={(fileList?.length>=5&&!GetUserInfo.upgrade)?true:false} >
                 <Button className="w-full">+Upload PDF</Button>
             </UploadPdfDialog>
            
            <Link href={'/dashboard'}>
             <div className={`flex gap-2 items-center p-3 mt-1 
               hover:bg-slate-100 rounded-lg cursor-pointer ${path=='/dashboard'&&'bg-slate-200'} `}>
                <Layout/>
                <h2>Workpace</h2>
             </div>
             </Link>

            <Link href={'/dashboard/upgrade'}>
              <div className={`flex gap-2 items-center p-3 mt-1 
               hover:bg-slate-100 rounded-lg cursor-pointer ${path=='/dashboard/upgrade'&&'bg-slate-200'}`}>
                <Shield/>
                <h2>Upgrade</h2>
             </div>
             </Link>
           </div>

          {!GetUserInfo?.upgrade && <div className="absolute bottom-24 w-[80%]">
               <Progress value={fileList?.length/5*100}/> 
               <p className="text-sm mt-1">{fileList?.length} out of 5 pdf Uploaded </p>
                <p className="text-sm mt-2 text-gray-400">Upgrade to upload more PDF </p>
           </div>}

        </div>

       
     
    )
}

export default SideBar