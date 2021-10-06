import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;
    const ok = login(email, password);
    console.log(ok);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="form-control"
        placeholder="E-mail Address"
        {...register("email")}
      />
      <p style={{ color: "red" }} className="mb-2 mt-0">
        {errors.email?.message}
      </p>
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        {...register("password")}
      />
      <p style={{ color: "red" }} className="mb-2 mt-0">
        {errors.password?.message}
      </p>
      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </div>
    </form>
  );
};
