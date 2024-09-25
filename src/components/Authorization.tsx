import { useNavigate } from 'react-router-dom';
import { setToken } from '../services/storage';
import { useContext, useEffect } from 'react';
import { AppContext } from './Context/AppContext';
import { authorization, logout } from '@/controllers/userController';

export const Authorization = () => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate()
    const { setContextToken } = useContext(AppContext)

    useEffect(() => {
        async function authorize() {
            const result = await authorization(token)

            if (result) {
                if (!result.result) {
                    const { result } = await logout(token)

                    if (result) {
                        setToken('')
                        setContextToken('')
                        navigate('/')
                    }
                }
            }
        }

        authorize()
    }, [token, navigate, setContextToken])

    return null
}