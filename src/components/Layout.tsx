import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';
import { School } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/MP-School.png"
            alt="Logo de MP School con un edificio escolar estilizado a la izquierda y el texto MP School a la derecha, fondo claro, ambiente profesional y acogedor"
            style={{ maxWidth: '336px', maxHeight: '336px' }}
          />
          <h1 className="text-3xl font-bold text-center">Sistema de Asistencias</h1>
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Consulta la asistencia de tu hijo/a de manera rápida y sencilla
          </p>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;