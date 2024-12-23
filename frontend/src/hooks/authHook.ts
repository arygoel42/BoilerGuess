//purpose of this hook is to check to see if a user is logged in or not
//custom hook that will return a boolean value | user object | log out function  | and any thing else we need
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const authHook = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState<any>();

  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      let response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Ensure server knows to parse JSON
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      if (response.status === 200) {
        let data = await response.json();
        setLoggedIn(true);
        setUser(data);
        console.log(data);
      }

      if (response.status === 404) {
        setLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");

    try {
      let response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // Ensure server knows to parse JSON
          },
          body: JSON.stringify({ token }),
        }
      );

      if (response.ok) {
        console.log("logged out succsessfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to check if user is logged in

  //function to check if

  return { loggedIn, user, logout };
};

export default authHook;
