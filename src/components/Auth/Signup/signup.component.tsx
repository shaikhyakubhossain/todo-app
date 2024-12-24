"use client";
import { useState } from "react";
import Button from "@/components/Button/button.component";

export default function Signup() {

    const [authDetail, setAuthDetail] = useState({
        username: "",
        password: ""
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
            <input type="text" placeholder="Username" value={authDetail.username} onChange={(e) => setAuthDetail({ ...authDetail, username: e.target.value })} /><br/>
            <input type="password" placeholder="Password" value={authDetail.password} onChange={(e) => setAuthDetail({ ...authDetail, password: e.target.value })} /><br/>
            <input type="password" placeholder="Confirm Password" value={authDetail.password} onChange={(e) => setAuthDetail({ ...authDetail, password: e.target.value })} /><br/>
            <Button onClick={handleSignup}>Sign Up</Button>
        </div>
    );
}