"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function RightContainer() {

    const { username } = useSelector((state: RootState) => state.authDetail);

    if(username) return <div className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 text-white text-2xl capitalize text-center"><span>{username[0]}</span></div>;
}