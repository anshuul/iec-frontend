import React, { useState } from "react";

const DownloadAllPdf = ({ attachmentPaths }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      try {
        for (const path of attachmentPaths) {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.href = url;
          a.download = path.split("/").pop(); // Set the file name
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDownloadAll}
      disabled={isDownloading}
      className={`flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded ${
        isDownloading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isDownloading ? "Downloading..." : "Download All Attachments"}
    </button>
  );
};

export default DownloadAllPdf;
