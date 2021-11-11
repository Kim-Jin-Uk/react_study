import React, {useCallback, memo, useRef, useEffect} from "react";
import { CLICK_SELL} from "./Tictactoe";

const Td = memo(({rowIndex, cellIndex, dispatch, turn}) => {

    const onClickTd =useCallback(() => {
        if (turn){
            return
        }
        dispatch({
            type:CLICK_SELL,
            row:rowIndex,
            cell:cellIndex
        })
    },[turn])

    return(
        <td onClick={onClickTd}>{turn}</td>
    )
})

export default Td