import React, { useState } from "react";
// import AppMenu from "../../Components/app-menu";
import useImageUploader from "../../Hooks/imageUpload";
// import { useSelector } from "react-redux";

const Dashboard = () => {
  let { imgMsg, base64Img, setBase64Img, handleImageChange } =
    useImageUploader();
  const [sideMenu, setSideMenu] = useState(false);

  return <div>Dashboard</div>;
};

export default Dashboard;
