import { createContext, useState } from "react"

export interface IContextStatus {
    id: number
    status: number
}

interface IStatusContext {
    contextStatus: IContextStatus[]
    setContextStatus: (contextStatus: IContextStatus[]) => void
}

export const StatusContext = createContext({} as IStatusContext)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StatusContextProvider = ({ children }: any) => {
    const [contextStatus, setContextStatus] = useState<IContextStatus[]>([{ id: 0, status: 0 }])

    return (
        <StatusContext.Provider value={{ contextStatus, setContextStatus }}>
            {children}
        </StatusContext.Provider>
    )
}