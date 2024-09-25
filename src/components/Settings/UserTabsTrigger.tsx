import { TabsTrigger } from "../ui/tabs";

interface IProps {
    isAdm: boolean
}

export const UserTabsTrigger = ({ isAdm }: IProps) => {
    if (!isAdm) return null;
    return <TabsTrigger value="users">Usuários</TabsTrigger>;
}