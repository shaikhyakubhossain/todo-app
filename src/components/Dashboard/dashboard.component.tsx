"use client";
import { useState } from "react";
import styles from "./dashboard.module.scss";
import Task from "../Task/task.component";

type taskType = {
  positionLeft: number;
  positionTop: number;
  textContent: string;
}

export default function Dashboard() {

  const [currentTask, setCurrentTask] = useState<HTMLElement | null>(null);
  const [tasks, setTasks] = useState<taskType[]>([]);

  const dragging = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentTask) {
      currentTask.style.left = `${event.clientX}px`;
      currentTask.style.top = `${event.clientY}px`;
    }
  };

  const selectTask = (event: React.MouseEvent<HTMLDivElement>) => {
    if((event.target as HTMLDivElement).classList.contains(styles.titleBar)) {
        event.currentTarget.style.userSelect = "none";
        setCurrentTask((event.target as HTMLDivElement).parentElement);
    }
  };

  const stopDraggingOrCreateTask = (event: React.MouseEvent<HTMLDivElement>) => {
    if(!currentTask && event.target === document.getElementById("draggableArea")){
      setTasks([...tasks, {positionLeft: event.clientX, positionTop:event.clientY, textContent: "new task"}])
    }
    else{
      event.currentTarget.style.userSelect = "auto";
      setCurrentTask(null)
    }
  }
 
  return (
    <div
      id={"draggableArea"}
      className={`${styles.mainContainer} bg-yellow-600 h-screen`}
      onMouseDown={selectTask}
      onMouseUp={stopDraggingOrCreateTask}
      onMouseMove={dragging}
    >
      {
        tasks.map((item, index) => {
          return <Task key={index} positionTop={item.positionTop} positionLeft={item.positionLeft} textContent={item.textContent} />
      })
      }
    </div>
  );
}
