"use client";
import { useState } from "react";
import Signup from "./Signup/signup.component";
import Login from "./Login/login.component";
import { handleAuth } from "@/utils/Helper/auth";

import { useDispatch } from "react-redux";
import { setAuthDetail } from "../../../lib/features/AuthDetail/authDetailSlice";

export default function Auth() {

    const [authType, setAuthType] = useState("signup");
    const [authCredential, setAuthCredential] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = () => {
            if (authCredential.confirmPassword !== "" && authCredential.password !== authCredential.confirmPassword) return;
            const data = handleAuth(authCredential, authType);
            console.log(data);
        }

    return (
        <div>
            {
                authType === "login" ? <Login /> : <Signup updateUsername={(e) => setAuthCredential({...authCredential, username: e})} updatePassword={(e) => setAuthCredential({...authCredential, password: e})} updateConfirmPassword={(e) => setAuthCredential({...authCredential, confirmPassword: e})} submit={handleSubmit} />
            }
        </div>
    )    
}