import { useMutation, useQuery } from "react-query";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/User";

export const useSignUp = () => {
  const handleSignUp = (payload) => {
    return axios.post("/auth/register", payload);
  };

  return useMutation(handleSignUp, {
    onSuccess: (res) => {
      const { data } = res;
      dispatch(setUser(data?.user));
    },
    onError: (err) => {
      console.log(err.response.data.message || err);
      dispatch(setUser(null));
      return err;
    },
  });
};

export const useLogin = () => {
  const handleLogin = async (payload) => {
    const response = await axios.post("/auth/login", payload);
    return response.data;
  };

  return useMutation(handleLogin);
};

export const useReadUser = () => {
  const dispatch = useDispatch();
  const handleReadUser = () => {
    return axios.get("/auth/user");
  };

  return useQuery("validateUser", handleReadUser, {
    select: (data) => data?.data,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: (err) => {
      console.log(err.response.data.message || err);
      // dispatch(setUser(null));
    },
  });
};
