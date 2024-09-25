export async function getDeployUrl(): Promise<string> {
    try {
        const response = await fetch('/config.json');
        const config = await response.json();
        return config.DEPLOYER_URL;
    } catch (error) {
        console.error("Erro ao buscar o config.json", error);
        return "";
    }
}

export async function getDeployWs(): Promise<string> {
    try {
        const response = await fetch('/config.json');
        const config = await response.json();
        return config.DEPLOYER_WS;
    } catch (error) {
        console.error("Erro ao buscar o config.json", error);
        return "";
    }
}