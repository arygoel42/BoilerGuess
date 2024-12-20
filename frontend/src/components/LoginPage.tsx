import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleSignInImg from "../assets/googleSignIn.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<String | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:3011/api/auth/login", {
        email: e.target[0].value,
        password: e.target[1].value,
      });

      if (response.status === 200) {
        setErr(null);
        localStorage.setItem("token", response.data.token);
        navigate("/profile");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      } else {
        setErr("An unexpected error occurred.");
      }
    }
  };

  const googleSign = async () => {
    window.open("http://localhost:3011/api/auth/google", "_self");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #000000, #d4af37)",
        fontFamily: "'Arial', sans-serif",
        color: "#000", // Black text
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "2px solid #d4af37", // Gold border
        }}
      >
        <h2
          style={{ textAlign: "center", color: "#000", marginBottom: "20px" }}
        >
          Login
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            placeholder="Email"
            style={{
              marginBottom: "10px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37", // Gold border for inputs
            }}
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              marginBottom: "20px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37", // Gold border for inputs
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#d4af37", // Gold background
              color: "#000", // Black text
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>

        {err && (
          <p
            style={{
              color: "red",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {err}
          </p>
        )}
        {welcome && (
          <p
            style={{
              color: "green",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {welcome}
          </p>
        )}

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={GoogleSignInImg}
            alt="Sign in with Google"
            onClick={googleSign}
            style={{
              transform: "scale(0.5)",
              cursor: "pointer",
              maxWidth: "100%", // Ensure the image scales properly
              height: "auto", // Maintain aspect ratio
              border: "none", // No border
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
