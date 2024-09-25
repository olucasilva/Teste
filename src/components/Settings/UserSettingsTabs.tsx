import { IUsersList } from "@/controllers/userController";
import { HeaderMenu } from "../Dashboard/HeaderMenu";
import { NewUserDialog } from "../NewUser/NewUserDialog";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UpdateAccountForm } from "../Users/UpdateAccountForm";
import { UsersTable } from "../Users/UsersTable";
import { UserTabsTrigger } from "./UserTabsTrigger";

interface IProps {
    userData: IUsersList
    usersList: IUsersList[]
    refresh: () => void
}

export const UserTabsSetting = ({ userData, usersList, refresh }: IProps) => {
    return (
        <Tabs defaultValue="account" className="w-full">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Configurações</CardTitle>
                    </div>
                    <TabsList className="ml-2 space-x-2 bg-transparent sm:translate-x-[-30%]">
                        <TabsTrigger value="account">Minha conta</TabsTrigger>
                        <UserTabsTrigger isAdm={userData.isAdm} />
                    </TabsList>
                    <div className="md:grow-0 hidden sm:block">
                        <HeaderMenu />
                    </div>
                </div>
            </CardHeader>
            <TabsContent value="account" className="w-1/2 p-4 m-auto">
                <CardContent>
                    {userData && (<UpdateAccountForm data={userData} refresh={refresh} />)}
                </CardContent>
            </TabsContent>
            <TabsContent value="users">
                <CardContent>
                    <UsersTable data={usersList} refresh={refresh} />
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <div className="flex items-center mt-4 hidden sm:block">
                        <NewUserDialog refresh={refresh} />
                    </div>
                </CardFooter>
            </TabsContent>
        </Tabs>
    )
}