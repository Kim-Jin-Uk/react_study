import React,{useState,useRef} from "react";

const ResponseCheck = () => {
    const [state,setState] = useState('wait')
    const [message,setMessage] = useState('클릭해서 시작하세요')
    const [timeArr,setTimeArr] = useState([])
    const timeout = useRef(null)
    const startTime = useRef()
    const endTime = useRef()

    const onClickScreen = () => {
        if (state === 'wait'){
            setState('ready')
            setMessage('곧 시작합니다')

            timeout.current = setTimeout(() => {
                setState('go')
                setMessage('곧 클릭하세요')
                startTime.current = new Date()
            },Math.floor(Math.random()*2000)+1000)
        } else if (state === 'ready'){
            alert('너무 빨리 클릭하셨습니다.')
            clearTimeout(timeout.current)
            setState('wait')
            setMessage('클릭해서 시작하세요')
            setTimeArr([])
        } else {
            endTime.current = new Date()
            setState('wait')
            setMessage('클릭해서 시작하세요')
            setTimeArr((prevResult) =>{
                return([... prevResult, endTime.current - startTime.current])
            })
        }
    }

    const onReset = () => {
        setTimeArr([])
    }

    const renderAverage = () => {
        return(
            timeArr.length === 0
                ? null
                :
                <>
                    <div>평균 반응속도: {timeArr.reduce((a,c) => a + c) / timeArr.length}ms</div>
                    <button onClick={onReset}>reset</button>
                </>
        )
    }

    return(
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                <h1>{message}</h1>
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck;