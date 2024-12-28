"use client";
import { useState, useEffect, useRef } from "react";
import Signup from "./Signup/signup.component";
import Login from "./Login/login.component";
import Toast from "../Toast/toast.component";
import { handleAuth } from "@/utils/Helper/auth";

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetail } from "@/lib/features/AuthDetail/authDetailSlice";

export default function Auth() {
  const [toast, setToast] = useState(true);
  const [authType, setAuthType] = useState("signup");
  const [authCredential, setAuthCredential] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { token } = useSelector((state: RootState) => state.authDetail);

  const errorMessages = useRef<string | null>(null)

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
        errorMessages.current = data
        setToast(true);
      }
    });
  };

  useEffect(() => {
    console.log(token);
    if(token){
      window.location.href = "/Dashboard";
    }
  }, [token]);

  useEffect(() => {
    const clearToast = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(clearToast);
    };
  }, [toast]);

  return (
    <div>
      {<Toast show={toast} message={errorMessages.current} />}
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
