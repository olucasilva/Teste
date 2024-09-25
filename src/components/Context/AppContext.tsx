import { getToken } from "@/services/storage"
import { createContext, useState } from "react"

interface IAppContext {
    token: string
    setContextToken: (token: string) => void
}

export const AppContext = createContext({} as IAppContext)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContextProvider = ({ children }: any) => {
    // Local Storage
    const localStorageToken = getToken()

    // Context
    const [token, setContextToken] = useState<string>(localStorageToken ? localStorageToken : '')

    return (
        <AppContext.Provider value={{ token, setContextToken }}>
            {children}
        </AppContext.Provider>
    )
}