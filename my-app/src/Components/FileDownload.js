import React from 'react';
import { FaCircleArrowRight } from "react-icons/fa6";
const FileDownload = ({ filename, fileUrl }) => {
  const handleDownload = () => {
    window.open(fileUrl, '_blank'); // Open the file URL in a new tab
  };

  return (
    <div style={{display:"flex",alignItems:"center",gap:"20px",justifyContent:"space-between",marginTop:"10px"}}>
      <p style={{fontWeight:"bold"}}><FaCircleArrowRight /> {filename}</p>
      <div className='downloadbutton'>
      <button onClick={handleDownload}>Download</button>
      </div>
      </div>
  );
};

export default FileDownload;
