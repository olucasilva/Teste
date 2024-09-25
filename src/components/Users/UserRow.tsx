import { IUsersList } from "@/controllers/userController";
import { TableCell, TableRow } from "../ui/table"
import { DeleteUser } from "./DeleteUser";
import { CircleCheck, CircleX } from "lucide-react";
import { EditUserDialog } from "../EditUser/EditUserDialog";

interface IUserRowProps {
    userData: IUsersList
    refresh: () => void
}

export const UserRow = ({ userData, refresh }: IUserRowProps) => {
    return (
        <TableRow>
            <TableCell className="font-medium text-center">
                {userData.username}
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
                {userData.isAdm ? (
                    <CircleCheck className="text-green-400 m-auto" />
                ) : (
                    <CircleX className="text-red-600 m-auto" />
                )}
            </TableCell>
            <TableCell>
                <EditUserDialog refresh={refresh} userData={userData} />
            </TableCell>
            <TableCell>
                <DeleteUser userId={userData.id} refresh={refresh} />
            </TableCell>
        </TableRow >
    )
}