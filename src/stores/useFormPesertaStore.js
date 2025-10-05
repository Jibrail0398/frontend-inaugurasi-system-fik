import { create } from 'zustand';

const useFormPesertaStore = create((set, get) => ({
  // State
  formData: {
    name: '',
    nim: '',
    angkatan: '',
    kelas: '',
    programStudi: '',
    tanggalLahir: '',
    whatsapp: '',
    email: '',
    ukuranKaos: 'L',
    nomorDarurat: '',
    tipeNomorDarurat: 'Ayah',
    riwayatPenyakit: '',
    pembayaran: 'Belum',
    buktiPembayaran: null,
    buktiPembayaranName: '' // Tambahan untuk menyimpan nama file
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

  setFileUpload: (file) =>
    set((state) => ({
      formData: {
        ...state.formData,
        buktiPembayaran: file,
        buktiPembayaranName: file ? file.name : '', // Simpan nama file
        pembayaran: file ? 'Sudah' : 'Belum'
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
        tanggalLahir: '',
        whatsapp: '',
        email: '',
        ukuranKaos: 'L',
        nomorDarurat: '',
        tipeNomorDarurat: 'Ayah',
        riwayatPenyakit: '',
        pembayaran: 'Belum',
        buktiPembayaran: null,
        buktiPembayaranName: '' // Reset juga nama file
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
        tanggalLahir: '',
        whatsapp: '',
        email: '',
        ukuranKaos: 'L',
        nomorDarurat: '',
        tipeNomorDarurat: 'Ayah',
        riwayatPenyakit: '',
        pembayaran: 'Belum',
        buktiPembayaran: null,
        buktiPembayaranName: '' // Reset juga nama file
      }
    }),

  // Validation - Diperbaiki
  validateForm: () => {
    const { formData } = get();
    return (
      formData.name && 
      formData.nim && 
      formData.angkatan && 
      formData.kelas && 
      formData.programStudi && 
      formData.tanggalLahir && 
      formData.whatsapp && 
      formData.email && 
      formData.riwayatPenyakit &&
      formData.buktiPembayaran // Hanya bukti pembayaran yang wajib, nomor darurat tidak
    );
  },

  // Statistics
  getStats: () => {
    const { participants } = get();
    const totalParticipants = participants.length;
    const sudahBayar = participants.filter(p => p.pembayaran === 'Sudah').length;
    const persentaseBayar = totalParticipants > 0 
      ? ((sudahBayar / totalParticipants) * 100).toFixed(0) 
      : 0;

    return { totalParticipants, sudahBayar, persentaseBayar };
  }
}));

export default useFormPesertaStore;