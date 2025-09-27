import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [user, setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const backendUrl = import.meta.env.BACKEND_URL
    const [credits, setCredits] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
  
    const value = { 
        user, setUser, showLogin, setShowLogin, backendUrl, credits, setCredits, token, setToken
    }

    return(
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider