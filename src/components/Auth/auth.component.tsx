"use client";
import { useState, useEffect } from "react";
import Signup from "./Signup/signup.component";
import Login from "./Login/login.component";
import Toast from "../Toast/toast.component";
import { handleAuth } from "@/utils/Helper/auth";

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetail } from "@/lib/features/AuthDetail/authDetailSlice";

export default function Auth() {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [authType, setAuthType] = useState("signup");
  const [authCredential, setAuthCredential] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { token } = useSelector((state: RootState) => state.authDetail);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      authCredential.confirmPassword !== "" &&
      authCredential.password !== authCredential.confirmPassword
    )
      return;
    const data = handleAuth(authCredential, authType);
    data.then((data) => {
      if(data.token){
        dispatch(setAuthDetail({ username: data.username, token: data.token }));
      }
      else{
        setToast({ show: true, message: data });
      }
    });
  };

  useEffect(() => {
    console.log(token);
    if(token){
      window.location.href = "/Dashboard";
    }
  }, [token]);

  return (
    <div>
      {<Toast show={toast.show} message={toast.message} hide={() => setToast({ show: false, message: "" })} />}
      {authType === "login" ? (
        <Login
          updateAuthType={() => setAuthType("signup")}
          updateUsername={(e) =>
            setAuthCredential({ ...authCredential, username: e })
          }
          updatePassword={(e) =>
            setAuthCredential({ ...authCredential, password: e })
          }
          submit={handleSubmit}
        />
      ) : (
        <Signup
          updateAuthType={() => setAuthType("login")}
          updateUsername={(e) =>
            setAuthCredential({ ...authCredential, username: e })
          }
          updatePassword={(e) =>
            setAuthCredential({ ...authCredential, password: e })
          }
          updateConfirmPassword={(e) =>
            setAuthCredential({ ...authCredential, confirmPassword: e })
          }
          submit={handleSubmit}
        />
      )}
    </div>
  );
}
