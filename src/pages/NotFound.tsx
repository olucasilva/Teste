import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="w-full lg:grid lg:min-h-screen xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Erro 404</h1>
                        <p className="text-balance text-muted-foreground">
                            Página não encontrada
                        </p>
                    </div>
                    <form>
                        <div className="grid gap-4">
                            <Button onClick={() => { navigate('/') }} className="w-full">
                                Voltar ao início
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default NotFound