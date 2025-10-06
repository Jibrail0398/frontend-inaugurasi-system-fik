import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import useFormPresensiStore from '../stores/useFormPresensiStore';
import '../style/FormPresensi.css';

const FormPresensi = () => {
  const { kodeEvent } = useParams();
  
  const [attendanceType, setAttendanceType] = useState('datang'); // ✅ Diubah ke 'datang'
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scannerRef = useRef(null);
  const { checkIn, checkOut, getTodayStats } = useFormPresensiStore();

  const FIXED_EVENT_CODE = "INAU2025";
  const FIXED_EVENT_NAME = "Inaugurasi Mahasiswa Fakultas Ilmu Komputer 2025";

  const { totalCheckedIn, totalCheckedOut } = getTodayStats();

  const handleScanResult = useCallback((decodedText) => {
    setScanResult(decodedText);
    setIsScanning(false);
    setScanStatus('scanning');
    
    // Process the scanned data
    processAttendance(decodedText);
  }, [attendanceType]);

  const processAttendance = async (nim) => {
    if (!nim.trim()) {
      alert('QR Code tidak valid!');
      setScanStatus('error');
      return;
    }

    setIsLoading(true);

    try {
      const finalEventCode = kodeEvent || FIXED_EVENT_CODE;
      
      const attendanceData = {
        nim: nim.trim(),
        eventCode: finalEventCode,
        eventName: FIXED_EVENT_NAME,
        timestamp: new Date().toISOString(),
        type: attendanceType, 
        method: 'qr'
      };

      let success = false;
      let message = '';

      const response = await fetch('https://apiinaugurasi.newhimatif.com/api/v1/presensi/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        const result = await response.json();
        success = true;
        message = `Presensi ${attendanceType} berhasil untuk NIM: ${nim}`;
        
        // Simpan ke local state
        if (attendanceType === 'datang') {
          checkIn({
            ...attendanceData,
            timestamp: new Date().toLocaleString('id-ID')
          });
        } else {
          checkOut({
            ...attendanceData,
            timestamp: new Date().toLocaleString('id-ID')
          });
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Presensi gagal');
      }

      if (success) {
        alert(message);
        setScanStatus('success');
        
        // Reset scan result setelah beberapa detik
        setTimeout(() => {
          setScanResult(null);
          setScanStatus('');
        }, 3000);
      }

    } catch (err) {
      console.error('Error processing attendance:', err);
      
      // Fallback ke local storage jika API error
      const finalEventCode = kodeEvent || FIXED_EVENT_CODE;
      const attendanceData = {
        nim: nim.trim(),
        eventCode: finalEventCode,
        eventName: FIXED_EVENT_NAME,
        timestamp: new Date().toLocaleString('id-ID'),
        type: attendanceType,
        method: 'qr'
      };

      let success = false;
      let message = '';

      if (attendanceType === 'datang') {
        success = checkIn(attendanceData);
        message = `Presensi datang berhasil untuk NIM: ${nim}`;
      } else {
        success = checkOut(attendanceData);
        message = `Presensi pulang berhasil untuk NIM: ${nim}`;
      }

      if (success) {
        alert(message + ' (Data tersimpan lokal)');
        setScanStatus('success');
        setTimeout(() => {
          setScanResult(null);
          setScanStatus('');
        }, 3000);
      } else {
        alert('Presensi gagal! Mungkin NIM sudah melakukan presensi.');
        setScanStatus('error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize QR Scanner
  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [] 
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          handleScanResult(decodedText);
        },
        (_error) => {
          // Optional error handling
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [isScanning, handleScanResult]);

  const startScanning = () => {
    setIsScanning(true);
    setScanResult(null);
    setScanStatus('');
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
  };

  return (
    <div className='pendaftaran-page'>
      <div className="attendance-container">
        <div className="attendance-header">
          <h1>📱 Presensi QR Code</h1>
          <p>Scan QR code untuk presensi {attendanceType === 'datang' ? 'datang' : 'pulang'}</p>
        </div>

        {/* Toggle Button - Diperbaiki */}
        <div className="attendance-toggle">
          <button
            className={attendanceType === 'datang' ? 'active' : ''} // ✅ Diubah ke 'datang'
            onClick={() => {
              setAttendanceType('datang');
              stopScanning();
            }}
            disabled={isLoading}
          >
            📍 Presensi Datang
          </button>
          <button
            className={attendanceType === 'pulang' ? 'active' : ''} // ✅ Diubah ke 'pulang'
            onClick={() => {
              setAttendanceType('pulang');
              stopScanning();
            }}
            disabled={isLoading}
          >
            🏠 Presensi Pulang
          </button>
        </div>

        {/* Statistics */}
        <div className="attendance-stats">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <h3>Hadir Hari Ini</h3>
            <p className="stat-number">{totalCheckedIn}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚪</div>
            <h3>Pulang Hari Ini</h3>
            <p className="stat-number">{totalCheckedOut}</p>
          </div>
        </div>

        {/* QR Scanner Section */}
        <div className="scanner-section">
          <h3>🔍 Scan QR Code</h3>
          
          {!isScanning ? (
            <div className="scanner-placeholder">
              <div className="scanner-icon">📷</div>
              <p>Klik tombol di bawah untuk mulai scan</p>
              <button 
                onClick={startScanning} 
                className="scan-button"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Memproses...' : '🎥 Mulai Scan QR Code'}
              </button>
            </div>
          ) : (
            <div className="scanner-active">
              <div id="qr-reader" className="qr-scanner"></div>
              <button 
                onClick={stopScanning} 
                className="stop-scan-button"
                disabled={isLoading}
              >
                ⏹️ Stop Scan
              </button>
            </div>
          )}

          {/* Status Feedback */}
          {scanStatus === 'scanning' && (
            <div className="scan-status scanning">
              <p>⏳ Memproses QR code...</p>
            </div>
          )}
          
          {scanStatus === 'success' && (
            <div className="scan-status success">
              <p>✅ Presensi berhasil!</p>
            </div>
          )}
          
          {scanStatus === 'error' && (
            <div className="scan-status error">
              <p>❌ Presensi gagal</p>
            </div>
          )}

          {scanResult && (
            <div className="scan-result">
              <p>📋 Terdeteksi: <strong>{scanResult}</strong></p>
            </div>
          )}

          {isLoading && (
            <div className="loading-overlay">
              <p>🔄 Mengirim data ke server...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPresensi;