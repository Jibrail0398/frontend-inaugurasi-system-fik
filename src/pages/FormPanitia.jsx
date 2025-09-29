import useFormPanitiaStore from '../stores/useFormPanitiaStore';
import '../style/FormPeserta.css'; 

const FormPanitia = () => {
  const { formData, setFormData, validateForm, addParticipant } = useFormPanitiaStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }
    
    const newPanitia = {
      id: Date.now(),
      ...formData,
      registered: new Date().toLocaleDateString('id-ID')
    };
    
    addParticipant(newPanitia);
    alert('Pendaftaran panitia berhasil dikirim!');
  };

  const divisiOptions = ['PDD', 'Humas', 'Konsumsi', 'Logistik/Peralatan'];
  const programStudiOptions = ['Teknik Informatika', 'Sistem Informasi'];

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
            />
          </div>
          
          <div className="form-group">
            <label>Kelas <span className="required">*</span></label>
            <input 
              type="text" 
              name="kelas"
              placeholder="IF atau SI" 
              value={formData.kelas}
              onChange={handleInputChange}
              maxLength="10"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Program Studi <span className="required">*</span></label>
          <select 
            name="programStudi"
            value={formData.programStudi}
            onChange={handleInputChange}
            required
          >
            <option value="">Pilih Program Studi</option>
            {programStudiOptions.map(prodi => (
              <option key={prodi} value={prodi}>{prodi}</option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Tempat Lahir <span className="required">*</span></label>
            <input 
              type="text" 
              name="tempatLahir"
              placeholder="Kota kelahiran..." 
              value={formData.tempatLahir}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tanggal Lahir <span className="required">*</span></label>
            <input 
              type="date" 
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
              required
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
            />
          </div>
          
          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input 
              type="email" 
              name="email"
              placeholder="email@example.com" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
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
                />
                <span>Kesediaan Ditempatkan di Divisi Manapun</span>
              </label>
            </div>
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
            />
          </div>
        </div>
        
        <button type="submit" className="form-button">Daftar sebagai Panitia</button>
      </form>
      </div>
    </div>
  );
};

export default FormPanitia;