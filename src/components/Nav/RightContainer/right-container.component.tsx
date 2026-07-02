"use client";
import { useState, useMemo } from "react";
import Dropdown from "./Dropdown/dropdown.component";
import Button from "@/components/Button/button.component";
import Toast from "@/components/Toast/toast.component";
import { getUrl } from "@/utils/Helper/urls";

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetail } from "@/lib/features/AuthDetail/authDetailSlice";
import { toggleViewMode } from "@/lib/features/ViewMode/viewModeSlice";
import { setLoadedData } from "@/lib/features/SaveData/saveDataSlice";

export default function RightContainer() {
  const [toggle, setToggle] = useState(false);
  const { username, token } = useSelector(
    (state: RootState) => state.authDetail,
  );
  const { savedTasks } = useSelector((state: RootState) => state.saveData);
  const [showMenu, setShowMenu] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "" });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthDetail({ username: null, token: null }));
    window.location.href = "/";
  };

  const handleSave = async (): Promise<void> => {
    const response = await fetch(`${getUrl()}/saveData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ savedTasks }),
    });
    const data = await response.json();
    setToast({ show: true, message: data });
    // console.log(data);
  };

  const handleLoad = async (): Promise<void> => {
    const response = await fetch(`${getUrl()}/loadData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    dispatch(setLoadedData(data));
    setToast({ show: true, message: data.error ? data.error : "Data Loaded" });
  };

  const dropdown = useMemo(() => {
    return (
      <div className="absolute right-0 top-16 flex flex-col items-center gap-3 z-[9999] bg-slate-700 min-w-40 p-4 rounded-md ">
        <Button onClick={handleSave} full={true}>
          Save to cloud
        </Button>
        <Button onClick={handleLoad} full={true}>
          Load from cloud
        </Button>
        <Button onClick={() => dispatch(toggleViewMode())} full={true}>
          Change Mode
        </Button>
      </div>
    );
  }, []);

  if (username)
    return (
      <div className="relative flex items-center space-x-4">
        <Button onClick={() => {
            setShowMenu(!showMenu)
            setToggle(false)
        }}>Menu</Button>
        {showMenu && dropdown}
        <div
          onClick={() => {
            setToggle(!toggle);
            setShowMenu(false);
          }}
          className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-700 text-white text-2xl capitalize text-center cursor-pointer"
        >
          <span>{username ? username[0] : null}</span>
        </div>
        <Dropdown handleLogout={handleLogout} toggle={toggle} />
        <Toast
            show={toast.show}
            message={toast.message}
            hide={() => setToast({ show: false, message: "" })}
          />
      </div>
    );
}
