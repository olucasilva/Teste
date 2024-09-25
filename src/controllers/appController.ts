import { getDeployUrl } from '@/services/getConfig';
import axios from 'axios';

const token = "CkfFTyOlb820V6i0REoWTC9pPBZP27c1gbykYY7eXxzdsYg2DUTLuasTzHumMQJV"

export interface IAppResponse {
    result: boolean
    error?: string
}

export const Create = async (name: string, authorToken: string): Promise<IAppResponse> => {
    const branch = 'main'
    const urlrepo = 'admin@rep.blaise.com.br:Blaise/BLSNextV8.git'

    const options = {
        url: `${await getDeployUrl()}/app/create`,
        method: 'POST',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        },
        data: { name, branch, urlrepo, authorToken }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha no envio dos dados." : "Ocorreu um erro inesperado."
    }
};

export const Delete = async (appname: string, user: string): Promise<IAppResponse> => {
    const options = {
        url: `${await getDeployUrl()}/app/delete`,
        method: 'POST',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        },
        data: { appname, user }
    }

    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        return axios.isAxiosError(error) ? error.response?.data || "Falha no envio dos dados." : "Ocorreu um erro inesperado."
    }
};
