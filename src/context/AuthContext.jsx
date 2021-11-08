import { createContext, useState, useCallback } from "react";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
  role: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const register = async (name, email = "", password = "", role = "") => {
    const params =
      email && password && role ? { name, email, password, role } : { name };
    const resp = await fetchWithoutToken("auth/register", params, "POST");

    if (resp.ok) {
      const { user, token } = resp;
      localStorage.setItem("token", token);
      setAuth({
        uid: user.id,
        name: user.name,
        checking: false,
        logged: true,
        email: user.email,
        role: user.role.role,
      });
      return resp.ok;
    }
    return resp.msg;
  };

  const login = async (email, password) => {
    const resp = await fetchWithoutToken(
      "auth/login",
      { email, password },
      "POST"
    );
    if (resp.ok) {
      const { token, user } = resp;
      localStorage.setItem("token", token);
      setAuth({
        uid: user.id,
        name: user.name,
        checking: false,
        logged: true,
        email: user.email,
        role: user.role.role,
      });
    }
    return resp.ok;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ ...initialState, checking: false });
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({ ...initialState, checking: false });
      return false;
    }
    const resp = await fetchWithToken("auth/renew");
    if (resp.ok) {
      const { token, user } = resp;
      localStorage.setItem("token", token);
      setAuth({
        uid: user.id,
        name: user.name,
        checking: false,
        logged: true,
        emai: user.email,
        role: user.role.role,
      });

      return resp.ok;
    }
    setAuth({ ...initialState, checking: false });
    return false;
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, login, register, verifyToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
