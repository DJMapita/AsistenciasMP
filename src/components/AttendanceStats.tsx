import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CalendarDays, Check, X } from 'lucide-react';
import { Attendance } from '../types';

interface AttendanceStatsProps {
  attendances: Attendance[];
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ attendances }) => {
  const { darkMode } = useTheme();

  const totalAttendances = attendances.length;
  const presentCount = attendances.filter(a => a.estado.toLowerCase() === 'presente').length;
  const absentCount = attendances.filter(a => a.estado.toLowerCase() === 'ausente').length;
  const otherCount = totalAttendances - presentCount - absentCount;

  const presentPercentage = totalAttendances > 0 ? Math.round((presentCount / totalAttendances) * 100) : 0;
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300 animate-fade-in`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CalendarDays className="mr-2 text-amber-500" />
        Resumen de Asistencias
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total de días</p>
              <p className="text-2xl font-bold">{totalAttendances}</p>
            </div>
            <CalendarDays className="h-10 w-10 text-amber-500" />
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Presentes</p>
              <p className="text-2xl font-bold text-green-500">{presentCount}</p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${presentPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{presentPercentage}% de asistencia</p>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ausentes</p>
              <p className="text-2xl font-bold text-red-500">{absentCount}</p>
            </div>
            <div className="p-2 rounded-full bg-red-100">
              <X className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;