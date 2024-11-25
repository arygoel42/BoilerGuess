import React from "react";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
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
        setWelcome(response.data.user.username);
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
    </div>
  );
};

export default LoginPage;

//the whole purpose of this component is to recive a valid jwt token or passport validation
