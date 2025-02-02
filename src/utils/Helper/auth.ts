import type {authCredentialType} from "../../utils/Types/local";

export const handleAuth = async (authCredential: authCredentialType, type: string) => {

    console.log(authCredential);
    const response = await fetch(`https://todo-app-backend-five-dusky.vercel.app/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: authCredential.username, password: authCredential.password})
    })
    const data = await response.json();
    return await data
}