import React, { useState } from "react";
import AWS from "aws-sdk";
import { getSession } from "next-auth/react";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    if (!selectedFile) return console.log("No file selected");

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: selectedFile.name,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      if (!params) return console.log("No params");
      const response = await s3.upload(params).promise();
      console.log("Upload successful:", response.Location);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="border-2 flex flex-col w-[50%]">
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
