import { Delete } from "@/controllers/appController";
import { toast } from "sonner";
import { MyTooltip } from "../MyTooltip";
import { Trash2 } from "lucide-react";
import { forwardRef, useContext } from "react";
import { IAppsData } from "./AppsTable";
import { AppContext } from "../Context/AppContext";

interface IDeleteAppProps {
    appData: IAppsData
    setLoading: (arg: number) => void
}

export const DeleteApp = forwardRef<SVGSVGElement, IDeleteAppProps>(({ appData: { id, name, status, method }, setLoading }, ref) => {
    const { token } = useContext(AppContext)
    async function dropEnv(id: number, method: number, name: string) {
        if (method == 2)
            toast.warning("Exclusão bloqueada", {
                description: `Para excluir o ambiente ${name}, faça um pull request.`
            })
        else {
            setLoading(id)
            toast("Exclusão", {
                description: `Excluindo o ambiente ${name}`,
            })
            const { result, error } = await Delete(name, token);
            if (result) {
                toast("Exclusão", {
                    description: `Ambiente ${name} excluído com sucesso`,
                })
            } else {
                toast.error("Exclusão mal sucedida", {
                    description: error,
                })
            }
            setLoading(0)
        }
    }

    return (
        <>
            {
                status == 4 ? (
                    <MyTooltip text="Remover ambiente">
                        <Trash2 className="hover:text-red-500 cursor-pointer" ref={ref} onClick={() => dropEnv(id, method, name)} />
                    </MyTooltip>
                ) : (
                    <Trash2 className="text-muted-foreground" />
                )
            }
        </>
    )
})