import RightContainer from "./RightContainer/right-container.component";

export default function Nav() {
    return (
        <div className="flex justify-between items-center px-12 bg-[#E3B23C] text-slate-700 h-14">
            <div className="text-2xl font-semibold">Todo</div>
            <RightContainer />
        </div>
    );
}