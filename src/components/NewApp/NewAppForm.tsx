import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Create, IAppResponse } from "@/controllers/appController";
import { forwardRef, useContext } from "react";
import { Button } from "../ui/button";
import { AppContext } from "../Context/AppContext";
import { toast } from "sonner";

interface FormValues {
    name: string;
};

interface NewAppFormProps {
    setIsOpen: (arg: boolean) => void;
}

export const NewAppForm = forwardRef<HTMLButtonElement, NewAppFormProps>(({ setIsOpen }, ref) => {
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { token } = useContext(AppContext)

    async function onSubmit(data: FormValues) {
        setIsOpen(false)
        reset();
        const response: IAppResponse = await Create(data.name, token);
        if (response.result) {
            return
        }
        toast.error(response.error)
    }

    return (
        <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full h-full items-center space-x-2">
                <Input
                    id="name"
                    placeholder="Nome"
                    required
                    {...register("name")}
                />
                <Button type="submit" ref={ref}>Criar</Button>
            </div>
        </form>
    );
});

