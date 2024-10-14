'use client'

import React, { useEffect, useState } from 'react';
import { IoIosDownload } from "react-icons/io";

const FileList = () => {
  const [files, setFiles] = useState([]);

  // Cargar la lista de archivos desde el servidor

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:3000/files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error al obtener la lista de archivos:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [files]);

  // Descargar archivo
  const handleDownload = (filename: never) => {
    window.location.href = `http://localhost:3000/files/download/${filename}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">
      {/* <button onClick={fetchFiles} className='px-2 text-gray-200'>↻</button> */}
        Archivos Subidos
      </h2>
      {files.length > 0 ? (
        <ul className="list-disc pl-5">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center mb-2 border-b border-gray-800 py-4">
              <span className="text-gray-700">{file}</span>
              <button
                onClick={() => handleDownload(file)}
                className="bg-gray-800 text-white px-4 py-1 rounded-lg"
              >
                <IoIosDownload />
              </button>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay archivos subidos aún.</p>
      )}
    </div>
  );
};

export default FileList;
