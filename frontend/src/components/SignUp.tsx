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
        "http://localhost:3011/api/users/signUp",
        {
          username: e.target[0].value,
          password: e.target[1].value,
          email: e.target[2].value,
        }
      );

      console.log("entering processing pipline");

      if (response.status === 200) {
        console.log("success");
        console.log("user created", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/");
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
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input placeholder="username"></input>
        <input placeholder="password"></input>
        <input placeholder="email"></input>

        <Button type="submit">Submit</Button>
      </form>

      {err != null ? <text color="red"> {err}</text> : null}
    </div>
  );
};

export default SignUp;
