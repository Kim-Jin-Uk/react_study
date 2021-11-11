import React,{useContext,useRef} from "react";
import TableRow from "./TableRow";
import {MineContext} from "./MineFinder";

const Table = () => {
    const { tableData } = useContext(MineContext)
    return(
        <table>
            {Array(tableData.length).fill().map((tr,i)=>
                <TableRow
                    key={i}
                    rowIndex = {i}
                />
            )}
        </table>
    )
}

export default Table