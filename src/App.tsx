
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Initialize the database on application startup
import { migrateDatabase } from "./utils/migrations";
try {
  migrateDatabase();
} catch (error) {
  console.error("Failed to run migrations:", error);
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <LanguageProvider>
            <CookieConsentProvider>
              <AuthProvider>
                <Toaster />
                <Sonner />
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/en" element={<Home />} />
                    <Route path="/fr" element={<Home />} />
                    <Route path="/ar" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/en/about" element={<About />} />
                    <Route path="/fr/about" element={<About />} />
                    <Route path="/ar/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/en/login" element={<Login />} />
                    <Route path="/fr/login" element={<Login />} />
                    <Route path="/ar/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/en/register" element={<Register />} />
                    <Route path="/fr/register" element={<Register />} />
                    <Route path="/ar/register" element={<Register />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </AuthProvider>
            </CookieConsentProvider>
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
