import React, {memo, useContext, useRef} from "react";
import TableItem from "./TableItem";
import {MineContext} from "./MineFinder";

const TableRow = memo(({rowIndex}) => {

    const { tableData } = useContext(MineContext)
    return(
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td,i)=>
                <TableItem
                    rowIndex = {rowIndex}
                    cellIndex = {i}
                    key = {rowIndex.toString()+i.toString()}
                />
            )}
        </tr>
    )
})

export default TableRow