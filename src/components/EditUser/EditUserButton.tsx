import { Edit } from "lucide-react"
import { forwardRef } from "react";
import { MyTooltip } from "../MyTooltip";

interface EditUserButtonProps {
    setIsOpen: (arg: boolean) => void;
}

export const EditUserButton = forwardRef<SVGSVGElement, EditUserButtonProps>(({ setIsOpen }, ref) => {
    return (
        <MyTooltip text="Editar usuário">
            <Edit
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
                ref={ref}
            />
        </MyTooltip>
    )
})