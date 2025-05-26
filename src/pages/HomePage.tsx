import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SearchForm from '../components/SearchForm';
import StudentInfo from '../components/StudentInfo';
import AttendanceTable from '../components/AttendanceTable';
import ErrorMessage from '../components/ErrorMessage';
import { useStudentData } from '../hooks/useStudentData';
import AttendanceStats from '../components/AttendanceStats';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();
  const [searchDni, setSearchDni] = useState<string>('');
  const { student, attendances, loading, error, fetchStudentData } = useStudentData();

  const handleSearch = async (dni: string) => {
    setSearchDni(dni);
    await fetchStudentData(dni);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-8 transition-colors duration-300`}>
        <SearchForm onSearch={handleSearch} isLoading={loading} />
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && student && (
        <>
          <StudentInfo student={student} />
          
          {attendances && attendances.length > 0 ? (
            <>
              <AttendanceStats attendances={attendances} />
              <AttendanceTable attendances={attendances} />
            </>
          ) : (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mt-6 text-center transition-colors duration-300`}>
              <p className="text-lg">No hay registros de asistencia para este alumno.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;