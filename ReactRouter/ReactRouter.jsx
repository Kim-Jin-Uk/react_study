import React from "react";
import {BrowserRouter, HashRouter, Link, Route, Routes} from "react-router-dom";
import RSP from "../가위바위보/RSP";
import Lotto from "../로또추첨기_Hooks/Lotto";
import Gugudan from "../구구단/Gugudan";
import ResponseCheck from "../반응속도체크/ResponseCheck";
import Tictactoe from "../틱택토/Tictactoe";
import MineFinder from "../지뢰찾기/MineFinder";
import NumberBaseballClass from "../숫자야구_reviewing/NumberBaseballClass";

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Link className="linkStyle" to='/number-baseball'>숫자야구</Link>
                <Link className="linkStyle" to='/rock-scissors-paper'>가위바위보</Link>
                <Link className="linkStyle" to='/lotto-generator'>로또 추첨기</Link>
                <Link className="linkStyle" to='/gugudan'>구구단</Link>
                <Link className="linkStyle" to='/check-your-speed'>반응속도 체크</Link>
                <Link className="linkStyle" to='/tic-tac-toe'>틱택토</Link>
                <Link className="linkStyle" to='/find-mine'>지뢰찾기</Link>
            </div>

            <Routes>
                <Route path='/number-baseball' component={NumberBaseballClass}></Route>
                <Route path='/rock-scissors-paper' component={RSP}></Route>
                <Route path='/lotto-generator' component={Lotto}></Route>
                <Route path='/gugudan' component={Gugudan}></Route>
                <Route path='/check-your-speed' component={ResponseCheck}></Route>
                <Route path='/tic-tac-toe' component={Tictactoe}></Route>
                <Route path='/find-mine' component={MineFinder}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter