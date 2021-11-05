const React = require('react')
const {useState, useRef} = React
const Try = require('./Try')

function getNumbers(){
    const [num1,setNum1] = useState(Math.ceil(Math.random()*9))
    const [num2,setNum2] = useState(Math.ceil(Math.random()*9))
    const [num3,setNum3] = useState(Math.ceil(Math.random()*9))
    const [num4,setNum4] = useState(Math.ceil(Math.random()*9))
    const [checker,setChecker] = useState(0)
    while (checker > 2){
        if (num1 === num2){
            setNum2(Math.ceil(Math.random()*9))
        }else if (num1 === num3) {
            setNum3(Math.ceil(Math.random()*9))
        }else if (num1 === num4){
            setNum4(Math.ceil(Math.random()*9))
        }else {
            setChecker(checker+1)
        }
    }
    return num1*1000+num2*100+num3*10+num4
}

const Numbaseball = () =>{
    const [result,setResult] = useState("")
    const [value,setValue] = useState("")
    const [bnum,setBnum] = useState(getNumbers())
    const [logList,setLogList] = useState([])
    const [counter,setCounter] = useState(1)
    const inputRef = useRef(null)

    const onChangeInput =(e) =>{
        setValue(e.target.value)
    };

    const onSubmitForm = (e) =>{
        e.preventDefault()
        console.log(bnum)
        if (parseInt(value) === bnum){
            setResult("홈런")
            setBnum(getNumbers())
            setValue('')
            setLogList((prevLogList) => {
                return [...prevLogList,{
                    value:value.toString(),
                    counter:counter.toString(),
                    result:"true"
                }]
            })
            console.log(logList)
            setCounter(1)
        }else {
            let ballnum = 0
            let stnum = 0
            for (let i = 0; i < value.length; i++) {
                if (bnum.toString().includes(value[i])){
                    if (bnum.toString()[i] == value[i]){
                        stnum += 1
                    }else {
                        ballnum += 1
                    }
                }
            }
            setResult({stnum}+" 스트라이크\t"+{ballnum}+" 볼")
            setValue('')
            setLogList((prevLogList) => {
                return [...prevLogList,{
                    value:value.toString(),
                    counter:counter.toString(),
                    result:"false"
                }]
            })
            console.log(logList)
            setCounter(counter+1)
        }
    }

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputRef}
                    type="number"
                    maxLength={4}
                    value={value}
                    onChange={onChangeInput}
                />
                <button>Edit</button>
            </form>
            <ul>
                {logList.map((v,i) =>{
                    return(
                        <Try key={v.value.toString() + v.counter.toString()} value={v} index={i}></Try>
                           )
                })}
            </ul>
        </>
    ) ;


}

module.exports = Numbaseball;