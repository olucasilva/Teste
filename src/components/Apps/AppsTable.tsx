import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../Context/StatusContext";
import { AppRow } from "./AppRow";
import { getDeployWs } from "@/services/getConfig";

export interface IAppsData {
    id: number;
    name: string;
    status: number;
    method: number;
    author: string;
    branchBase: string;
    creationDate: Date;
    error: string;
}

export const AppsTable = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [data, setData] = useState<IAppsData[]>([]);
    const { setContextStatus } = useContext(StatusContext);

    useEffect(() => {
        async function fetchUrl() {
            const result = await getDeployWs();
            setUrl(result);
        }
        fetchUrl();
    }, []);

    useEffect(() => {
        if (!url) return;

        let socket = new WebSocket(`${url}/ws`);

        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        socket.onmessage = (event) => {
            try {
                const jsonData = JSON.parse(event.data) || [];
                if (Array.isArray(jsonData)) {
                    setData(jsonData);
                    const statusArray = jsonData.map((d: IAppsData) => ({
                        id: d.id,
                        status: d.status,
                    }));
                    setContextStatus(statusArray);
                } else {
                    console.warn("Unexpected data format", jsonData);
                }
            } catch (error) {
                console.error("Error processing WebSocket message", error);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
            setTimeout(() => {
                console.log("Attempting to reconnect...");
                socket = new WebSocket(`${url}/ws`);
            }, 5000);
        };

        return () => {
            socket.close();
        };
    }, [url, setContextStatus]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                        Método de criação
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                        Autor
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                        Baseado em
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                        Criado em
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                        Atualizado em
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((d: IAppsData) => (
                    <AppRow appData={d} key={d.id} />
                ))}
            </TableBody>
        </Table>
    );
};
