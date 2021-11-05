const React = require('react')
const {useState, useRef} = React

const WordRelay = () =>{
  const [word,setWord] = useState('진돌')
  const [value,setValue] = useState('')
  const [result,setResult] = useState('')
  const inputRef = useRef(null)

  const onSubmit = (e) =>{
    e.preventDefault()
    if (value[0] === word[word.length - 1]){
      setResult("정답입니다")
      setWord(value)
    }else {
      setResult("오답입니다")
    }
    setValue('')
    inputRef.current.focus()
  }

  const onChange = (e) =>{
    setValue(e.target.value)
  }


  return (
      <>
        <div>{word}:</div>
        <form onSubmit={onSubmit}>
          <input
              type="text"
              ref={inputRef}
              onChange={onChange}
              value={value}
          />
          <button>Edit</button>
        </form>
        <div>{result}</div>
      </>
  )

};

module.exports = WordRelay;