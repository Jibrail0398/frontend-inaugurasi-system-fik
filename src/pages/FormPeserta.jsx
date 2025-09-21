import useFormPesertaStore from '../stores/useFormPesertaStore';
import Header from '../components/HeaderForm';
import '../style/FormPeserta.css';

const FormPeserta = () => {
  const {
    formData,
    setFormData,
    setFileUpload,
    addParticipant,
    validateForm,
  } = useFormPesertaStore();

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
      // Validasi ukuran file (maksimal 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB.');
        e.target.value = ''; // Reset input file
        return;
      }
      setFileUpload(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Harap isi semua field yang wajib diisi!');
      return;
    }

    const newParticipant = {
      id: Date.now(),
      ...formData,
      registered: new Date().toLocaleDateString('id-ID')
    };

    addParticipant(newParticipant);
    alert('Pendaftaran berhasil! Data Anda telah tersimpan.');
  };

  return (
    <div className="app">
      <Header />
      
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nama <span className="required">*</span></label>
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
              placeholder="Contoh: 08123456789" 
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
              placeholder="Alamat email aktif..." 
              value={formData.email}
              onChange={handleInputChange}
              required
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
                />
                {ukuran}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Nomor Darurat</label>
            <input 
              type="tel" 
              name="nomorDarurat"
              placeholder="Nomor telepon darurat..." 
              value={formData.nomorDarurat}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Tipe Nomor Darurat</label>
            <select 
              name="tipeNomorDarurat"
              value={formData.tipeNomorDarurat}
              onChange={handleInputChange}
            >
              {tipeDaruratOptions.map(tipe => (
                <option key={tipe} value={tipe}>{tipe}</option>
              ))}
            </select>
          </div>
        </div>
        
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
                name="buktiPembayaran"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
                required
              />
              <div className="upload-box">
                <div className="upload-icon">📁</div>
                <p>Upload Bukti Transfer</p>
                <small>Format: JPG, PNG, PDF (Maks. 5MB)</small>
                {formData.buktiPembayaranName && (
                  <div className="file-preview">
                    <strong>File terpilih:</strong> {formData.buktiPembayaranName}
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
        
        <button type="submit" className="submit-button">Daftarkan</button>
      </form>
    </div>
  );
};

export default FormPeserta;