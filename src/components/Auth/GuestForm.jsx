import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const GuestForm = () => {
  const { register: userRegister } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { name } = data;
    userRegister(name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        {...register("name")}
      />
      <p style={{ color: "red" }} className="mb-2 mt-0">
        {errors.name?.message}
      </p>

      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Join
        </button>
      </div>
    </form>
  );
};
