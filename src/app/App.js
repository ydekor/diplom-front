import './App.module.css';
import style from "./App.module.css"
import {LoginComp} from "../parts/login/LoginComp";
import {Route, Routes} from "react-router-dom";
import {Main} from "../parts/main/Main";
import {RegisterComp} from "../parts/register/RegisterComp";
import {useEffect} from "react";
import {getLocalStorageValue} from "../shared/hooks/LocalStorage";
import {AUTH} from "../shared/const/Structures";
import {getUserInfo} from "./api/request";
import {useApp} from "../shared/hooks/useApp";

export const App = () => {
  const {data} = useApp()

  const loginCheck = () => {
    if (!data.isAuthenticated) {
      let token = getLocalStorageValue(AUTH.TOKEN)
      if (!!token) {
        getUserInfo(token, data.setIsAuthenticated, data.setUserData)
      }
    }
  }

  useEffect(loginCheck,[data.isAuthenticated])

  return <div className={style.wrapper}>
    <Routes>
      <Route path={"/"} element={<Main/>}/>
      <Route path={"/:tab"} element={<Main/>}/>
      <Route path={"/login"} element={
        data.isAuthenticated ? <Main/> : <LoginComp/>
      }/>
      <Route path={"/register"} element={<RegisterComp/>}/>
    </Routes>
  </div>
}
