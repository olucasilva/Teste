import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { IAppResponse } from "@/controllers/appController";
import { forwardRef, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AppContext } from "../Context/AppContext";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { IUpdateUser, IUsersList, updateUser } from "@/controllers/userController";

export interface IFormUser {
    name: string;
    username: string;
    password: string;
    repassword: string;
    isAdm: boolean;
};

interface EditUserFormProps {
    setIsOpen: (arg: boolean) => void;
    refresh: () => void
    data: IUsersList
}

export const EditUserForm = forwardRef<HTMLButtonElement, EditUserFormProps>(({ setIsOpen, refresh, data }, ref) => {
    const { register, handleSubmit, reset, watch } = useForm<IFormUser>();
    const [chkIsAdm, setChkIsAdm] = useState(data.isAdm)
    const { token } = useContext(AppContext)

    const password = watch("password");
    const repassword = watch("repassword");

    const [validationRules, setValidationRules] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSymbol: false,
        minLength: false,
        passwordsMatch: false
    });

    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [isRepasswordFocused, setRepasswordFocused] = useState(false);

    useEffect(() => {
        setValidationRules({
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            minLength: password?.length >= 6,
            passwordsMatch: password === repassword
        });
    }, [password, repassword]);

    async function onSubmit(formData: IFormUser) {
        if (formData.password.length > 0 && formData.repassword.length > 0)
            if (!Object.values(validationRules).every(Boolean)) {
                toast.error("Senhas não correspondem ou não atendem aos critérios");
                return;
            }

        toast.message("Alterando dados ...")

        setIsOpen(false);
        reset();

        const userData: IUpdateUser = {
            id: data.id,
            name: formData.name,
            password: formData.password,
            isAdm: chkIsAdm,
            token: token
        };

        const response: IAppResponse = await updateUser(userData);
        if (response.result) {
            toast.success("Dados alterados com sucesso");
            refresh()
        } else {
            toast.error(response.error);
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 space-y-4 sm:w-full sm:items-center">
                <Input
                    id="name"
                    placeholder="Nome"
                    tabIndex={1}
                    defaultValue={data.name}
                    autoFocus
                    required
                    {...register("name")}
                />
                <Input
                    id="username"
                    tabIndex={2}
                    placeholder="Usuário"
                    value={data.username}
                    disabled
                    {...register("username")}
                />
                <Input
                    id="password"
                    type="password"
                    tabIndex={3}
                    placeholder="Senha"
                    {...register("password")}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                />

                {(isPasswordFocused && password !== "") && (
                    <div className="mt-2 ml-2 flex flex-col text-xs">
                        <p className={validationRules.minLength ? "text-green-500" : "text-red-500"}>
                            A senha deve ter pelo menos 6 caracteres
                        </p>
                        <p className={validationRules.hasUpperCase ? "text-green-500" : "text-red-500"}>
                            Deve conter ao menos uma letra maiúscula
                        </p>
                        <p className={validationRules.hasLowerCase ? "text-green-500" : "text-red-500"}>
                            Deve conter ao menos uma letra minúscula
                        </p>
                        <p className={validationRules.hasNumber ? "text-green-500" : "text-red-500"}>
                            Deve conter ao menos um número
                        </p>
                        <p className={validationRules.hasSymbol ? "text-green-500" : "text-red-500"}>
                            Deve conter ao menos um símbolo
                        </p>
                    </div>
                )}

                <Input
                    id="repassword"
                    type="password"
                    tabIndex={4}
                    placeholder="Repita a senha"
                    {...register("repassword")}
                    onFocus={() => setRepasswordFocused(true)}
                    onBlur={() => setRepasswordFocused(false)}
                />

                {(isRepasswordFocused && repassword !== "") && (
                    <div className="mt-2 ml-2 flex flex-col text-xs">
                        <p className={validationRules.passwordsMatch ? "text-green-500" : "text-red-500"}>
                            As senhas devem coincidir
                        </p>
                    </div>
                )}

                <div className="flex w-full items-center justify-center">
                    <Checkbox
                        id="isAdm"
                        onClick={() => data.id != 1 && setChkIsAdm(!chkIsAdm)}
                        checked={chkIsAdm}
                    />
                    <Label
                        htmlFor="isAdm"
                        className="pl-2"
                    >
                        Usuário administrador
                    </Label>
                </div>
            </div>
            <Button type="submit" ref={ref} className="w-full">Alterar</Button>
        </form>
    );
});

