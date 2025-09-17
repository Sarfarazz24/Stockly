import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/verify", {
          withCredentials: true, //  Send cookies
        });

        if (data.status) {
          setUsername(data.user);
          toast(`Hello ${data.user}`, {
            position: "top-right",
          });
        } else {
          window.location.href = "/login";
        }
      } catch (err) {
        window.location.href = "";
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
