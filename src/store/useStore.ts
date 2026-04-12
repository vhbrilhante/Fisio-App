import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SpreadsheetData {
  id: string;
  name: string;
  data: any[][]; // Grid de dados (linhas e colunas)
  updatedAt: string;
}

export interface Patient {
  id: string;
  nome_paciente: string;
  sexo: string;
  data_nascimento: string;
  idade: string;
  profissao: string;
  rg: string;
  cpf: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  telefone: string;
  email: string;
  nacionalidade: string;
  estado_civil: string;
  createdAt: string;
  generatedDocs?: string[];
  sheets?: SpreadsheetData[];
}

interface PatientStore {
  patients: Patient[];
  selectedPatientId: string | null;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'generatedDocs' | 'sheets'>) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  setSelectedPatient: (id: string | null) => void;
  registerDocumentToPatient: (patientId: string, filePath: string) => void;
  updatePatientSheet: (patientId: string, sheetId: string, data: any[][]) => void;
  addPatientSheet: (patientId: string, name: string) => void;
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: [],
      selectedPatientId: null,
      addPatient: (data) =>
        set((state) => {
          const newId = Date.now().toString() + Math.random().toString(36).substring(7);
          return {
            patients: [
              ...state.patients,
              {
                ...data,
                id: newId,
                createdAt: new Date().toISOString(),
                generatedDocs: [],
                sheets: [], // Inicializa vazio
              },
            ],
            selectedPatientId: newId,
          };
        }),
      updatePatient: (id, updates) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== id),
          selectedPatientId: state.selectedPatientId === id ? null : state.selectedPatientId,
        })),
      setSelectedPatient: (id) => set({ selectedPatientId: id }),
      registerDocumentToPatient: (patientId, filePath) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === patientId 
              ? { ...p, generatedDocs: [...(p.generatedDocs || []), filePath] } 
              : p
          ),
        })),
      addPatientSheet: (patientId, name) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === patientId 
              ? { 
                  ...p, 
                  sheets: [
                    ...(p.sheets || []), 
                    { 
                      id: Date.now().toString(), 
                      name, 
                      data: Array(20).fill(0).map(() => Array(10).fill("")), // Grid inicial 20x10
                      updatedAt: new Date().toISOString() 
                    }
                  ] 
                } 
              : p
          ),
        })),
      updatePatientSheet: (patientId, sheetId, data) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === patientId 
              ? { 
                  ...p, 
                  sheets: (p.sheets || []).map(s => 
                    s.id === sheetId ? { ...s, data, updatedAt: new Date().toISOString() } : s
                  ) 
                } 
              : p
          ),
        })),
    }),
    {
      name: 'fisio-patient-storage',
    }
  )
);
