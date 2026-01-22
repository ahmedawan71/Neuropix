import axios from "axios";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credits, setCredits] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message || "Failed to generate image");
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
        return null;
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate image"
      );
      loadCreditsData();
      return null;
    }
  };

  const logout = () => {
    navigate('/');
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredits(0);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    credits,
    setCredits,
    token,
    setToken,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
