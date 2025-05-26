import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Attendance } from '../types';

interface AttendanceTableProps {
  attendances: Attendance[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendances }) => {
  const { darkMode } = useTheme();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'presente':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'ausente':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'presente':
        return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      case 'ausente':
        return darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-colors duration-300 animate-fade-in`}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Registro de Asistencias</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-300`}>
            <tr>
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {attendances.map((attendance) => (
              <tr 
                key={attendance.id} 
                className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}
              >
                <td className="py-4 px-6">
                  {formatDate(attendance.fecha)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(attendance.estado)}`}>
                      {getStatusIcon(attendance.estado)}
                      <span className="ml-2">{attendance.estado}</span>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;