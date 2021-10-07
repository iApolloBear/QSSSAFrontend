import { useState } from "react";
import { LoginForm } from "../components/Auth/LoginForm";
import { RegisterForm } from "../components/Auth/RegisterForm";
import { GuestForm } from "../components/Auth/GuestForm";

export const LoginPage = () => {
  const [option, setOption] = useState("login");
  return (
    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <p className="logo website-logo-inside">QSSSA</p>
              <div className="page-links">
                <button
                  onClick={() => setOption("login")}
                  className={option === "login" ? "active" : ""}
                >
                  Login
                </button>
                <button
                  onClick={() => setOption("register")}
                  className={option === "register" ? "active" : ""}
                >
                  Register
                </button>
                <button
                  onClick={() => setOption("guest")}
                  className={option === "guest" ? "active" : ""}
                >
                  Guest
                </button>
              </div>
              {option === "login" && <LoginForm />}
              {option === "register" && <RegisterForm />}
              {option === "guest" && <GuestForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
