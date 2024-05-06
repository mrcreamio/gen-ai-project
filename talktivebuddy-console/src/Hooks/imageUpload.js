import { useState } from "react";

const useImageUploader = () => {
  const [imgMsg, setImgMsg] = useState("");
  const [base64Img, setBase64Img] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      let validExtensions = /\.(jpg|jpeg|png)$/;
      if (!validExtensions.test(file.name)) {
        setImgMsg("Only (.jpg, .jpeg, .png) Allowed!");
        e.target.value = "";
      } else if (file.size > 5 * 1024 * 1024) {
        setImgMsg("Image size must be 5MB or less!");
        e.target.value = "";
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          setBase64Img(base64);
          setImgMsg("");
        };
        reader.onerror = function (error) {
          setImgMsg(error.message);
          e.target.value = "";
        };
      }
    }
  };

  return { imgMsg, base64Img, setBase64Img, setImgMsg, handleImageChange };
};

export default useImageUploader;
