"use client"

import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AvatarForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  console.log('fileUrl', fileUrl)


  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/users/upload', formData);
      const uploadedFileUrl = response.data.fileUrl;
      console.log(uploadedFileUrl)

      toast("uploaded")

      setFileUrl(uploadedFileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <label>
          <input type="file" accept=".png, .jpg, .jpeg, .webp" onChange={handleChange} />
        </label>
        <button type="submit">Upload</button>
      </form>

      {fileUrl && (
        <>
          <p>Uploaded image:</p>
          <img src={fileUrl} alt="Uploaded image" width={20} height={20}/>
        </>
      )}
    </div>
  );
};

export default AvatarForm;
