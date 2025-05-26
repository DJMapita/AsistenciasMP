import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Student, Attendance } from '../types';

export const useStudentData = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [attendances, setAttendances] = useState<Attendance[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentData = async (dni: string) => {
    setLoading(true);
    setError(null);
    setStudent(null);
    setAttendances(null);

    try {
      // Step 1: Get the student information
      const { data: studentData, error: studentError } = await supabase
        .from('alumnos')
        .select('*')
        .eq('dni', dni)
        .single();

      if (studentError) {
        if (studentError.code === 'PGRST116') {
          setError(`No se encontró ningún alumno con el DNI ${dni}`);
        } else {
          setError(`Error al buscar alumno: ${studentError.message}`);
        }
        setLoading(false);
        return;
      }

      setStudent(studentData as Student);

      // Step 2: Get the attendance records for this student
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('asistencias')
        .select('*')
        .eq('alumno_dni', dni)
        .order('fecha', { ascending: false });

      if (attendanceError) {
        setError(`Error al obtener asistencias: ${attendanceError.message}`);
        setLoading(false);
        return;
      }

      setAttendances(attendanceData as Attendance[]);
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, intente nuevamente.');
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    student,
    attendances,
    loading,
    error,
    fetchStudentData
  };
};