import Button from "@/components/Button/button.component";

type PropsType = {
    toggle: boolean;
};

export default function Dropdown(props: PropsType) {
    return (
        <div style={{display: props.toggle ? "flex" : "none"}} className="absolute right-3 top-14 flex flex-col justify-center px-4 py-1 items-center bg-gray-600 shadow-md rounded-md">
            <div><Button>Logout</Button></div>
        </div>
    )
}