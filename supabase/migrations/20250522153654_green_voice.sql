/*
  # Create Initial Schema for School Attendance System

  1. New Tables
    - `alumnos` - Stores student information
      - `id` (uuid, primary key)
      - `dni` (varchar, unique identifier)
      - `nombres` (text, student first name(s))
      - `apellidos` (text, student last name(s))
    
    - `asistencias` - Stores attendance records
      - `id` (uuid, primary key)
      - `alumno_dni` (varchar, foreign key to alumnos.dni)
      - `fecha` (date, attendance date)
      - `estado` (varchar, attendance status)
  
  2. Security
    - Enable RLS on all tables
    - Allow public read access (since this is a read-only parent portal)
*/

-- Create alumnos table
CREATE TABLE IF NOT EXISTS alumnos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dni varchar NOT NULL UNIQUE,
  nombres text NOT NULL,
  apellidos text NOT NULL
);

-- Create asistencias table
CREATE TABLE IF NOT EXISTS asistencias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumno_dni varchar NOT NULL REFERENCES alumnos(dni),
  fecha date NOT NULL,
  estado varchar NOT NULL
);

-- Enable Row Level Security
ALTER TABLE alumnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE asistencias ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for read access
CREATE POLICY "Allow public read access to alumnos"
  ON alumnos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to asistencias"
  ON asistencias
  FOR SELECT
  TO public
  USING (true);

-- Insert sample data for testing
INSERT INTO alumnos (dni, nombres, apellidos)
VALUES 
  ('12345678', 'Ana María', 'Gómez Pérez'),
  ('87654321', 'Carlos Eduardo', 'Rodríguez López'),
  ('11223344', 'Sofía Valentina', 'Martínez Díaz');

-- Insert sample attendance records
INSERT INTO asistencias (alumno_dni, fecha, estado)
VALUES
  -- Ana María's attendance
  ('12345678', CURRENT_DATE - INTERVAL '1 day', 'Presente'),
  ('12345678', CURRENT_DATE - INTERVAL '2 day', 'Presente'),
  ('12345678', CURRENT_DATE - INTERVAL '3 day', 'Ausente'),
  ('12345678', CURRENT_DATE - INTERVAL '4 day', 'Presente'),
  ('12345678', CURRENT_DATE - INTERVAL '5 day', 'Presente'),
  
  -- Carlos Eduardo's attendance
  ('87654321', CURRENT_DATE - INTERVAL '1 day', 'Ausente'),
  ('87654321', CURRENT_DATE - INTERVAL '2 day', 'Presente'),
  ('87654321', CURRENT_DATE - INTERVAL '3 day', 'Presente'),
  ('87654321', CURRENT_DATE - INTERVAL '4 day', 'Presente'),
  ('87654321', CURRENT_DATE - INTERVAL '5 day', 'Tarde'),
  
  -- Sofía Valentina's attendance
  ('11223344', CURRENT_DATE - INTERVAL '1 day', 'Presente'),
  ('11223344', CURRENT_DATE - INTERVAL '2 day', 'Presente'),
  ('11223344', CURRENT_DATE - INTERVAL '3 day', 'Presente'),
  ('11223344', CURRENT_DATE - INTERVAL '4 day', 'Ausente'),
  ('11223344', CURRENT_DATE - INTERVAL '5 day', 'Presente');