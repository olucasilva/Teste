import { RefreshCw } from "lucide-react"
import { TableCell, TableRow } from "../ui/table"
import { useContext, useState } from "react";
import { Spinner } from '@chakra-ui/react'
import { MyTooltip } from "../MyTooltip";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Create } from "@/controllers/appController";
import { AppContext } from "../Context/AppContext";
import { IAppsData } from "./AppsTable";
import { ProgressBar } from "./progressBar";
import { DeleteApp } from "./DeleteApp";

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function getMethod(method: number): string {
    return {
        1: "Automático",
        2: "Manual"
    }[method] || ""
}

interface IAppRowProps {
    appData: IAppsData
}

export const AppRow = ({ appData }: IAppRowProps) => {
    const method = getMethod(appData.method)
    const creationDate = new Date(appData.creationDate)
    const { token } = useContext(AppContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(0)

    async function reloadEnv(data: IAppsData) {
        setLoading(data.id)
        toast("Criação", {
            description: "Tentando criar o ambiente novamente",
        })
        Create(data.name, token);
        setTimeout(() => {
            setLoading(0)
            navigate('/')
        }, 1000);

    }
    return (
        <TableRow>
            <TableCell className="font-medium underline">
                <Link to={`https://next.blaise.com.br/${appData.name}`} target="_blank">
                    {appData.name}
                </Link>
            </TableCell>
            <TableCell className="text-center">
                <ProgressBar status={appData.status} id={appData.id} error={appData.error} />
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
                {method}
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
                {appData.author}
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
                {appData.branchBase}
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
                {formatDate(creationDate)}
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
                {formatDate(creationDate)}
            </TableCell>
            <TableCell>
                {
                    loading == appData.id ? (
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='red.500'
                            size='md'
                        />
                    ) : appData.status == 5 ? (
                        <MyTooltip text="Tentar novamente">
                            <RefreshCw className="hover:text-primary cursor-pointer" onClick={() => reloadEnv(appData)} />
                        </MyTooltip>
                    ) : (
                        <DeleteApp appData={appData} setLoading={setLoading} />
                    )
                }
            </TableCell>
        </TableRow >
    )
}