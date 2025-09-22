import { useState, useRef, useEffect, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import useFormPresensiStore from '../stores/useFormPresensiStore';
import '../style/FormPresensi.css';

const FormPresensi = () => {
  const [attendanceType, setAttendanceType] = useState('checkin');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState(''); // Tambahan: status scan
  const scannerRef = useRef(null);
  const { checkIn, checkOut, getTodayStats } = useFormPresensiStore();

  const { totalCheckedIn, totalCheckedOut } = getTodayStats();

  const handleScanResult = useCallback((decodedText) => {
    setScanResult(decodedText);
    setIsScanning(false);
    setScanStatus('scanning'); // Set status sedang memproses
    
    // Process the scanned data
    processAttendance(decodedText);
  }, [attendanceType]);

  const processAttendance = (nim) => {
    if (!nim.trim()) {
      alert('QR Code tidak valid!');
      setScanStatus('error');
      return;
    }

    const attendanceData = {
      nim: nim.trim(),
      timestamp: new Date().toLocaleString('id-ID'),
      type: attendanceType,
      method: 'qr'
    };

    let success = false;
    let message = '';

    if (attendanceType === 'checkin') {
      success = checkIn(attendanceData);
      message = `Presensi datang berhasil untuk NIM: ${nim}`;
    } else {
      success = checkOut(attendanceData);
      message = `Presensi pulang berhasil untuk NIM: ${nim}`;
    }

    if (success) {
      alert(message); // ✅ ALERT BERHASIL - INI YANG ANDA TANYAKAN
      setScanStatus('success');
      
      // Reset scan result setelah beberapa detik
      setTimeout(() => {
        setScanResult(null);
        setScanStatus('');
      }, 3000);
    } else {
      alert('Presensi gagal! Mungkin NIM sudah melakukan presensi.');
      setScanStatus('error');
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
          // Optional: bisa tambahkan handling error visual
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
    <div className="attendance-container">
      <div className="attendance-header">
        <h1>📱 Presensi QR Code</h1>
        <p>Scan QR code untuk presensi {attendanceType === 'checkin' ? 'datang' : 'pulang'}</p>
      </div>

      {/* Toggle Button */}
      <div className="attendance-toggle">
        <button
          className={attendanceType === 'checkin' ? 'active' : ''}
          onClick={() => {
            setAttendanceType('checkin');
            stopScanning();
          }}
        >
          📍 Presensi Datang
        </button>
        <button
          className={attendanceType === 'checkout' ? 'active' : ''}
          onClick={() => {
            setAttendanceType('checkout');
            stopScanning();
          }}
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
            <button onClick={startScanning} className="scan-button">
              🎥 Mulai Scan QR Code
            </button>
          </div>
        ) : (
          <div className="scanner-active">
            <div id="qr-reader" className="qr-scanner"></div>
            <button onClick={stopScanning} className="stop-scan-button">
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
      </div>
    </div>
  );
};

export default FormPresensi;