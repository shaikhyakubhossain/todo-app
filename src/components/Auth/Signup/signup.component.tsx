import Button from "@/components/Button/button.component";
import Input from "@/components/Input/input.component";

type propsType = {
    updateUsername: (username: string) => void;
    updatePassword: (password: string) => void;
    updateConfirmPassword: (confirmPassword: string) => void;
    submit: () => void;
}

export default function Signup(props: propsType) {
    return (
        <div className="text-center">
            <Input type="text" placeholder="Username" handleUpdateOnChange={(e) => props.updateUsername(e.target.value)} /><br/>
            <Input type="password" placeholder="Password" handleUpdateOnChange={(e) => props.updatePassword(e.target.value)} /><br/>
            <Input type="password" placeholder="Confirm Password" handleUpdateOnChange={(e) => props.updateConfirmPassword(e.target.value)} /><br/>
            <Button onClick={props.submit}>Sign Up</Button>
        </div>
    );
}