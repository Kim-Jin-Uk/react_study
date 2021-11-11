import React,{useReducer,useRef} from "react";
import Table from "./Table";
import {act} from "react-dom/test-utils";

const initialState = {
    tableData: []
}

const reducer =(state,action) =>{
    switch (action.type){
        default:{
            return state
        }
    }
}

const MineFinder = () => {
    const [state,dispatch] = useReducer(reducer,initialState)

    return(
        <>
            <div className="mine-header">
                <h2>행</h2>
                <input type="number"/>
            </div>

            <div className="mine-header">
                <h2>열</h2>
                <input type="number"/>
            </div>

            <div className="mine-header">
                <h2>지뢰수</h2>
                <input type="number"/>
            </div>

            <Table></Table>
        </>
    )
}

export default MineFinder