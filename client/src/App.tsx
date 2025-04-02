import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-dots bg-gradient-to-br from-dark to-dark-lighter font-sans text-gray-100 overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-primary opacity-10 blur-[80px] animate-pulse-slow"></div>
          <div className="absolute top-[60%] right-[15%] w-80 h-80 rounded-full bg-secondary opacity-10 blur-[100px] animate-pulse-slow"></div>
        </div>
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
