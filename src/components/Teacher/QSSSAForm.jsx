import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchWithToken } from "../../helpers/fetch";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  topic: yup.string().required(),
  question: yup.string().required(),
  onlyRecordings: yup.boolean().required(),
});

export const QSSSAForm = () => {
  const history = useHistory();
  const [imgPreview, setImgPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    if (imgPreview) {
      formData.append("img", imgPreview);
    }
    const {
      qsssa: { accessCode },
    } = await fetchWithToken("qsssa", formData, "POST", true);
    history.push(`/shareCode/${accessCode}`);
  };

  return (
    <div className="form-main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-wrap">
          <h1>Create a QSSSA</h1>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your topic name"
            {...register("topic")}
          />
          <p style={{ color: "red" }} className="mb-2 mt-0">
            {errors.topic?.message && "Please enter a valid topic"}
          </p>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your question"
            {...register("question")}
          />
          <p style={{ color: "red" }} className="mb-2 mt-0">
            {errors.question?.message && "Please enter a valid question"}
          </p>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your Sentence Stem"
            {...register("sentenceStem")}
          />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="onlyRecordings"
              placeholder="Enter your Sentence Stem"
              {...register("onlyRecordings")}
            />
            <label className="form-check-label" htmlFor="onlyRecordings">
              Recording audio only
            </label>
          </div>
          <label htmlFor="qsssa-image" className="btn mt-3 btn-primary">
            <input
              className="d-none"
              type="file"
              name=""
              accept=".png,.jpg,.jpeg"
              id="qsssa-image"
              onChange={(e) => setImgPreview(e.target.files[0])}
            />
            Upload image
          </label>
          {imgPreview && (
            <img
              className="img-fluid mt-4"
              src={URL.createObjectURL(imgPreview)}
              alt="qsssa-preview"
            />
          )}
        </div>
        <div className="btn-main">
          <button type="submit" className="btn btn-primary">
            Create QSSSA
          </button>
        </div>
      </form>
    </div>
  );
};
