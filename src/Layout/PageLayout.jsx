// components/PageLayout.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../pages/Home/Components/Loader";

const PageLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.key]); // Trigger on route change

  return (
    <>
      {isLoading && <Loader />}
      <div className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
};

export default PageLayout;
