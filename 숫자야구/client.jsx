const React = require('react')
const ReactDom = require('react-dom')
const{hot} = require('react-hot-loader/root')

const Numbaseball = require('./Numbaseball')

const Hot = hot(Numbaseball)

ReactDom.render(<Hot />, document.querySelector('#root'));