import { X } from "lucide-react"
import { NewUserButton } from "./NewUserButton"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useState } from "react";
import { NewUserForm } from "./NewUserForm";

interface INewUserDialogProps {
    refresh: () => void
}

export const NewUserDialog = ({ refresh }: INewUserDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <NewUserButton setIsOpen={setIsOpen} />
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[95%] rounded-xl sm:w-1/2">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between items-center px-2 mb-4">
                        <span className="text-primary">
                            Cadastro
                        </span>
                        <div>
                            <X onClick={() => setIsOpen(false)} className="text-muted-foreground cursor-pointer" />
                        </div>
                    </AlertDialogTitle>
                    <div className="w-full h-full flex">
                        <NewUserForm setIsOpen={setIsOpen} refresh={refresh} />
                    </div>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}