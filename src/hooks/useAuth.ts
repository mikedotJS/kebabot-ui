import axios from "axios";
import constate from "constate";
import { useEffect, useState } from "react";
import api from "../api";

export const [AuthContextProvider, useAuth] = constate(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(undefined);
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

      setUser(response.data.user);

      api.interceptors.request.use((config) => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${response.data.token.token}`,
        },
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("auth"))?.user;

    if (_user) setUser(_user);
  }, []);

  return { user, loading, login, setLoading, setUser };
});
