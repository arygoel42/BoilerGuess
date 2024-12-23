import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: null,
    password: null,
    email: null,
  });
  const [err, setErr] = useState<string | null>(null);

  const googleSign = async () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, "_self");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      setUser({
        ...user,
        username: e.target[0].value,
        password: e.target[1].value,
        email: e.target[2].value,
      });

      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signUp`,
        {
          username: e.target[0].value,
          password: e.target[1].value,
          email: e.target[2].value,
        }
      );

      console.log("entering processing pipeline");

      if (response.status === 200) {
        console.log("success");
        console.log("user created", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("profile");
        setErr(null);
      } else if (response.status === 201) {
        console.log("user already created");
        setErr(response.data);
      } else if (response.status === 500) {
        console.log("something went wrong");
        setErr(response.data);
      }
    } catch (err) {
      console.log("error");
      if (err.response && err.response.data && err.response.data.message) {
        setErr(err.response.data.message); // Display error from the server
      } else {
        setErr("An unexpected error occurred."); // Fallback for network errors
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #000000, #d4af37)", // Black-to-Gold gradient
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
          Sign Up
        </h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            placeholder="Username"
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
              marginBottom: "10px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37", // Gold border for inputs
            }}
          />
          <input
            placeholder="Email"
            style={{
              marginBottom: "20px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37", // Gold border for inputs
            }}
          />
          <Button
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
            Submit
          </Button>
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

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={googleSign}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              background: "linear-gradient(90deg, #4285F4, #FBBC05, #EA4335)",
              color: "#000", // White text
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
