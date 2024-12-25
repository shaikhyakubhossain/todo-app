import Button from "@/components/Button/button.component";
import Input from "@/components/Input/input.component";

type propsType = {
    
}

export default function Signup() {
    return (
        <div className="text-center">
            <Input type="text" placeholder="Username" handleUpdateOnChange={(e) => setAuthCredential({ ...authCredential, username: e.target.value })} /><br/>
            <Input type="password" placeholder="Password" handleUpdateOnChange={(e) => setAuthCredential({ ...authCredential, password: e.target.value })} /><br/>
            <Input type="password" placeholder="Confirm Password" handleUpdateOnChange={(e) => setAuthCredential({ ...authCredential, confirmPassword: e.target.value })} /><br/>
            <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
    );
}