import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const [type, setType] = useState("Login");
  const { setShowLogin, backendUrl, setUser, setToken } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(type === 'Login'){
        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

        if(data.success){
          setUser(data.user)
          setToken(data.token)
          setShowLogin(false)
          localStorage.setItem('token', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})

        if(data.success){
          setUser(data.user)
          setToken(data.token)
          setShowLogin(false)
          localStorage.setItem('token', data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <img
          onClick={() => {
            setShowLogin(false);
          }}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {type}
        </h1>

        {type === "Login" ? (
          <p className="text-sm text-center">
            Welcome back! Please sign in to continue
          </p>
        ) : (
          <p className="text-sm text-center">
            Hey! Please create an account to start
          </p>
        )}

        {type !== "Login" && (
          <div className="border px-5 flex py-2 items-center rounded-full gap-1 mt-5">
            <img width={25} src={assets.profile_icon} alt="" />
            <input onChange={e => setName(e.target.value)} value={name}
              placeholder="Full Name"
              className="outline-none text-sm"
              type="text"
            />
          </div>
        )}

        <div className="border px-6 flex py-2 items-center rounded-full gap-2 mt-5">
          <img src={assets.email_icon} alt="" />
          <input onChange={e => setEmail(e.target.value)} value={email}
            placeholder="Email"
            className="outline-none text-sm"
            type="email"
          />
        </div>
        <div className="border px-6 flex py-2 items-center rounded-full gap-2 mt-5">
          <img src={assets.lock_icon} alt="" />
          <input onChange={e => setPassword(e.target.value)} value={password}
            placeholder="Password"
            className="outline-none text-sm"
            type="password"
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-blue-600 rounded-full py-2 text-white w-full">
          {type === "Login" ? "Login" : "Create Account"}
        </button>

        {type === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setType("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setType("Login")}
            >
              Login
            </span>
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Login;
