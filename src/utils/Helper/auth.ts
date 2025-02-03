import type {authCredentialType} from "../../utils/Types/local";

// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://todo-app-backend-five-dusky.vercel.app';

export const handleAuth = async (authCredential: authCredentialType, type: string) => {

    console.log(authCredential);
    const response = await fetch(`${baseUrl}/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: authCredential.username, password: authCredential.password})
    })
    const data = await response.json();
    console.log(data);
    return await data
}