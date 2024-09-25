import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "./components/Context/AppContext";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { Toaster } from "sonner";
import { Authorization } from "./components/Authorization";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ChakraProvider>
          <AppContextProvider>
            <Toaster />
            <Authorization />
            <MainRoutes />
          </AppContextProvider>
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}