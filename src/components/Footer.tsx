import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`py-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © {year} Colegio Mateo Pumacahua. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;