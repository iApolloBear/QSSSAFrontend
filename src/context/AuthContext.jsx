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

  const register = async (name, accessCode) => {
    const resp = await fetchWithoutToken(
      "students",
      { name, qsssaId: accessCode },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { student } = resp;
      setAuth({
        uid: student._id,
        name: student.name,
        checking: false,
        logged: true,
        qsssa: student.qsssa.accessCode,
      });
      return resp.ok;
    }
    return resp.msg;
  };

  const login = async (email, password) => {
    const resp = await fetchWithoutToken(
      "users/login",
      { email, password },
      "POST"
    );
    if (resp.ok) {
      const { token, user } = resp;
      localStorage.setItem("token", token);
      setAuth({
        uid: user._id,
        name: user.name,
        checking: false,
        logged: true,
        email: user.email,
        role: user.role,
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
    const resp = await fetchWithToken("users/renew");
    if (resp.ok) {
      const { token, user } = resp;
      localStorage.setItem("token", token);
      setAuth({
        uid: user._id,
        name: user.name,
        checking: false,
        logged: true,
        emai: user.email,
        role: user.role,
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
