import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("The name is required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("The email is required"),
  password: yup.string().required("Password is required"),
});

export const RegisterForm = () => {
  const { register: userRegister } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    userRegister(name, email, password, role);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="form-control"
        placeholder="Full Name"
        {...register("name")}
      />
      <p style={{ color: "red" }} className="mb-2 mt-0">
        {errors.name?.message}
      </p>
      <input
        type="email"
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
      <select className="form-select form-select-lg" {...register("role")}>
        <option value="STUDENT_ROLE">Student</option>
        <option value="TEACHER_ROLE">Teacher</option>
      </select>

      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Register
        </button>
      </div>
    </form>
  );
};
