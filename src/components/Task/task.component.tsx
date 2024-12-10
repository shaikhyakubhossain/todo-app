import styles from "./task.module.scss";

type propsType = {
    taskId: number
    positionTop: number,
    positionLeft: number
    textContent: string
    handleDelete: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function Task(props: propsType) {
    return (
        <div id={"taskId-" + props.taskId} className="absolute w-36 h-36 bg-pink-500 rounded shadow-lg" style={{top: props.positionTop + "px", left: props.positionLeft + "px"}}>
            <div className={`${styles.titleBar} draggable flex justify-between items-center w-full h-5 px-1 bg-green-500 rounded`}>
                <div></div>
                <div className={``}></div>
                <div className="w-3 h-3 rounded-full bg-red-500" onClick={props.handleDelete}></div>
            </div>
            <div>Title</div>
            <div>{props.textContent}</div>
        </div>
    )
}