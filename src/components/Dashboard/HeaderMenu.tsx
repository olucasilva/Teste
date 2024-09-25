import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { useTheme } from "../theme-provider"
import { Label } from "../ui/label"
import { Logout } from "../Logout"
import { Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const HeaderMenu = () => {
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
    let switchChecked = theme == "dark" ? true : false

    function changeTheme(theme: string) {
        if (theme == "light") {
            switchChecked = true
            setTheme("dark")
            return
        }
        setTheme("light");
        switchChecked = false
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="overflow-hidden rounded-full hover:bg-transparent"
                >
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuItem>
                    <Label htmlFor="dark-theme" className="pr-1 cursor-pointer">Tema Escuro</Label>
                    <Switch
                        checked={switchChecked}
                        id="dark-theme"
                        onCheckedChange={() => changeTheme(theme)}
                    />
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Logout>
                    <DropdownMenuItem className='cursor-pointer'>Sair</DropdownMenuItem>
                </Logout>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}