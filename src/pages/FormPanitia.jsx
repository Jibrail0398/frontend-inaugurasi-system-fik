import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFormPanitiaStore from '../stores/useFormPanitiaStore';
import { registerPanitia } from '../services/panitiaService';
import '../style/FormPeserta.css'; 

const FormPanitia = () => {
  const { kodeEvent } = useParams();
  const tipeDaruratOptions = ['Ayah', 'Ibu', 'Saudara', 'Lainnya'];
  const { formData, setFormData, validateForm,resetForm } = useFormPanitiaStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const submitData = {
        'nama':formData.name,
        'NIM' : formData.nim,
        'email':formData.email,
        'nomor_whatapp':formData.whatsapp,
        'angkatan':formData.angkatan,
        'kelas':formData.kelas,
        'tanggal_lahir':formData.tanggalLahir,
        'ukuran_kaos':formData.ukuranKaos,
        'divisi':formData.divisi,
        'nomor_darurat':formData.nomor_darurat,
        'tipe_nomor_darurat':formData.tipe_nomor_darurat,
        'riwayat_penyakit':formData.riwayatPenyakit,
        'komitmen1':formData.komitmenAcara? "ya":"tidak",
        'komitmen2':formData.komitmenDivisi? "ya":"tidak",
      }
      const response = await registerPanitia(submitData,kodeEvent);
      alert("Pendaftaran Berhasil");
      resetForm();
    
      
      
    } catch (err) {
      alert(err.response?.data?.error || 'Terjadi kesalahan saat mendaftar');
      
      
    } finally {
      setIsLoading(false);
    }
  };

  const ukuranKaosOptions = ['S', 'M', 'L', 'XL', 'XXL'];
  const divisiOptions = ['PDD', 'Humas', 'Konsumsi', 'Logistik/Peralatan'];
  

  return (
    <div className='pendaftaran-page'>
      <div className="form-container">
        <header className="form-header">
          <h3>Form Pendaftaran Panitia Inaugurasi</h3>
          <p>Isi data diri dengan lengkap untuk mendaftar sebagai panitia</p>
        </header>
        
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nama Lengkap <span className="required">*</span></label>
              <input 
                type="text" 
                name="name"
                placeholder="Nama lengkap..." 
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>NIM <span className="required">*</span></label>
              <input 
                type="text" 
                name="nim"
                placeholder="Nomor Induk Mahasiswa..." 
                value={formData.nim}
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
          
          <div className="form-row">
            <div className="form-group">
              <label>Tanggal Lahir <span className="required">*</span></label>
              <input 
                type="date" 
                name="tanggalLahir"
                value={formData.tanggalLahir}
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
                name="whatsapp"
                placeholder="08123456789" 
                value={formData.whatsapp}
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
                placeholder="Email aktif" 
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
                    name="ukuranKaos"
                    value={ukuran}
                    checked={formData.ukuranKaos === ukuran}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  {ukuran}
                </label>
              ))}
            </div>
          </div>
          
          {/* Divisi dan Komitmen */}
          <div className="form-section">
            <h4>Divisi dan Komitmen</h4>
            
            <div className="form-group">
              <label>Divisi <span className="required">*</span></label>
              <div className="radio-group">
                {divisiOptions.map(divisi => (
                  <label key={divisi} className="radio-label">
                    <input 
                      type="radio" 
                      name="divisi"
                      value={divisi}
                      checked={formData.divisi === divisi}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                    {divisi}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Komitmen <span className="required">*</span></label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="komitmenAcara"
                    checked={formData.komitmenAcara}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  <span>Bersedia Mengikuti dan Bertanggung Jawab Selama Acara Berlangsung</span>
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="komitmenDivisi"
                    checked={formData.komitmenDivisi}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  <span>Kesediaan Ditempatkan di Divisi Manapun</span>
                </label>
              </div>
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
          {/* Informasi Kesehatan */}
          <div className="form-section">
            <h4>Informasi Kesehatan</h4>
            
            <div className="form-group">
              <label>Riwayat Penyakit <span className="required">*</span></label>
              <textarea 
                name="riwayatPenyakit"
                placeholder="Jelaskan riwayat penyakit yang pernah diderita (jika tidak ada, tulis 'Tidak Ada')..." 
                value={formData.riwayatPenyakit}
                onChange={handleInputChange}
                rows="3"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="form-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftar sebagai Panitia'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPanitia;