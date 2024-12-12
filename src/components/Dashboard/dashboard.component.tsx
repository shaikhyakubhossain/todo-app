"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./dashboard.module.scss";
import Task from "../Task/task.component";
import type { taskType, currentTaskToDragType } from "../../utils/Types/local";

export default function Dashboard() {
  const [currentTaskToDrag, setCurrentTaskToDrag] = useState<currentTaskToDragType | null>(null);
  const [currentTaskToResize, setCurrentTaskToResize] = useState<HTMLDivElement | null>(null);
  const [tasks, setTasks] = useState<taskType[]>([]);

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
    if ((event.target as HTMLDivElement).classList.contains("draggable")) {
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
      !currentTaskToDrag &&
      event.target === draggableAreaRef.current
    ) {
      setTasks([
        ...tasks,
        {
          positionLeft: event.clientX - 10,
          positionTop: event.clientY - 10,
          width: 200,
          height: 200,
          textContent: "new task",
        },
      ]);
    } else if((event.target as HTMLDivElement).classList.contains("draggable")) {
      event.currentTarget.style.userSelect = "auto";
      const taskIdToChangePos = Number(currentTaskToDrag?.elem.id.split("-")[1]);
      setTasks((prev) => {
        const newArr = prev;
        newArr[taskIdToChangePos].positionLeft = Number(currentTaskToDrag?.elem.style.left.split("px")[0]);
        newArr[taskIdToChangePos].positionTop = Number(currentTaskToDrag?.elem.style.top.split("px")[0]);
        return newArr
      })
      setCurrentTaskToDrag(null);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    const taskIdToRemove = Number(
      event.currentTarget.parentElement?.parentElement?.id.split("-")[1]
    );
    setTasks(tasks.filter((_, index) => index !== taskIdToRemove));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleResizing);
    return () => {
      window.removeEventListener("mousemove", handleResizing);
    }
  }, [currentTaskToResize]);

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
      const newArr = prev;
      newArr[taskIdToResize].width = Number(currentTaskToResize?.style.width.split("px")[0]);
      newArr[taskIdToResize].height = Number(currentTaskToResize?.style.height.split("px")[0]);
      return newArr
    });
    setCurrentTaskToResize(null);
  };

  return (
    <div
      ref={draggableAreaRef}
      className={`${styles.mainContainer} bg-[#423E37] h-[calc(100dvh-56px)]`}
      onMouseDown={selectTask}
      onMouseUp={stopDraggingOrCreateTask}
      onMouseMove={(event) => currentTaskToDrag && dragging(event)}
    >
      {tasks.map((item, index) => {
        return (
          <Task
            taskId={index}
            key={index}
            positionTop={item.positionTop}
            positionLeft={item.positionLeft}
            width={item.width}
            height={item.height}
            textContent={item.textContent}
            handleDelete={handleDelete}
            handleClickResize={handleClickResize}
            handleReleaseResize={handleReleaseResize}
          />
        );
      })}
    </div>
  );
}
