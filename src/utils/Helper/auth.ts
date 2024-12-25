"use client";
import type {authCredentialType} from "../../utils/Types/local";

export const handleSignup = async (authCredential: authCredentialType, type: string) => {

    console.log(authCredential);
    const response = await fetch(`http://localhost:4000/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authCredential)
    })
    const data = await response.json();
    return data
}