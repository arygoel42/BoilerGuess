import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<string | null>(null);
  const [isLinkedInBrowser, setIsLinkedInBrowser] = useState(false);

  useEffect(() => {
    // Detect if the app is running inside LinkedIn's in-app browser
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/linkedin/i.test(userAgent)) {
      setIsLinkedInBrowser(true);
    }
    console.log("connected");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email: e.target[0].value,
          password: e.target[1].value,
        },
        {
          withCredentials: true,
        }
      );

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
    if (!isLinkedInBrowser) {
      window.open(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        "_self"
      );
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
              border: "1px solid #d4af37",
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
              border: "1px solid #d4af37",
            }}
          />
          <button
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
              border: "1px solid #d4af37",
              background: isLinkedInBrowser
                ? "#ccc"
                : "linear-gradient(90deg, #4285F4, #FBBC05, #EA4335)",
              color: isLinkedInBrowser ? "#666" : "#000",
              fontWeight: "bold",
              cursor: isLinkedInBrowser ? "not-allowed" : "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
          >
            Login with Google
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
            Google Login is not supported in the LinkedIn in-app browser. Please
            open the app in your browser to log in.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
