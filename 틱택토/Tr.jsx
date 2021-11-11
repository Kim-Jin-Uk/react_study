import React, {memo, useEffect, useRef} from "react";
import Td from "./Td";

const Tr = memo(({rowIndex, rowData, dispatch}) => {

    return(
        <tr>
            {Array(rowData.length).fill().map((ti,i) => (
                <Td
                    rowIndex = {rowIndex}
                    key = {i.toString()+rowData.length.toString()}
                    cellIndex = {i}
                    dispatch = {dispatch}
                    turn = {rowData[i]}
                >{''}</Td>
            ))}
        </tr>
    )
})

export default Tr