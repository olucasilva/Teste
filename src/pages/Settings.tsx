import {
    Card,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { HeaderMenu } from "@/components/Dashboard/HeaderMenu"
import { StatusContextProvider } from "@/components/Context/StatusContext"
import { toast } from "sonner"
import { NewUserDialog } from "@/components/NewUser/NewUserDialog"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/components/Context/AppContext"
import { authorization, IUsersList, listUser, listUsers, logout } from "@/controllers/userController"
import { UserTabsSetting } from "@/components/Settings/UserSettingsTabs"
import { useNavigate } from "react-router-dom"
import { setToken } from "@/services/storage"

export const Settings = () => {
    const { token } = useContext(AppContext)
    const [userData, setUserData] = useState<IUsersList>({ id: 0, name: "", username: "", isAdm: false, })
    const [usersList, setUsersList] = useState<IUsersList[]>([])
    const [trigger, setTrigger] = useState<boolean>(true)

    const navigate = useNavigate()
    const { setContextToken } = useContext(AppContext)

    useEffect(() => {
        async function authorize() {
            const result = await authorization(token)

            if (result) {
                if (!result.result) {
                    const { result } = await logout(token)

                    if (result) {
                        setToken('')
                        setContextToken('')
                        navigate('/')
                    }
                }
            } else {
                toast.warning(result)
            }
        }

        async function setUser() {
            const result = await listUser(token)

            if (result) {
                setUserData(result)
            } else {
                toast.warning(result)
            }
        }

        async function setUsers() {
            const result = await listUsers(token)

            if (Array.isArray(result)) {
                setUsersList(result)
            } else {
                toast.warning(result)
            }
        }
        authorize()
        setUser()
        setUsers()
    }, [token, trigger, navigate, setContextToken])


    function refresh() {
        setTrigger(!trigger)
    }
    return (
        <StatusContextProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted">
                <div className="flex flex-col sm:py-4 sm:px-4">
                    <header className="sticky top-0 z-30 flex flex-row justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:hidden">
                        <div className="flex items-center">
                            <NewUserDialog refresh={refresh} />
                        </div>
                        <div className="md:grow-0">
                            <HeaderMenu />
                        </div>
                    </header>
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Tabs defaultValue="all">
                            <TabsContent value="all">
                                <Card x-chunk="dashboard-06-chunk-0" className="border-transparent">
                                    <UserTabsSetting userData={userData} usersList={usersList} refresh={refresh} />
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        </StatusContextProvider >
    )
}