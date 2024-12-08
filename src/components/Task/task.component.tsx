type propsType = {
    positionTop: number,
    positionLeft: number
    textContent: string
}

export default function Task(props: propsType) {
    return (
        <div className="absolute w-36 h-36 bg-pink-500" style={{top: props.positionTop + "px", left: props.positionLeft + "px"}}>
            {props.textContent}
        </div>
    )
}