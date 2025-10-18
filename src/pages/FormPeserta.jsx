import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFormPesertaStore from '../stores/useFormPesertaStore';
import '../style/FormPeserta.css';
import { create } from '../services/persertaService';


const FormPeserta = () => {
  const { kodeEvent } = useParams();
  
  const {
    formData,
    setFormData,
    setFileUpload,
    validateForm,
    resetForm,
  } = useFormPesertaStore();

  const [isLoading, setIsLoading] = useState(false);
  
  
  const ukuranKaosOptions = ['S', 'M', 'L', 'XL', 'XXL'];
  const tipeDaruratOptions = ['Ayah', 'Ibu', 'Saudara', 'Lainnya'];
  const programStudiOptions = ['Teknik Informatika', 'Sistem Informasi'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB.');
        e.target.value = ''; // Reset input file
        return;
      }
      setFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!validateForm()) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }

    setIsLoading(true);
    
    try {
      
      
      const formDataToSend = new FormData();
      formDataToSend.append('nama', formData.nama);                   
      formDataToSend.append('NIM', formData.NIM);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('nomor_whatapp', formData.nomor_whatapp); 
      formDataToSend.append('angkatan', formData.angkatan);
      formDataToSend.append('kelas', formData.kelas);
      formDataToSend.append('program_studi', formData.program_studi);
      formDataToSend.append('tanggal_lahir', formData.tanggal_lahir);
      formDataToSend.append('ukuran_kaos', formData.ukuran_kaos);
      formDataToSend.append('nomor_darurat', formData.nomor_darurat || '');
      formDataToSend.append('tipe_nomor_darurat', formData.tipe_nomor_darurat || '');
      formDataToSend.append('riwayat_penyakit', formData.riwayat_penyakit);
      
      if (formData.bukti_pembayaran) {
      
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(formData.bukti_pembayaran.type)) {
          alert('Format file tidak didukung. Harus JPG, JPEG, atau PNG.');
          setIsLoading(false);
          return;
        }
        formDataToSend.append('bukti_pembayaran', formData.bukti_pembayaran);

      }
      const response = await create(kodeEvent, formDataToSend);
      
      
      
      await alert("Pendaftaran Berhasil");
      
      
      await resetForm();
      
     
      
    } catch (err) {
      
      const errorMessage = err.response?.data?.error || 'Terjadi kesalahan saat mendaftar';
      alert(`Pendaftaran gagal: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='pendaftaran-page'>
      <div className="form-container">
        <header className="form-header">
          <h3>Form Pendaftaran Peserta Inaugurasi</h3>
          <p>Isi data diri dengan lengkap untuk mendaftar sebagai peserta</p>
        </header>
        
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nama <span className="required">*</span></label>
              <input 
                type="text" 
                name="nama"
                placeholder="Nama lengkap..." 
                value={formData.nama}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>NIM <span className="required">*</span></label>
              <input 
                type="text" 
                name="NIM"
                placeholder="Nomor Induk Mahasiswa..." 
                value={formData.NIM}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Angkatan <span className="required">*</span></label>
              <input 
                type="number" 
                name="angkatan"
                placeholder="Tahun angkatan..." 
                min="2000"
                max="2099"
                value={formData.angkatan}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>Kelas <span className="required">*</span></label>
              <input 
                type="text" 
                name="kelas"
                placeholder="IF23B" 
                value={formData.kelas}
                onChange={handleInputChange}
                maxLength="10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Program Studi <span className="required">*</span></label>
            <select 
              name="program_studi"
              value={formData.program_studi}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            >
              <option value="">Pilih Program Studi</option>
              {programStudiOptions.map(prodi => (
                <option key={prodi} value={prodi}>{prodi}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Tanggal Lahir <span className="required">*</span></label>
              <input 
                type="date" 
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Nomor WhatsApp <span className="required">*</span></label>
              <input 
                type="tel" 
                name="nomor_whatapp"
                placeholder="Contoh: 08123456789" 
                value={formData.nomor_whatapp}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input 
                type="email" 
                name="email"
                placeholder="Alamat email aktif..." 
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Ukuran Kaos <span className="required">*</span></label>
            <div className="radio-group">
              {ukuranKaosOptions.map(ukuran => (
                <label key={ukuran} className="radio-label">
                  <input 
                    type="radio" 
                    name="ukuran_kaos"
                    value={ukuran}
                    checked={formData.ukuran_kaos === ukuran}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  {ukuran}
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Nomor Darurat <span className="required">*</span></label> 
              <input 
                type="tel" 
                name="nomor_darurat"
                placeholder="Nomor telepon darurat..." 
                value={formData.nomor_darurat}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>Tipe Nomor Darurat <span className="required">*</span></label>
              <select 
                name="tipe_nomor_darurat"
                value={formData.tipe_nomor_darurat}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="" disabled>
                  nomor darurat siapa?
                </option>
                {tipeDaruratOptions.map(tipe => (
                  <option key={tipe} value={tipe}>{tipe}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Riwayat Penyakit <span className="required">*</span></label>
            <textarea 
              name="riwayat_penyakit"
              placeholder="Jelaskan riwayat penyakit yang pernah diderita (jika tidak ada, tulis 'Tidak Ada')..." 
              value={formData.riwayat_penyakit}
              onChange={handleInputChange}
              rows="3"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label>Pembayaran <span className="required">*</span></label>
            
            <div className="payment-info">
              <h4>Informasi Transfer:</h4>
              <p>Bank: BCA</p>
              <p>No. Rekening: <strong>1234 5678 9012 3456</strong></p>
              <p>Atas Nama: <strong>UBP punya</strong></p>
              <p>Jumlah: <strong>Rp 150.000</strong></p>
            </div>

            <div className="upload-section">
              <label className="upload-label">
                <input
                  type="file"
                  name="bukti_pembayaran"
                  accept=".jpeg,.jpg,.png"
                  onChange={handleFileChange}
                  className="file-input"
                  required
                  disabled={isLoading}
                />
                <div className="upload-box">
                  <div className="upload-icon">📁</div>
                  <p>Upload Bukti Transfer</p>
                  <small>Format: JPG, PNG, PDF (Maks. 5MB)</small>
                  {formData.bukti_pembayaran && (
                    <div className="file-preview">
                      <strong>File terpilih:</strong> {formData.buktiPembayaranName}
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="form-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftarkan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPeserta;