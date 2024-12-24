"use client";
import { useState } from "react";
import Button from "@/components/Button/button.component";
import Input from "@/components/Input/input.component";

export default function Signup() {

    const [authDetail, setAuthDetail] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleSignup = async () => {
        console.log(authDetail);
        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authDetail)
        })
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="text-center">
            <Input type="text" placeholder="Username" handleUpdateOnChange={(e) => setAuthDetail({ ...authDetail, username: e.target.value })} /><br/>
            <Input type="password" placeholder="Password" handleUpdateOnChange={(e) => setAuthDetail({ ...authDetail, password: e.target.value })} /><br/>
            <Input type="password" placeholder="Confirm Password" handleUpdateOnChange={(e) => setAuthDetail({ ...authDetail, confirmPassword: e.target.value })} /><br/>
            <Button onClick={handleSignup}>Sign Up</Button>
        </div>
    );
}