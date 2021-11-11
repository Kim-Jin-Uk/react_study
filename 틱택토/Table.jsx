import React, {memo, useEffect, useRef} from "react";
import Tr from "./Tr";

const Table =memo(({tableData, dispatch}) => {

    return(
        <table>
            {Array(tableData.length).fill().map((tr, i) => (
                <Tr
                    rowIndex = {i}
                    key = {i.toString()+tableData.length.toString()}
                    rowData = {tableData[i]}
                    dispatch = {dispatch}
                />
            ))}
        </table>
    )
})

export default Table