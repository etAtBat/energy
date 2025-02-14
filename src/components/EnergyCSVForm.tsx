"use client"
import React, { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadTos3 = async (CSVInput: any) => {
  // get url from server
  let s3URL;
  try {
    const s3URLreq = await fetch("/api/s3-csv-url");
    const { uploadURL } = await s3URLreq.json();
    s3URL = uploadURL;
  } catch (error) {
    console.error(error);
    // handle the error that happened when we tried to get signed URL
  }


  // post csv to s3 bucket
  try {
    await fetch(s3URL, {
      method: "PUT",
      body: CSVInput,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  } catch (error) {
    console.error(error);
    // handle the error that happened when we tried to put .csv to s3
  }

  alert("Upload successful");
};

export const EnergyCSVForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  return (
    <form id="image-form" onSubmit={(e) => {
      e.preventDefault();
      const file = ref.current?.files?.[0];
      if (file) {
        uploadTos3(file);
      }
    }}>
      <input id="image-input" type="file" accept=".csv" ref={ref}></input>
      <button type="submit">Upload</button>
    </form>
  );
};
