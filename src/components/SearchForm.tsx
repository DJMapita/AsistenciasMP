import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (dni: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const { darkMode } = useTheme();
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');

  const validateDni = (value: string): boolean => {
    // This is a simple validation, adjust according to your DNI format requirements
    return /^\d{8,9}$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dni.trim()) {
      setError('Por favor, ingrese un DNI');
      return;
    }
    
    if (!validateDni(dni)) {
      setError('El DNI debe tener entre 8 y 9 dígitos');
      return;
    }
    
    setError('');
    onSearch(dni);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Consultar Asistencias</h2>
      <div className="mb-4">
        <label htmlFor="dni" className="block mb-2 font-medium">
          DNI del Alumno
        </label>
        <div className="relative">
          <input
            id="dni"
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ingrese el DNI del alumno"
            className={`w-full px-4 py-3 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 focus:border-indigo-500' 
                : 'bg-gray-50 border-gray-300 focus:border-indigo-600'
            } border outline-none transition-colors duration-300`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          isLoading 
            ? 'bg-amber-400 cursor-not-allowed' 
            : 'bg-amber-500 hover:bg-amber-600'
        } text-white transition-colors duration-300 flex justify-center items-center`}
      >
        {isLoading ? 'Buscando...' : 'Buscar Asistencias'}
      </button>
    </form>
  );
};

export default SearchForm;