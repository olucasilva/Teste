import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { UserRow } from "./UserRow";
import { IUsersList } from "@/controllers/userController";

interface IUsersTableProps{
    data: IUsersList[]
    refresh: () => void
}

export const UsersTable = ({data, refresh}: IUsersTableProps) => {
    return (
        <Table className="sm:w-1/3 sm:ml-[50%] sm:translate-x-[-50%]">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Usuário</TableHead>
                    <TableHead className="text-center">Administrador</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((d: IUsersList) => (
                        <UserRow key={d.id} userData={d} refresh={refresh} />
                    ))
                }
            </TableBody>
        </Table>
    )
}