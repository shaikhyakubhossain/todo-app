"use client";
import { useState } from "react";
import Dropdown from "./Dropdown/dropdown.component";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function RightContainer() {
    const [toggle, setToggle] = useState(false);
    const { username } = useSelector((state: RootState) => state.authDetail);

    if(username) return (
        <div>
            <div onClick={() => setToggle(!toggle)} className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 text-white text-2xl capitalize text-center cursor-pointer"><span>{username[0]}</span></div>
            <Dropdown toggle={toggle} />
        </div>
    );
}