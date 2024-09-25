import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { forwardRef } from "react";

interface NewAppButtonProps {
    setIsOpen: (arg: boolean) => void;
}

export const NewUserButton = forwardRef<HTMLButtonElement, NewAppButtonProps>(({ setIsOpen }, ref) => {
    return (
        <Button
            ref={ref}
            variant="ghost"
            className="cursor-pointer"
            id="addEnv"
            onClick={() => setIsOpen(true)}>
            <Plus />
            <Label className="pl-1 cursor-pointer">Adicionar usuário</Label>
        </Button>
    )
})