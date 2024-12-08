"use client";
import { useState } from "react";
import styles from "./dashboard.module.scss";

export default function Dashboard() {

  const [currentDragElement, setCurrentDragElement] = useState<HTMLElement | null>(null);

  const dragging = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentDragElement) {
      currentDragElement.style.position = "absolute";
    //   currentDragElement.style.left = `${event.clientX - parseInt(currentDragElement.style.width)}px`;
      currentDragElement.style.left = `${event.clientX}px`;
      currentDragElement.style.top = `${event.clientY}px`;
    }
  };

  const setDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if((event.target as HTMLDivElement).parentElement?.id === "draggableArea") {
        setCurrentDragElement(event.target as HTMLDivElement);
    }
  };

  const createDraggableElem = (positionX: number, positionY: number) => {
      const draggableElement = document.createElement('div');

      draggableElement.style.width = "100px";
      draggableElement.style.height = "100px";
      draggableElement.style.position = "absolute";
      draggableElement.style.left = `${positionX}px`;
      draggableElement.style.top = `${positionY}px`;
      draggableElement.textContent = "new draggable element";

      return draggableElement
  }

  const removeOrCreateDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    const draggableArea = (event.currentTarget as HTMLDivElement);
    draggableArea.appendChild(createDraggableElem(event.clientX, event.clientY));
    
    setCurrentDragElement(null)
  }
 
  return (
    <div
      id={"draggableArea"}
      className={`${styles.mainContainer} bg-yellow-600 h-screen`}
      onMouseDown={setDrag}
      onMouseUp={removeOrCreateDrag}
      onMouseMove={dragging}
    >
      <div className="text-2xl !bg-slate-500 w-56 h-28">drag test</div>
    </div>
  );
}
