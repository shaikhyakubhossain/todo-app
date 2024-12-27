import Button from "@/components/Button/button.component";
import Input from "@/components/Input/input.component";

import type { authComponentType } from "@/utils/Types/local";


export default function Login(props: authComponentType) {
    return (
        <div className="text-center">
            <Input type="text" placeholder="Username" handleUpdateOnChange={(e) => props.updateUsername(e.target.value)} /><br/>
            <Input type="password" placeholder="Password" handleUpdateOnChange={(e) => props.updatePassword(e.target.value)} /><br/>
            <Button onClick={props.submit}>Login</Button>
            <div className="text-white">Don&apos;t have an account? <span onClick={() => props.updateAuthType("signup")} className="text-green-600 hover:text-green-700 cursor-pointer">Sign Up</span></div>
        </div>
    )
}