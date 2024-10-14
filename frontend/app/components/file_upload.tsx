'use client'

import React, { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: Iterable<unknown> | ArrayLike<unknown>; }; }) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles as File[]]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });

    try {
      const response = await fetch('http://localhost:3000/images/multi', {
        method: 'POST',
        body: formData,
      });
      console.log(response.json);
      if (response.ok) {
        alert('Archivos subidos correctamente');
        setFiles([]);
      } else {
        alert('Error en la subida de archivos');
      }
    } catch (error) {
      console.error('Error al subir los archivos:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div
        className={`p-6 border-2 border-dashed rounded-lg text-center ${
          isDragging ? 'bg-fuchsia-800 border-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="mb-2 text-gray-500">Arrastra y suelta tus archivos aquí</p>
        <p className="text-gray-400">o</p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <div className='pt-4'>
          <label
            htmlFor="file-upload"
            className={`cursor-pointer ${isDragging ? " bg-stone-200 text-fuchsia-800": "bg-fuchsia-800 text-white"} p-2  rounded-lg`}
          >
            Seleccionar archivos
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700">Archivos seleccionados:</h4>
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Subir Archivos
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
