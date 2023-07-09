import { createContext, useState } from "react";

export const tableContext = createContext(null);

const Context = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [taskId, setTaskId] = useState("")
    return (
        <tableContext.Provider value={{ isAdmin, setIsAdmin, taskId, setTaskId }}>
            {children}
        </tableContext.Provider>
    )
}

export default Context;