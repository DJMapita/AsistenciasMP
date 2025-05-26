import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-lg p-4 mb-6 animate-fade-in transition-colors duration-300`}>
      <div className="flex items-center">
        <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
        <p className={`${darkMode ? 'text-red-400' : 'text-red-800'}`}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;