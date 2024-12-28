"use client";
import { useState } from "react";
import Dropdown from "./Dropdown/dropdown.component";

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetail } from "@/lib/features/AuthDetail/authDetailSlice";

export default function RightContainer() {
    const [toggle, setToggle] = useState(false);
    const { username } = useSelector((state: RootState) => state.authDetail);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setAuthDetail({ username: null, token: null }));
        window.location.href = "/";
    }

    if(username) return (
        <div>
            <div onClick={() => setToggle(!toggle)} className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 text-white text-2xl capitalize text-center cursor-pointer"><span>{username[0]}</span></div>
            <Dropdown handleLogout={handleLogout} toggle={toggle} />
        </div>
    );
}