import { create } from 'zustand';

const useFormPanitiaStore = create((set, get) => ({
  // State
  formData: {
    name: '',
    nim: '',
    angkatan: '',
    kelas: '',
    programStudi: '',
    tempatLahir: '',
    tanggalLahir: '',
    whatsapp: '',
    email: '',
    divisi: '',
    komitmenAcara: false,
    komitmenDivisi: false,
    riwayatPenyakit: ''
  },

  participants: [],

  // Actions
  setFormData: (field, value) => 
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    })),

  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
      formData: {
        name: '',
        nim: '',
        angkatan: '',
        kelas: '',
        programStudi: '',
        tempatLahir: '',
        tanggalLahir: '',
        whatsapp: '',
        email: '',
        divisi: '',
        komitmenAcara: false,
        komitmenDivisi: false,
        riwayatPenyakit: ''
      }
    })),

  removeParticipant: (id) =>
    set((state) => ({
      participants: state.participants.filter(p => p.id !== id)
    })),

  resetForm: () =>
    set({
      formData: {
        name: '',
        nim: '',
        angkatan: '',
        kelas: '',
        programStudi: '',
        tempatLahir: '',
        tanggalLahir: '',
        whatsapp: '',
        email: '',
        divisi: '',
        komitmenAcara: false,
        komitmenDivisi: false,
        riwayatPenyakit: ''
      }
    }),

  // Validation
  validateForm: () => {
    const { formData } = get();
    const requiredFields = [
      formData.name,
      formData.nim,
      formData.angkatan,
      formData.kelas,
      formData.programStudi,
      formData.tempatLahir,
      formData.tanggalLahir,
      formData.whatsapp,
      formData.email,
      formData.divisi,
      formData.riwayatPenyakit
    ];

    // Cek semua field wajib terisi
    const allFieldsFilled = requiredFields.every(field => field && field.toString().trim() !== '');
    
    // Cek komitmen
    const komitmenValid = formData.komitmenAcara && formData.komitmenDivisi;

    return allFieldsFilled && komitmenValid;
  },

  // Statistics
  getStats: () => {
    const { participants } = get();
    const totalParticipants = participants.length;
    
    return { totalParticipants };
  }
}));

export default useFormPanitiaStore;