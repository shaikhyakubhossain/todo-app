import Button from "@/components/Button/button.component";
import Input from "@/components/Input/input.component";
import type { authComponentType } from "@/utils/Types/local";

export default function Signup(props: authComponentType) {
    return (
        <div className="text-center">
            <Input type="text" placeholder="Username" handleUpdateOnChange={(e) => props.updateUsername(e.target.value)} /><br/>
            <Input type="password" placeholder="Password" handleUpdateOnChange={(e) => props.updatePassword(e.target.value)} /><br/>
            <Input type="password" placeholder="Confirm Password" handleUpdateOnChange={(e) => props.updateConfirmPassword && props.updateConfirmPassword(e.target.value)} /><br/>
            <Button onClick={props.submit}>Sign Up</Button>
            <div className="text-white">Already have an account? <span onClick={() => props.updateAuthType("login")} className="text-green-600 hover:text-green-700 cursor-pointer">Login</span></div>
        </div>
    );
}