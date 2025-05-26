export interface Student {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
}

export interface Attendance {
  id: string;
  alumno_dni: string;
  fecha: string;
  estado: string;
}