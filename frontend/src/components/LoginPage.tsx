import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<String | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:3011/api/auth/login", {
        //syntatical sugar for async to avoid callback hell.
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
        setErr(error.response.data.message); // Display error from the server
      } else {
        setErr("An unexpected error occurred."); // Fallback for network errors
      }
    }
  };
  const googleSign = async () => {
    window.open("http://localhost:3011/api/auth/google", "_self");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input type="text" placeholder="email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <p>
        {err ? (
          <p className="text-red-500">{err}</p>
        ) : (
          <p className="text-green-500">{welcome}</p>
        )}
      </p>

      <button onClick={googleSign}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;

//the whole purpose of this component is to recive a valid jwt token or passport validation
//go and review try catch and joi error handling when u are more awake
//go and review the authLog middleware
