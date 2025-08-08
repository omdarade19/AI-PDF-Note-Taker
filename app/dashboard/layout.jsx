import React from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

function DashboardLayout({children}){
    return(
    <div>
        <div className="md:w-64 fixed">
            <SideBar/>
        </div>

        <div className="md:ml-64">
            <Header/>

             <div className="m-10">
            {children}
             </div>
        </div>
      
     </div>
    )
}

export default DashboardLayout