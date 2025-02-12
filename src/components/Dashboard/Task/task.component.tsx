import styles from "./task.module.scss";

type propsType = {
    taskId: number;
    listMode: boolean;
    positionTop: number;
    positionLeft: number;
    width: number;
    height: number;
    title: string;
    taskBody: string;
    handleDelete: () => void;
    handleClickResize: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleReleaseResize: () => void;
    handleUpdateTitle: (taskId: number, title: string) => void;
    handleUpdateTaskBody: (taskId: number, taskBody: string) => void;
}

export default function Task(props: propsType) {

    return (
        <div id={"taskId-" + props.taskId} className="bg-[#EDEBD7] rounded shadow-lg" style={{position: props.listMode ? "absolute" : "static", width: !props.listMode ? "100%" : (props.width + "px"), height: props.height + "px", top: props.positionTop + "px", left: props.positionLeft + "px", marginBottom: !props.listMode ? "10px" : "0"}}>
            <div className={`${styles.titleBar} draggable flex justify-between items-center w-full h-5 px-1 bg-[#A3959450] rounded cursor-grab active:cursor-grabbing`}>
                <div></div>
                <div className="w-3 h-3 rounded-full bg-red-700 cursor-pointer hover:bg-red-500 hover:cursor-pointer hover:shadow-2xl shadow-red-500" onClick={props.handleDelete}></div>
            </div>
            <div className={`${styles.taskBody} flex flex-col h-[calc(100%-20px)] p-1 text-white`}>
                <input onChange={(event) => props.handleUpdateTitle(props.taskId, event.target.value)} className="mb-1" type="text" placeholder="Title" defaultValue={props.title} />
                <textarea onChange={(event) => props.handleUpdateTaskBody(props.taskId, event.target.value)} className="flex-grow" placeholder="Task" defaultValue={props.taskBody}/>
            </div>
            <div onMouseDown={props.handleClickResize} onMouseUp={props.handleReleaseResize} className="absolute bottom-0 right-0 w-2 h-2 rounded-full cursor-nwse-resize"></div>
        </div>
    )
}