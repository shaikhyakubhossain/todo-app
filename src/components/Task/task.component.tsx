import styles from "./task.module.scss";

type propsType = {
    positionTop: number,
    positionLeft: number
    textContent: string
}

export default function Task(props: propsType) {
    return (
        <div className="absolute w-36 h-36 bg-pink-500" style={{top: props.positionTop + "px", left: props.positionLeft + "px"}}>
            <div className={`${styles.titleBar} w-full h-5 bg-green-500`}></div>
            <div>Title</div>
            <div>{props.textContent}</div>
        </div>
    )
}