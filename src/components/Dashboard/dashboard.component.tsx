"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./dashboard.module.scss";
import Task from "./Task/task.component";
import type { taskType, currentTaskToDragType } from "../../utils/Types/local";

import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { setSaveData } from "@/lib/features/SaveData/saveDataSlice";

export default function Dashboard() {
  const [currentTaskToDrag, setCurrentTaskToDrag] = useState<currentTaskToDragType | null>(null);
  const [currentTaskToResize, setCurrentTaskToResize] = useState<HTMLDivElement | null>(null);
  const [tasks, setTasks] = useState<taskType[]>([]);

  const { listMode } = useSelector((state: RootState) => state.viewMode);

  const dispatch = useDispatch();

  const draggableAreaRef = useRef<HTMLDivElement | null>(null);

  const dragging = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentTaskToDrag) {
      currentTaskToDrag.elem.style.left = `${
        event.clientX - currentTaskToDrag.selectPosition.x
      }px`;
      currentTaskToDrag.elem.style.top = `${
        event.clientY - currentTaskToDrag.selectPosition.y
      }px`;
    }
  };

  const selectTask = (event: React.MouseEvent<HTMLDivElement>) => {
    if (listMode && (event.target as HTMLDivElement).classList.contains("draggable")) {
      // console.log((event.target as HTMLDivElement).parentElement as HTMLDivElement);
      const elemPos = (event.target as HTMLDivElement).getBoundingClientRect();
      event.currentTarget.style.userSelect = "none";
      setCurrentTaskToDrag({
        elem: (event.target as HTMLDivElement).parentElement as HTMLDivElement,
        selectPosition: {
          x: event.clientX - elemPos.x,
          y: event.clientY - elemPos.y,
        },
      });
    }
  };

  const stopDraggingOrCreateTask = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      listMode &&
      !currentTaskToDrag &&
      event.target === draggableAreaRef.current
    ) {
      createNewTask(event.clientX, event.clientY);
    } else if((event.target as HTMLDivElement).classList.contains("draggable")) {
      event.currentTarget.style.userSelect = "auto";
      const taskIdToChangePos = Number(currentTaskToDrag?.elem.id.split("-")[1]);
      setTasks((prev) => {
        const newArr = [...prev];
        newArr.forEach((item) => {
          if(item.id === taskIdToChangePos) {
            item.positionLeft = Number(currentTaskToDrag?.elem.style.left.split("px")[0]);
            item.positionTop = Number(currentTaskToDrag?.elem.style.top.split("px")[0]);
          }
        })
        return newArr
      })
      setCurrentTaskToDrag(null);
    }
  };

  const createNewTask = (localPositionLeft: number, localPositionTop: number) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
        positionLeft: localPositionLeft - 10,
        positionTop: localPositionTop - 10,
        width: 200,
        height: 200,
        title: "",
        taskBody: "",
      },
    ])
  }

  const updateTitle = (taskId: number, title: string) => {
    setTasks((prev) => {
      const newArr = [...prev];
      newArr.forEach((item) => {
        if(item.id === taskId) {
          item.title = title;
        }
      })
      return newArr
    })
  }

  const updateTaskBody = (taskId: number, taskBody: string) => {
    setTasks((prev) => {
      const newArr = [...prev];
      newArr.forEach((item) => {
        if(item.id === taskId) {
          item.taskBody = taskBody;
        }
      })
      return newArr
    })
    // console.log(tasks)
  }

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleResizing);
    return () => {
      window.removeEventListener("mousemove", handleResizing);
    }
  }, [currentTaskToResize]);

  useEffect(() => {
    dispatch(setSaveData(tasks));
  }, [tasks]);

  const handleClickResize = (event: React.MouseEvent<HTMLDivElement>) => {
    setCurrentTaskToResize((event.currentTarget as HTMLDivElement).parentElement as HTMLDivElement);
  };

  const handleResizing = (event: MouseEvent) => {
    if(currentTaskToResize) {
      currentTaskToResize.style.width = `${(event.clientX - currentTaskToResize.getBoundingClientRect().left) + 5}px`;  
      currentTaskToResize.style.height = `${(event.clientY - currentTaskToResize.getBoundingClientRect().top) + 5}px`;  
    }
  };

  const handleReleaseResize = () => {
    const taskIdToResize = Number(currentTaskToResize?.id.split("-")[1]);
    setTasks((prev) => {
      const newArr = [...prev];
      newArr.forEach((item) => {
        if(item.id === taskIdToResize) {
          item.width = Number(currentTaskToResize?.style.width.split("px")[0]);
          item.height = Number(currentTaskToResize?.style.height.split("px")[0]);
        }
      })
      return newArr
    });
    setCurrentTaskToResize(null);
  };

  return (
    <div
      ref={draggableAreaRef}
      className={`${styles.mainContainer} bg-[#423E37] h-[calc(100dvh-56px)]`}
      style={{ padding: listMode ? "0" : "10px 10px" }}
      onMouseDown={selectTask}
      onMouseUp={stopDraggingOrCreateTask}
      onMouseMove={(event) => currentTaskToDrag && dragging(event)}
    >
      { tasks.length === 0 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold !bg-[#423E37] text-[#918879] text-center">No tasks<br />{listMode ? <span>Click anywhere to add one</span> : <span>Click &quot;Add Task&quot; to add one</span>}</div> }
      { tasks.map((item) => {
        return (
          <Task
            key={item.id}
            taskId={item.id}
            listMode={listMode}
            positionTop={item.positionTop}
            positionLeft={item.positionLeft}
            width={item.width}
            height={item.height}
            handleDelete={() => handleDelete(item.id)}
            handleClickResize={handleClickResize}
            handleReleaseResize={handleReleaseResize}
            title={item.title}
            taskBody={item.taskBody}
            handleUpdateTitle={updateTitle}
            handleUpdateTaskBody={updateTaskBody}
          />
        );
      })}
      <div onClick={() => createNewTask(50, 100)} className=" flex-col items-center justify-center w-full h-10 font-semibold text-center cursor-pointer" style={{display: !listMode ? "flex" : "none"}}><div>Add Task</div></div>
    </div>
  );
}
