import React, {memo, useEffect, useReducer, useMemo} from "react";
import Table from './Table';

const initialState = {
    winner: null,
    turn: 'O',
    tableData:
    [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell:[-1,-1]
}

export const SET_WINNER = 'SET_WINNER'
export const CLICK_SELL = 'CLICK_SELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const GAME_RESET = 'GAME_RESET'
export const GAME_DRAW = 'GAME_DRAW'

const reducer = (state, action) => {
    switch (action.type){
        case SET_WINNER:{
            return{
                ...state,
                winner: '"'+action.winner+'"님의 승리'
            }
        }
        case CLICK_SELL: {
            const tableData = [...state.tableData]
            tableData[action.row] = [...tableData[action.row]]
            tableData[action.row][action.cell] = state.turn
            return {
                ...state,
                tableData,
                recentCell: [action.row,action.cell]
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'x' : 'O'
            }
        }
        case GAME_RESET:{
            return {
                ...state,
                winner: null,
                turn: 'O',
                tableData:
                    [
                        ['','',''],
                        ['','',''],
                        ['','','']
                    ],
                recentCell:[-1,-1]
            }
        }
        case GAME_DRAW:{
            return {
                ...state,
                winner: '무승부 입니다'
            }
        }
    }
}

const Tictactoe =memo(() =>{
    console.log('tt render')
    const [state, dispatch] = useReducer(reducer, initialState)
    const {tableData, turn, winner, recentCell} = state

    useEffect(() => {
        const [row, cell] = recentCell
        if (row < 0){
            return
        }
        let win = false
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true
        }
        if (win){
            dispatch({type:GAME_RESET})
            dispatch({type:SET_WINNER, winner:turn})
        }else {
            let all = true
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (cell === ''){
                        all = false
                    }
                })
            })
            if (all){
                dispatch({type:GAME_RESET})
                dispatch({type:GAME_DRAW})
            } else {
                dispatch({type:CHANGE_TURN})
            }
        }

    },[tableData])

    const onClickResetBtn = () => {
        dispatch({type:GAME_RESET})
    }

    return(
        <>
            <Table
                tableData = {tableData}
                dispatch = {dispatch}
            ></Table>
            {winner && <div><h1>{winner}</h1></div>}
            <button onClick={onClickResetBtn}>RESET</button>
        </>
    )
})

export default Tictactoe