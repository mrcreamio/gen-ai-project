import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLogin } from "../../APIs/auth";
import { setUser } from "../../Redux/Slices/User";
import { useMutation } from "react-query";
import axios from "../../APIs/axios";

const Login = () => {
  const [loginMsg, setLoginMsg] = useState("");
  const dispatch = useDispatch();
  // const { mutateAsync, data, error, isLoading } = useLogin();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const { mutate, isLoading } = useMutation(
    (payload) => {
      return axios.post("/auth/login", payload);
    },
    {
      onSuccess: (res) => {
        const { data } = res;
        dispatch(setUser(data?.user));
      },
      onError: (err) => {
        setLoginMsg(err.response.data.message || "Request failed check network");
        console.log(err.response.data || err);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <div>
     Sign in
    </div>
  );
};

export default Login;
