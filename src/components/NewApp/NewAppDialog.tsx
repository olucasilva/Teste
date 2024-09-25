import { X } from "lucide-react"
import { NewAppButton } from "./NewAppButton"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useState } from "react";
import { NewAppForm } from "./NewAppForm";

export const NewAppDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <NewAppButton setIsOpen={setIsOpen} />
            </AlertDialogTrigger>
            <AlertDialogContent className="w-4/5 rounded-xl sm:w-2/6 sm:h-1/3">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between items-center px-2">
                        <span className="text-primary">
                            Criar ambiente
                        </span>
                        <div>
                            <X onClick={() => setIsOpen(false)} className="text-muted-foreground cursor-pointer" />
                        </div>
                    </AlertDialogTitle>
                    <div className="w-full h-full flex">
                        <NewAppForm setIsOpen={setIsOpen} />
                    </div>

                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}