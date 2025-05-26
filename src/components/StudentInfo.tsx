import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { User } from 'lucide-react';
import { Student } from '../types';

interface StudentInfoProps {
  student: Student;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ student }) => {
  const { darkMode } = useTheme();

  return (
    <div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300 animate-fade-in`}
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
          <User className="h-8 w-8 text-amber-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{student.nombres}</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DNI: {student.dni}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;