import React, {memo, useCallback, useContext, useMemo, useRef} from "react";
import {CLICK_MINE, CODE, FLAG_CELL, MineContext, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL} from "./MineFinder";

const getItemStyle = (data) => {
    switch (data){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background: '#666'
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'magenta'
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'cyan'
            }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
        default:
            return {
                background: 'white'
            }
    }
}

const getItemText = (data) => {

    switch (data){
        case CODE.NORMAL:{
            return ''
        }
        case CODE.MINE:{
            return ''
        }
        case CODE.OPENED:{
            return ''
        }
        case CODE.CLICKED_MINE:{
            return '펑'
        }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!'
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?'
        default:{
            if (data > 0){
                return data
            }else {
                return ''
            }
        }
    }
}

const TableItem = memo(({rowIndex,cellIndex}) => {
    const {tableData,dispatch,halted} = useContext(MineContext)

    const onClickItem =useCallback(() =>{
        if (halted){return;}
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:{
                dispatch({type:OPEN_CELL, row:rowIndex,cell:cellIndex})
                return
            }
            case CODE.MINE:{
                dispatch({type:CLICK_MINE, row:rowIndex,cell:cellIndex})
                return;
            }
            case CODE.OPENED:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex],halted])

    const onContextMenuItem = useCallback((e) => {
        e.preventDefault()
        if (halted){return;}
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:FLAG_CELL, row:rowIndex,cell:cellIndex})
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type:QUESTION_CELL, row:rowIndex,cell:cellIndex})
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type:NORMALIZE_CELL, row:rowIndex,cell:cellIndex})
                return;
            case CODE.OPENED:
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex],halted])

    return useMemo(() =>
        (
        <td
            style={getItemStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickItem}
            onContextMenu={onContextMenuItem}
        >{getItemText(tableData[rowIndex][cellIndex])}</td>
    ),[tableData[rowIndex][cellIndex]])
})

export default TableItem