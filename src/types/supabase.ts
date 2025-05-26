export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      alumnos: {
        Row: {
          id: string
          dni: string
          nombres: string
          apellidos: string
        }
        Insert: {
          id?: string
          dni: string
          nombres: string
          apellidos: string
        }
        Update: {
          id?: string
          dni?: string
          nombres?: string
          apellidos?: string
        }
        Relationships: []
      }
      asistencias: {
        Row: {
          id: string
          alumno_dni: string
          fecha: string
          estado: string
        }
        Insert: {
          id?: string
          alumno_dni: string
          fecha: string
          estado: string
        }
        Update: {
          id?: string
          alumno_dni?: string
          fecha?: string
          estado?: string
        }
        Relationships: [
          {
            foreignKeyName: "asistencias_alumno_dni_fkey"
            columns: ["alumno_dni"]
            referencedRelation: "alumnos"
            referencedColumns: ["dni"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}