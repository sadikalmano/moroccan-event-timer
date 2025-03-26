
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Migration from './pages/Migration';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { AuthProvider } from './contexts/AuthContext';
import { setupMockAPI } from './utils/mockApi';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  useEffect(() => {
    // Set up mock API for development
    if (import.meta.env.DEV) {
      setupMockAPI();
    }
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <CookieConsentProvider>
            <AuthProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/migration" element={<Migration />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </Layout>
            </AuthProvider>
          </CookieConsentProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
