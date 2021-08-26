import axios from "axios";
import constate from "constate";
import React, { useState } from "react";

async function login({ email, password }) {
  const response = await axios.post(
    "http://localhost:3333/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  localStorage.setItem("auth", JSON.stringify(response.data));
}

export const [AuthContextProvider, useAuth] = constate(() => {
  const [user, setUser] = useState<any>(undefined);
  const [api, setApi] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      setApi(
        axios.create({
          baseURL: "http://localhost:3333",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
      );

      setUser(auth.user);
    }

    setLoading(false);
  }, []);

  return { api, user, loading, login };
});
