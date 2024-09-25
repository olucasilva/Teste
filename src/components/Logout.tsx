import { useNavigate } from 'react-router-dom';
import { setToken } from '../services/storage';
import { useContext } from 'react';
import { Label } from './ui/label';
import { AppContext } from './Context/AppContext';
import { logout } from '@/controllers/userController';
import { toast } from 'sonner';

interface ILogoutProps {
    children: React.ReactNode
}

export const Logout = ({ children }: ILogoutProps) => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate()
    const { setContextToken } = useContext(AppContext)

    async function doLogout() {
        const { result, error } = await logout(token)

        if (result) {
            setToken('')
            setContextToken('')
            navigate('/')
        } else {
            toast.warning(error || "Ocorreu um erro inesperado.");
        }
    }
    return (
        <Label onClick={() => doLogout()}>{children}</Label>
    );
}