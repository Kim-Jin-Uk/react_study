import React, {useCallback, useReducer, createContext, useMemo} from "react";
import Table from "./Table";

export const MineContext = createContext({
    tableData: [],
    dispatch: () => {},
    halted:true
})

const initialState = {
    tableData: [],
    timer:0,
    result:0,
    row:0,
    cell:0,
    mine:0,
    halted:true,
    openedCount: 0,
}

export const SET_ROW = 'SET_ROW'
export const SET_CELL = 'SET_CELL'
export const SET_MINE = 'SET_MINE'
export const START_GAME = 'START_GAME'
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE:-4,
    FLAG_MINE: -5,
    CLICKED_MINE:-6,
    OPENED:0
}

const PlantMIne = (row, cell, mine) => {
    console.log(row, cell, mine)
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i
    })
    const shuffle = []
    while (candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]
        shuffle.push(chosen)
    }
    const data = []
    for (let i = 0; i < row; i++) {
        const rowData = []
        data.push(rowData)
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL)
        }
    }

    for (let i = 0; i < shuffle.length; i++) {
        const ver = Math.floor(shuffle[i] / cell)
        const hor = shuffle[i] % cell
        data[ver][hor] = CODE.MINE
    }
    console.log(data)
    return data
}

const reducer =(state,action) =>{
    switch (action.type){
        case SET_ROW:{
            console.log(action.row)
            return {
                ...state,
                row: action.row
            }
        }
        case SET_CELL:{
            return {
                ...state,
                cell: action.cell
            }
        }
        case SET_MINE:{
            return {
                ...state,
                mine: action.mine
            }
        }
        case START_GAME:{
            return {
                ...state,
                tableData: PlantMIne(action.row, action.cell, action.mine),
                halted: false
            }
        }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            console.log(tableData.length, tableData[0].length);
            const checkAround = (row, cell) => {
                console.log(row, cell);
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                } // 상하좌우 없는칸은 안 열기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                } // 닫힌 칸만 열기
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                } // 한 번 연칸은 무시하기
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                if (tableData[row - 1]) {
                    around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
                }
                if (tableData[row + 1]) {
                    around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
                }
                const count = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;
                if (count === 0) { // 주변칸 오픈
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row -1, cell - 1]);
                            near.push([row -1, cell]);
                            near.push([row -1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        })
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count.toString();
            };
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE:{
            const tableData = [...state.tableData]
            tableData[action.row] = [...state.tableData[action.row]]
            tableData[action.row][action.cell] = CODE.CLICKED_MINE
            return {
                ...state,
                tableData,
                halted:true,
            }
        }
        case FLAG_CELL:{
            const tableData = [...state.tableData]
            tableData[action.row] = [...state.tableData[action.row]]
            if (tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE
            }else {
                tableData[action.row][action.cell] = CODE.FLAG
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL:{
            const tableData = [...state.tableData]
            tableData[action.row] = [...state.tableData[action.row]]
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE
            }else {
                tableData[action.row][action.cell] = CODE.QUESTION
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData]
            tableData[action.row] = [...state.tableData[action.row]]
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE
            }else {
                tableData[action.row][action.cell] = CODE.NORMAL
            }
            return {
                ...state,
                tableData,
            }
        }
        default:{
            return state
        }
    }
}

const MineFinder = () => {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {timer,result,row,cell,mine,tableData, halted} = state

    const value = useMemo(() => ({tableData, halted, dispatch}),[tableData,halted])

    const onChangeRow =useCallback((e) =>{
        dispatch({type:SET_ROW, row:e.target.value})
    },[])

    const onChangeCell =useCallback((e) =>{
        dispatch({type:SET_CELL, cell:e.target.value})
    },[])

    const onChangeMine =useCallback((e) =>{
        dispatch({type:SET_MINE, mine:e.target.value})
    },[])

    const onClickBtn = useCallback(() =>{
        dispatch({type:START_GAME, row, cell, mine})
    },[row, cell, mine])

    return(
        <MineContext.Provider value = {value}>
            <div className="mine-header"><h2>행</h2>
                <input type="number" value={row} onChange={onChangeRow}/>
            </div>

            <div className="mine-header"><h2>열</h2>
                <input type="number" value={cell} onChange={onChangeCell}/>
            </div>

            <div className="mine-header"><h2>지뢰수</h2>
                <input type="number" value={mine} onChange={onChangeMine}/>
            </div>

            <button onClick={onClickBtn}>Edit</button>

            <div>{timer}</div>

            <Table></Table>

            <div>{result}</div>
        </MineContext.Provider>
    )
}

export default MineFinder