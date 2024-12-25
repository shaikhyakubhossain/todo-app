"use client";
import { useState } from "react";
import Signup from "./Signup/signup.component";
import Login from "./Login/login.component";
import { handleSignup } from "@/utils/Helper/auth";


import { useDispatch } from "react-redux";
import { setAuthDetail } from "../../../lib/features/AuthDetail/authDetailSlice";

export default function Auth() {

    const [authType, setAuthType] = useState("login");
    const [authCredential, setAuthCredential] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = () => {
            if (authCredential.password === authCredential.confirmPassword) {
                handleSignup(authCredential, authType);
            }
            
        }

    return (
        <div>
            {
                authType === "login" ? <Login /> : <Signup />
            }
        </div>
    )    
}