"use client";
import { useState } from "react";
import Dropdown from "./Dropdown/dropdown.component";
import Button from "@/components/Button/button.component";

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetail } from "@/lib/features/AuthDetail/authDetailSlice";
import { toggleViewMode } from "@/lib/features/ViewMode/viewModeSlice";
import { setLoadedData } from "@/lib/features/SaveData/saveDataSlice";

export default function RightContainer() {
    const [toggle, setToggle] = useState(false);
    const { username, token } = useSelector((state: RootState) => state.authDetail);
    const { savedTasks } = useSelector((state: RootState) => state.saveData);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setAuthDetail({ username: null, token: null }));
        window.location.href = "/";
    }

    const handleSave = async (): Promise<void> => {
        const response = await fetch("http://localhost:4000/saveData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ savedTasks })
        })
        const data = await response.json();
        console.log(data);
    }

    const handleLoad = async (): Promise<void> => {
        const response = await fetch("http://localhost:4000/loadData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        dispatch(setLoadedData(data));
    }

    if(username) return (
        <div className="flex items-center space-x-4">
            <Button onClick={handleSave} >Save</Button>
            <Button onClick={handleLoad} >Load</Button>
            <Button onClick={() => dispatch(toggleViewMode())} >Change Mode</Button>
            <div onClick={() => setToggle(!toggle)} className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 text-white text-2xl capitalize text-center cursor-pointer"><span>{username[0]}</span></div>
            <Dropdown handleLogout={handleLogout} toggle={toggle} />
        </div>
    );
}