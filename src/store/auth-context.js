import React, { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

export const AuthContextProvider = (props) => {
    const [token,settoken]=useState(null);

    const userIsLoggedIn=!!token;
    const loginHandler=(token)=>{
        settoken(token);
    }
    const logoutHandler=(token)=>{
        settoken(null);
    }

    const conextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    };

    return <AuthContext.Provider value={conextValue}>{props.children}</AuthContext.Provider>
}
 
export default AuthContext;