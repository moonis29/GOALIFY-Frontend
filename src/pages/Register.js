import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerUser } from "../redux/features/auth.slice";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      console.log(values);
      dispatch(registerUser(values));
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
          <label htmlFor="username" className="font-medium text-xl">
            Username
          </label>
          <input
            id="username"
            className="border p-2 rounded-md outline-0"
            placeholder="Enter Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
          />
        </div>
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
            Register
          </button>
        </div>

        <div className="my-2 flex items-center gap-2">
          <h1>Already have account?</h1>
          <Link to={"/login"} className="text-blue-500">
            Click here to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
