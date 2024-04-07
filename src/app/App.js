import './App.module.css';
import style from "./App.module.css"
import {LoginComp} from "../parts/login/LoginComp";
import {Route, Routes} from "react-router-dom";
import {Main} from "../parts/main/Main";
import {RegisterComp} from "../parts/register/RegisterComp";

export const App = () => {
  return <div className={style.wrapper}>
    <Routes>
      <Route path={"/"} element={<Main/>}/>
      <Route path={"/:tab"} element={<Main/>}/>
      <Route path={"/login"} element={<LoginComp/>}/>
      <Route path={"/register"} element={<RegisterComp/>}/>
    </Routes>
  </div>
}
