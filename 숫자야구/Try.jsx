const React = require('react')

const Try = ({value}) =>{

    return(
        <li key={value.key}>{
            value.value+":\t"+
            value.counter+":\t"+
            value.result
        }</li>
    )
}

export default Try;