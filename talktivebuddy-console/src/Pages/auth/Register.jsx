import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "../../APIs/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/User";

const Signup = () => {
  const dispatch = useDispatch();
  const defaultRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    userName: "",
  };

  const [registerData, setRegisterData] = useState(defaultRegister);
  const [steps, setSteps] = useState(1);
  const [imgMsg, setImgMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      let validExtensions = /\.(jpg|jpeg|png)$/;
      if (!validExtensions.test(file.name)) {
        setImgMsg("Only (.jpg, .jpeg, .png) Allowed!");
        e.target.value = "";
      } else if (file.size > 5 * 1024 * 1024) {
        setImgMsg("Image size must be 5MB or less!");
        e.target.value = "";
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64 = reader.result;
          setRegisterData({ ...registerData, image: base64 });
          setImgMsg("");
        };
        reader.onerror = function (error) {
          setImgMsg(error.message);
          e.target.value = "";
        };
      }
    }
  };

  const { mutate, isLoading } = useMutation(
    (payload) => axios.post("/auth/register", payload),

    {
      onSuccess: (res) => {
        const { data } = res;
        dispatch(setUser(data?.user));
      },
      onError: (err) => {
        const msg = err.response.data.message || "Request failed check network";
        console.log(msg || err);
        setImgMsg(msg);
        dispatch(setUser(null));
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (steps === 1) {
      setSteps(2);
    } else {
      mutate(registerData);
    }
  };

  const { mutate: verifyMail, isLoading: verifyMailLoading } = useMutation(
    (payload) => axios.post("/auth/verifyMail", payload),

    {
      onSuccess: (res) => {
        setImgMsg("");
        setSteps(2);
      },
      onError: (err) => {
        const msg =
          err.response.data.message || "Request failed check network!";
        console.log(msg || err);
        setImgMsg(msg);
      },
    }
  );

  const handleVerifyMail = (e) => {
    e.preventDefault();
    verifyMail({ email: registerData.email });
  };

  return <div>register</div>;
};

export default Signup;
