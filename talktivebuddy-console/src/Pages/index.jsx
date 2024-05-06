import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
const Home = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [mobileSideMenu, setMobileSideMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileSideMenu(false);
  }, [screenWidth >= 991]);

  const togleSideMenu = () => {
    setMobileSideMenu(!mobileSideMenu);
  };

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const transform = `translate(${mousePosition.x * 0.04}px, ${
    mousePosition.y * 0.04
  }px)`;

  useEffect(() => {
    removeClassToBody(["background"]);
    addClassToBody(["no-footer"]);
  }, []);

  return (
    <div>
      <Button color="primary">Click me</Button>
    </div>
  );
};

export default Home;
