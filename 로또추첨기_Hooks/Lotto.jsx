import React,{useState, useRef, useEffect, useMemo, useCallback} from "react";
import Ball from "./Ball";

function getLottoNum(){
    console.log("getLottoNum")
    const numArr = []
    for (let i = 0; i < 7; i++) {
        numArr.push(Math.ceil(Math.random()*45))
    }
    return numArr
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getLottoNum(),[])
    const [lottoArr,setLottoArr] = useState(lottoNumbers)
    const [winBalls,setWinBalls] = useState([])
    const [bonus,setBonus] = useState(null)
    const [redo,setRedo] = useState(false)

    const timeout = useRef([])

    useEffect(() => {
        lottoShuffle()
        return () => {
            timeout.current.forEach((t) => {
                clearTimeout(t)
            })
        }
    },[timeout.current])

    const lottoShuffle = () => {
        console.log("lottoShuffle")
        for (let i = 0; i < lottoArr.length - 1; i++) {
            timeout.current.push(setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, lottoArr[i]])
            },(i+1)*1000))
        }
        timeout.current.push(setTimeout(() => {
            setBonus(lottoArr[6])
            setRedo(true)
        },7000))
    }

    const onClickRedo = useCallback(() => {
        console.log("onClickRedo")
        setLottoArr(getLottoNum())
        setWinBalls([])
        setBonus(null)
        setRedo(false)
        timeout.current = []
    },[])

    return(
        <>
            <div><h1>당첨숫자</h1></div>
            <div id="result">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div><h2>보너스</h2></div>
            <div id="bonus">
                {bonus && <Ball number={bonus} />}
            </div>
            {redo && <button onClick={onClickRedo}>한번더!</button>}
        </>
    )
}

export default Lotto