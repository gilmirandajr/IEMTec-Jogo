import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CalendarioEmocional from "./pages/CalendarioEmocional";
import MeditacaoGuiada from "./pages/MeditacaoGuiada";
import OucaOsSentimentos from "./pages/OucaOsSentimentos";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/calendario"} component={CalendarioEmocional} />
      <Route path={"/meditacao"} component={MeditacaoGuiada} />
      <Route path={"/jogo"} component={OucaOsSentimentos} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
