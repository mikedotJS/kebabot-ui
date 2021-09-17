import axios, { AxiosInstance } from "axios";
import constate from "constate";
import React, { useState } from "react";

export const [AuthContextProvider, useAuth] = constate(() => {
  const [user, setUser] = useState<any>(undefined);
  const [api, setApi] = useState<AxiosInstance | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  async function login({ email, password }) {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3333/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("auth", JSON.stringify(response.data));

      const { token } = response.data;

      setApi(
        axios.create({
          baseURL: "http://localhost:3333",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth && user == null && api == null) {
      const { token } = auth.token;

      setApi(
        axios.create({
          baseURL: "http://localhost:3333",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      setUser(auth.user);
    }
  }, [api, user, setApi, setUser]);

  return { api, user, loading, login, setLoading, setUser, setApi };
});
