import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent
} from "@/components/ui/tabs"
import { HeaderMenu } from "@/components/Dashboard/HeaderMenu"
import { NewAppDialog } from "@/components/NewApp/NewAppDialog"
import { StatusContextProvider } from "@/components/Context/StatusContext"
import { AppsTable } from "@/components/Apps/AppsTable"

export const Dashboard = () => {
    return (
        <StatusContextProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted">
                <div className="flex flex-col sm:py-4 sm:px-4">
                    <header className="sticky top-0 z-30 flex flex-row justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:hidden">
                        <div className="flex items-center">
                            <NewAppDialog />
                        </div>
                        <div className="md:grow-0">
                            <HeaderMenu />
                        </div>
                    </header>
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Tabs defaultValue="all">
                            <TabsContent value="all">
                                <Card x-chunk="dashboard-06-chunk-0" className="border-transparent">
                                    <CardHeader>
                                        <div className="flex flex-row justify-between">
                                            <div>
                                                <CardTitle>Ambientes</CardTitle>
                                                <CardDescription>
                                                    Gerencie os ambientes de teste.
                                                </CardDescription>
                                            </div>
                                            <div className="md:grow-0 hidden sm:block">
                                                <HeaderMenu />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <AppsTable />
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-center">
                                        <div className="flex items-center mt-4 hidden sm:block">
                                            <NewAppDialog />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        </StatusContextProvider>
    )
}