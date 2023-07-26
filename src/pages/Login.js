import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/auth.slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      console.log(values);
      dispatch(loginUser(values));
      navigate("/dashboard");
    },
  });
  return (
    <div className="w-[90%] md:w-1/2 container mx-auto">
      <form
        className="border p-5 my-5 shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-xl">
            Email
          </label>
          <input
            id="email"
            className="border p-2 rounded-md outline-0"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
        </div>
        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-xl">
            Password
          </label>
          <input
            id="password"
            className="border p-2 rounded-md outline-0"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />
        </div>
        <div className="my-2 flex flex-col gap-2">
          <button
            type="submit"
            className="bg-blue-500 py-3 rounded-md text-white"
          >
            Login
          </button>
        </div>

        <div className="my-2 flex items-center gap-2">
          <h1>Don't have account?</h1>
          <Link to={"/register"} className="text-blue-500">
            Click here to register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
