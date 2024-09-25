import { IFormUser } from "@/components/NewUser/NewUserForm";
import { ILoginProps } from "@/pages/Login";
import { getDeployUrl } from "@/services/getConfig";
import axios from "axios";

const ApiToken = "CkfFTyOlb820V6i0REoWTC9pPBZP27c1gbykYY7eXxzdsYg2DUTLuasTzHumMQJV"

interface IResponse{    
    result: boolean
    error?: string
}

interface IUserResponse {
    result: boolean
    token: string
    error?: string
}

export interface IUsersList {
    id: number,
    name: string
    username: string
    isAdm: boolean
}

export interface IUpdateUser {
    id: number
    name: string
    password: string
    isAdm: boolean
    token: string
}

export const login = async ({ username, password }: ILoginProps): Promise<IUserResponse> => {
    const options = {
        url: `${await getDeployUrl()}/user/login`,
        method: 'POST',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        },
        data: { username, password }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar solicitação de login." : "Ocorreu um erro inesperado."
    }
}

export const logout = async (token: string): Promise<IUserResponse> => {
    const options = {
        url: `${await getDeployUrl()}/user/logout/${token}`,
        method: 'GET',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar solicitação de logout." : "Ocorreu um erro inesperado."
    }
};

export const authorization = async (token: string): Promise<IResponse> => {
    const options = {
        url: `${await getDeployUrl()}/user/authorization`,
        method: 'POST',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        },
        data: { token }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar solicitação." : "Ocorreu um erro inesperado."
    }
};

export const createUser = async ({ name, username, password, isAdm }: IFormUser, creatorToken: string): Promise<IUserResponse> => {
    const options = {
        url: `${await getDeployUrl()}/user/create`,
        method: 'POST',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        },
        data: { name, username, password, isAdm, creatorToken }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar solicitação de login." : "Ocorreu um erro inesperado."
    }
}

export const updateUser = async ({ id, name, password, isAdm, token }: IUpdateUser): Promise<IUserResponse> => {
    const options = {
        url: `${await getDeployUrl()}/user/update`,
        method: 'PUT',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        },
        data: { id, name, password, isAdm, token }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar solicitação de login." : "Ocorreu um erro inesperado."
    }
}

export const deleteUser = async (id: number, token: string): Promise<IUserResponse> => {
    const options = {
        url: `${await getDeployUrl()}/user/delete`,
        method: 'DELETE',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        },
        data: { id, token }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar solicitação de logout." : "Ocorreu um erro inesperado."
    }
};

export const listUsers = async (token: string): Promise<IUsersList[]> => {
    const options = {
        url: `${await getDeployUrl()}/users/list/${token}`,
        method: 'GET',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar requisição." : "Ocorreu um erro inesperado."
    }
};

export const listUser = async (token: string): Promise<IUsersList> => {
    const options = {
        url: `${await getDeployUrl()}/user/list/${token}`,
        method: 'GET',
        headers: {
            'Authorization': `${ApiToken}`,
            'Content-Type': 'application/json'
        }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha ao enviar requisição." : "Ocorreu um erro inesperado."
    }
};
