import { X } from "lucide-react"
import { EditUserButton } from "./EditUserButton"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useState } from "react";
import { EditUserForm } from "./EditUserForm";
import { IUsersList } from "@/controllers/userController";
interface IEditUserDialogProps {
    refresh: () => void
    userData: IUsersList
}

export const EditUserDialog = ({ refresh, userData }: IEditUserDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <EditUserButton setIsOpen={setIsOpen} />
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[95%] rounded-xl sm:w-1/2">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between items-center px-2 mb-4">
                        <span className="text-primary">
                            Alteração
                        </span>
                        <div>
                            <X onClick={() => setIsOpen(false)} className="text-muted-foreground cursor-pointer" />
                        </div>
                    </AlertDialogTitle>
                    <div className="w-full h-full flex">
                        <EditUserForm setIsOpen={setIsOpen} refresh={refresh} data={userData} />
                    </div>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}