import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import Picker from "emoji-picker-react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("The email is required"),
  password: yup.string().required("Password is required"),
});

export const RegisterForm = () => {
  const { register: userRegister } = useContext(AuthContext);
  const [emoji, setEmoji] = useState(false);
  const [name, setName] = useState("");

  const onChange = ({ target }) => setName(target.value);
  const onEmojiClick = (e, { emoji }) => setName(`${name}${emoji}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password, role } = data;
    userRegister(name, email, password, role);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control mb-0"
          name="name"
          value={name}
          onChange={onChange}
        />
        <button
          type="button"
          className="code-button btn-small btn btn-primary"
          onClick={() => setEmoji(!emoji)}
        >
          {!emoji ? "\uD83D\uDE00" : "\u2715"}
        </button>
        <Picker
          pickerStyle={{
            position: "absolute",
            right: "0",
            bottom: "100%",
            zIndex: "9",
            display: emoji ? "flex" : "none",
          }}
          onEmojiClick={onEmojiClick}
        />
      </div>
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
