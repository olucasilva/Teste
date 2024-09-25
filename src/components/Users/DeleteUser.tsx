import { toast } from "sonner";
import { MyTooltip } from "../MyTooltip";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { deleteUser } from "@/controllers/userController";

interface IDeleteUserProps {
    userId: number
    refresh: () => void
}

export const DeleteUser = ({ userId, refresh }: IDeleteUserProps) => {
    const { token } = useContext(AppContext)

    async function doDeleteUser(id: number) {
        if (userId == 1) {
            toast.warning("Exclusão bloqueada", {
                description: `Não é permitido excluir o usuário administrador`,
            })
            return
        }

        const { result, error } = await deleteUser(id, token);
        if (result) {
            toast("Exclusão", {
                description: `Usuário excluído com sucesso`,
            })
            refresh()
        } else {
            toast.error("Exclusão mal sucedida", {
                description: error,
            })
        }
    }

    return (
        <>
            {
                userId != 1 ? (
                    <MyTooltip text="Excluir usuário">
                        <Trash2 className="hover:text-red-500 cursor-pointer" onClick={() => doDeleteUser(userId)} />
                    </MyTooltip>
                ) : (
                    <MyTooltip text="Exclusão bloqueada">
                        <Trash2 className="text-muted-foreground" />
                    </MyTooltip>
                )
            }
        </>
    )
}