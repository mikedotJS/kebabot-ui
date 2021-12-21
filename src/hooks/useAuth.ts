import axios from "axios";
import constate from "constate";
import { useEffect, useState } from "react";
import api from "../api";
import { API_URL } from "../constants";

export const [AuthContextProvider, useAuth] = constate(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  async function login({ email, password }) {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("auth", JSON.stringify(response.data));

      const _response = await api.get("/viewer", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      const user = _response.data;

      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    localStorage.removeItem("auth");

    setUser(undefined);
  }

  useEffect(() => {
    const getViewer = async () => {
      setLoading(true);

      try {
        const response = await api.get("/viewer");

        const _user = response.data;

        if (_user) setUser(_user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getViewer();
  }, []);

  return { user, loading, login, setLoading, setUser, logout };
});
