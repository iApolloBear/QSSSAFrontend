import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchWithoutToken } from "../../helpers/fetch";
import { CodeJoinForm } from "./CodeJoinForm";

const schema = yup.object().shape({
  code: yup.string().required().length(6),
});

export const CodeForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [qsssa, setQSSSA] = useState({});
  const [join, setJoin] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ code }) => {
    setLoading(true);
    const resp = await fetchWithoutToken(`qsssa/${code}`);
    if (!resp.ok) {
      setError("code", {
        type: "Not found",
        message: "QSSSA Not Found",
      });
      setJoin(false);
    } else {
      setQSSSA(resp.qsssa);
      setJoin(true);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="form-wrap">
        <h1>Enter your code here:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="code-main">
            <div className="input-group">
              <input
                type="text"
                placeholder="Code"
                className="form-control mb-0"
                {...register("code")}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-small btn-primary">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Go!"
                  )}
                </button>
              </div>
            </div>
          </div>

          <p style={{ color: "red" }} className="mb-2 mt-3">
            {errors.code?.message && "Please enter a valid code"}
          </p>
        </form>
      </div>
      {join && <CodeJoinForm qsssa={qsssa} />}
    </>
  );
};
