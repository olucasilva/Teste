import { AppContext } from "@/components/Context/AppContext";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/controllers/userController";
import { setToken } from "@/services/storage";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface ILoginProps {
    username: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<ILoginProps>();
    const { setContextToken } = useContext(AppContext)

    const onSubmit: SubmitHandler<ILoginProps> = (data) => {
        async function doLogin() {
            try {
                const { result, token, error } = await login(data);
                if (result) {
                    setToken(token);
                    setContextToken(token);
                    navigate("/");
                } else {
                    toast.warning(error || "Ocorreu um erro inesperado.");
                    reset();
                }
            } catch (error) {
                console.error("Erro durante o login:", error);
                toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
                reset();
            }
        }
        doLogin();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="max-w-sm m-auto mt-24">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Entre com email e senha abaixo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Usuário</Label>
                        <Input id="email" type="text" {...register('username')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" {...register('password')} required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">Entrar</Button>
                </CardFooter>
            </Card>
        </form>
    )
}