const React = require('react')
const {Component} = React
const {random} = Math

class Gugudan extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstNum: Math.ceil(random()*9),
            secondNum: Math.ceil(random()*9),
            value: '',
            result: ''
        }
    }

    onSubmit=(e) => {
        e.preventDefault()
        if (parseInt(this.state.value) === this.state.firstNum*this.state.secondNum){
            this.setState({
                result: this.state.value.toString()+"정답입니다",
                firstNum: Math.ceil(random()*9),
                secondNum: Math.ceil(random()*9),
            })
        }else {
            this.setState({result: "오답입니다"})
        }
        this.setState({value: ''})
        this.input.focus()
    }

    onChange=(e) => {
        this.setState({value: e.target.value})
        this.input.focus()
    }

    input;

    render(){
        return(
            <>
                <div>{this.state.firstNum} 곱하기 {this.state.secondNum}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={(c) => {this.input = c;}} type="number" value={this.state.value} onChange ={this.onChange}></input>
                    <button>
                        제출
                    </button>
                </form>
                <div>{this.state.result}</div>
            </>
        ) ;
    }

}

module.exports = Gugudan;