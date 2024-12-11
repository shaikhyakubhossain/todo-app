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
    if((event.target as HTMLDivElement).classList.contains("draggable")){
        event.currentTarget.style.userSelect = "none";
        setCurrentTask((event.target as HTMLDivElement).parentElement);
  };
}

  const stopDraggingOrCreateTask = (event: React.MouseEvent<HTMLDivElement>) => {
    if(!currentTask && event.target === document.getElementById("draggableArea")){
      setTasks([...tasks, {positionLeft: event.clientX, positionTop:event.clientY, textContent: "new task"}])
    }
    else{
      event.currentTarget.style.userSelect = "auto";
      setCurrentTask(null)
    }
  }

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    const taskIdToRemove = Number(event.currentTarget.parentElement?.parentElement?.id.split("-")[1]);
    setTasks(tasks.filter((_, index) => index !== taskIdToRemove))
  }
 
  return (
    <div
      id={"draggableArea"}
      className={`${styles.mainContainer} bg-[#423E37] h-[calc(100dvh-56px)]`}
      onMouseDown={selectTask}
      onMouseUp={stopDraggingOrCreateTask}
      onMouseMove={dragging}
    >
      {
        tasks.map((item, index) => {
          return <Task taskId={index} key={index} positionTop={item.positionTop} positionLeft={item.positionLeft} textContent={item.textContent} handleDelete={handleDelete} />
      })
      }
    </div>
  );
}
