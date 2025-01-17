import React, { useState, useEffect } from "react";
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
  const [isLinkedInBrowser, setIsLinkedInBrowser] = useState(false);

  useEffect(() => {
    // Detect if the app is running inside LinkedIn's in-app browser
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/linkedin/i.test(userAgent)) {
      setIsLinkedInBrowser(true);
    }
  }, []);

  const googleSign = async () => {
    if (!isLinkedInBrowser) {
      window.open(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        "_self"
      );
    }
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

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/profile");
      } else if (response.status === 201) {
        setErr(response.data);
      } else if (response.status === 500) {
        setErr(response.data);
      }
    } catch (err) {
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
        background: "linear-gradient(135deg, #000000, #d4af37)",
        fontFamily: "'Arial', sans-serif",
        color: "#000",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "2px solid #d4af37",
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
            id="username"
            placeholder="Username"
            style={{
              marginBottom: "10px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37",
            }}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            style={{
              marginBottom: "10px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37",
            }}
          />
          <input
            id="email"
            placeholder="Email"
            style={{
              marginBottom: "20px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #d4af37",
            }}
          />
          <Button
            id="submit"
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#d4af37",
              color: "#000",
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
            disabled={isLinkedInBrowser}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              background: isLinkedInBrowser
                ? "#ccc"
                : "linear-gradient(90deg, #4285F4, #FBBC05, #EA4335)",
              color: isLinkedInBrowser ? "#666" : "#000",
              fontWeight: "bold",
              cursor: isLinkedInBrowser ? "not-allowed" : "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Sign up with Google
          </button>
        </div>
        {isLinkedInBrowser && (
          <p
            style={{
              color: "red",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Google Sign-up is not supported in the LinkedIn in-app browser.
            Please open the app in your browser to sign up.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
