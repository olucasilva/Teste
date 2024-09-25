import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { X } from "lucide-react"
import { StepperBar } from "../chakra/stepperBar"
import { Label } from "../ui/label"
import { Box } from "@chakra-ui/react"

interface IStatus {
    status: number
    id: number
    error?: string
}

function getStatus(status: number): string {
    return {
        0: "Clonando",
        1: "Compilando",
        2: "Publicando",
        3: "Finalizando",
        4: "Ativo",
        5: "Erro"
    }[status] || ""
}

export const ProgressBar = ({ status, id, error }: IStatus) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {status < 4 ? (
                    <Badge variant="outline" className="cursor-pointer bg-blue-500/50 border-transparent">{getStatus(status)}</Badge>
                ) : status > 4 ? (
                    <Badge variant="outline" className="cursor-pointer bg-red-500/50 border-transparent">{getStatus(status)}</Badge>
                ) : (
                    <Badge variant="outline" className="cursor-pointer bg-green-500/50 border-transparent">{getStatus(status)}</Badge>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-4/6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between items-center px-2">
                        <span className="text-primary">
                            Progresso
                        </span>
                        <div>
                            <X onClick={() => setIsOpen(false)} className="text-muted-foreground cursor-pointer" />
                        </div>
                    </AlertDialogTitle>
                    <Box className="px-2 pt-4">
                        {
                            status <= 4 ? (
                                <StepperBar id={id} />
                            ) : (
                                <Label>{error}</Label>
                            )
                        }
                    </Box>                    
                    <AlertDialogDescription title={getStatus(status)} />
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}