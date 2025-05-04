"use client";
import FileLoader from "./FilesContainer";
import { useState, useEffect } from "react";
import { GridDev } from "@/page/auth/ui/GridDev";

import { UploadFilesRoute } from "./UploadFilesRoute";




export const AccountPage = () => {

  
 


  return (
    <>
      <GridDev/>

      <div className="w-4/5 max-w-screen-md mx-auto">

        
          
        

        <FileLoader/>
   
        
  
          
  
        
      </div>
      
    </>
  );
};

