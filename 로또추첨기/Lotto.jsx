import React,{Component} from "react";
import Ball from "./Ball";

function getLottoNum(){
    console.log("getLottoNum")
    const numArr = []
    for (let i = 0; i < 7; i++) {
        numArr.push(Math.ceil(Math.random()*45))
    }
    return numArr
}

class Lotto extends Component{
    state = {
        lottoArr: getLottoNum(),
        winBalls:[],
        bonus:null,
        redo: false
    }

    timeout = []

    lottoShuffle = () => {
        console.log("lottoShuffle")
        const {lottoArr} = this.state
        for (let i = 0; i < lottoArr.length - 1; i++) {
            this.timeout.push(setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, lottoArr[i]],
                    }
                })
            },(i+1)*1000))
        }
        this.timeout.push(setTimeout(() => {
            this.setState({
                bonus: lottoArr[6],
                redo: true
            })
        },7000))
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.lottoShuffle()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.winBalls.length === 0){
            console.log("componentDidUpdate")
            this.lottoShuffle()
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
        this.timeout.forEach((t) => {
            clearTimeout(t)
        })
    }

    onClickRedo = () => {
        console.log("onClickRedo")
        this.setState({
                lottoArr: getLottoNum(),
                winBalls:[],
                bonus:null,
                redo: false
            })
        this.timeout = []
    }

    render() {
        console.log("render")
        const {winBalls, bonus, redo} = this.state
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
                {redo && <button onClick={this.onClickRedo}>한번더!</button>}
            </>
        )
    }
}

export default Lotto