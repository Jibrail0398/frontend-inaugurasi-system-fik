import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/LandingPage.css";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Handle navbar background on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="landing-page">
      {/* Modern Navbar */}
      <nav className={`modern-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-brand">
              <i className="fas fa-graduation-cap me-2"></i>
              <span className="brand-text">Inaugurasi FIK</span>
            </div>
            <div className="navbar-menu">
              <a href="#home" className="nav-link" onClick={scrollToTop}>
                Home
              </a>
              <a href="#features" className="nav-link">
                Fitur
              </a>
              <a href="#how-it-works" className="nav-link">
                Cara Kerja
              </a>
              <Link to="/admin/auth/login" className="btn-nav-login">
                <i className="fas fa-sign-in-alt me-2"></i>
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Glassmorphism */}
      <section className="hero-section">
        <div className="hero-particles"></div>
        <div className="hero-gradient-bg"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content-left">
                <div className="hero-badge animate-fade-in">
                  <i className="fas fa-sparkles me-2"></i>
                  Platform Modern untuk Event Management
                </div>
                <h1 className="hero-title-modern animate-fade-in-delay">
                  Kelola Event
                  <span className="text-gradient-modern"> Inaugurasi</span>
                  <br />
                  dengan Mudah
                </h1>
                <p className="hero-subtitle-modern animate-fade-in-delay-2">
                  Sistem manajemen event all-in-one yang powerful, modern, dan
                  user-friendly. Dari pendaftaran hingga sertifikat digital,
                  semua dalam satu platform.
                </p>
                <div className="hero-buttons-modern animate-fade-in-delay-3">
                  <Link
                    to="/admin/auth/login"
                    className="btn-modern btn-primary-modern"
                  >
                    <span>Mulai Sekarang</span>
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                  <a href="#features" className="btn-modern btn-outline-modern">
                    <i className="fas fa-play-circle me-2"></i>
                    <span>Lihat Fitur</span>
                  </a>
                </div>
                <div className="hero-stats animate-fade-in-delay-4">
                  <div className="stat-item-small">
                    <i className="fas fa-users"></i>
                    <div>
                      <strong>5000+</strong>
                      <span>Pengguna</span>
                    </div>
                  </div>
                  <div className="stat-item-small">
                    <i className="fas fa-star"></i>
                    <div>
                      <strong>4.9/5</strong>
                      <span>Rating</span>
                    </div>
                  </div>
                  <div className="stat-item-small">
                    <i className="fas fa-calendar"></i>
                    <div>
                      <strong>100+</strong>
                      <span>Events</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-wrapper animate-float">
                <div className="glass-card">
                  <div className="card-header-modern">
                    <div className="dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="card-title">Dashboard Preview</span>
                  </div>
                  <div className="dashboard-preview">
                    <div className="preview-metric">
                      <div className="metric-icon bg-gradient-purple">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div className="metric-info">
                        <span className="metric-label">Total Peserta</span>
                        <span className="metric-value">1,234</span>
                      </div>
                    </div>
                    <div className="preview-metric">
                      <div className="metric-icon bg-gradient-blue">
                        <i className="fas fa-money-bill-wave"></i>
                      </div>
                      <div className="metric-info">
                        <span className="metric-label">Pendapatan</span>
                        <span className="metric-value">Rp 45.6M</span>
                      </div>
                    </div>
                    <div className="preview-metric">
                      <div className="metric-icon bg-gradient-green">
                        <i className="fas fa-certificate"></i>
                      </div>
                      <div className="metric-info">
                        <span className="metric-label">Sertifikat</span>
                        <span className="metric-value">856</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-bottom">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section id="features" className="features-section-modern">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge">
              <i className="fas fa-star me-2"></i>
              Fitur Lengkap
            </div>
            <h2 className="section-title-modern">
              Semua yang Anda Butuhkan
              <br />
              <span className="text-gradient-modern">Dalam Satu Platform</span>
            </h2>
            <p className="section-subtitle-modern">
              Fitur-fitur powerful yang dirancang untuk memudahkan pengelolaan
              event Anda
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-glow feature-glow-1"></div>
                <div className="feature-icon-modern">
                  <div className="icon-bg bg-gradient-purple">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <h3 className="feature-title-modern">Pendaftaran Online</h3>
                <p className="feature-description-modern">
                  Form pendaftaran digital yang responsif dengan validasi
                  real-time dan upload dokumen otomatis
                </p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-glow feature-glow-2"></div>
                <div className="feature-icon-modern">
                  <div className="icon-bg bg-gradient-green">
                    <i className="fas fa-qrcode"></i>
                  </div>
                </div>
                <h3 className="feature-title-modern">Presensi QR Code</h3>
                <p className="feature-description-modern">
                  Scan QR code untuk absensi instan dengan tracking waktu dan
                  lokasi secara real-time
                </p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-glow feature-glow-3"></div>
                <div className="feature-icon-modern">
                  <div className="icon-bg bg-gradient-blue">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
                <h3 className="feature-title-modern">Dashboard Analytics</h3>
                <p className="feature-description-modern">
                  Visualisasi data interaktif dengan grafik dinamis dan laporan
                  komprehensif
                </p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-glow feature-glow-4"></div>
                <div className="feature-icon-modern">
                  <div className="icon-bg bg-gradient-orange">
                    <i className="fas fa-wallet"></i>
                  </div>
                </div>
                <h3 className="feature-title-modern">Manajemen Keuangan</h3>
                <p className="feature-description-modern">
                  Tracking pemasukan dan pengeluaran dengan bukti digital dan
                  rekonsiliasi otomatis
                </p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-glow feature-glow-5"></div>
                <div className="feature-icon-modern">
                  <div className="icon-bg bg-gradient-red">
                    <i className="fas fa-certificate"></i>
                  </div>
                </div>
                <h3 className="feature-title-modern">E-Sertifikat</h3>
                <p className="feature-description-modern">
                  Generate sertifikat digital otomatis dengan template custom
                  dan distribusi via email
                </p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-glow feature-glow-6"></div>
                <div className="feature-icon-modern">
                  <div className="icon-bg bg-gradient-pink">
                    <i className="fas fa-camera"></i>
                  </div>
                </div>
                <h3 className="feature-title-modern">Dokumentasi</h3>
                <p className="feature-description-modern">
                  Galeri foto event dengan kompresi otomatis dan sharing ke
                  sosial media
                </p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Glass */}
      <section id="stats" className="stats-section-modern">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number-modern" data-count="100">
                  100+
                </h3>
                <p className="stat-label-modern">Event Terkelola</p>
              </div>
              <div className="stat-decoration"></div>
            </div>

            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <i className="fas fa-user-check"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number-modern" data-count="5000">
                  5000+
                </h3>
                <p className="stat-label-modern">Peserta Terdaftar</p>
              </div>
              <div className="stat-decoration"></div>
            </div>

            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <i className="fas fa-award"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number-modern" data-count="3000">
                  3000+
                </h3>
                <p className="stat-label-modern">Sertifikat Diterbitkan</p>
              </div>
              <div className="stat-decoration"></div>
            </div>

            <div className="stat-card-modern">
              <div className="stat-icon-modern">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number-modern" data-count="98">
                  98%
                </h3>
                <p className="stat-label-modern">Kepuasan Pengguna</p>
              </div>
              <div className="stat-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern Timeline */}
      <section id="how-it-works" className="how-it-works-modern">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge">
              <i className="fas fa-route me-2"></i>
              Mudah & Cepat
            </div>
            <h2 className="section-title-modern">
              Cara Kerja yang
              <span className="text-gradient-modern"> Simpel</span>
            </h2>
            <p className="section-subtitle-modern">
              Empat langkah mudah dari pendaftaran hingga sertifikat
            </p>
          </div>

          <div className="timeline-modern">
            <div className="timeline-item-modern">
              <div className="timeline-content-modern">
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon bg-gradient-purple">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <span className="timeline-number">01</span>
                </div>
                <div className="timeline-info">
                  <h3>Daftar Online</h3>
                  <p>
                    Peserta mendaftar melalui link khusus dengan mengisi form
                    digital dan upload dokumen
                  </p>
                  <div className="timeline-tags">
                    <span className="tag">Cepat</span>
                    <span className="tag">Mudah</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item-modern">
              <div className="timeline-content-modern">
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon bg-gradient-green">
                    <i className="fas fa-credit-card"></i>
                  </div>
                  <span className="timeline-number">02</span>
                </div>
                <div className="timeline-info">
                  <h3>Verifikasi Pembayaran</h3>
                  <p>
                    Upload bukti pembayaran dan tunggu verifikasi otomatis dari
                    sistem
                  </p>
                  <div className="timeline-tags">
                    <span className="tag">Aman</span>
                    <span className="tag">Otomatis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item-modern">
              <div className="timeline-content-modern">
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon bg-gradient-blue">
                    <i className="fas fa-qrcode"></i>
                  </div>
                  <span className="timeline-number">03</span>
                </div>
                <div className="timeline-info">
                  <h3>Check-in Event</h3>
                  <p>
                    Scan QR code saat event untuk presensi dan akses ke area
                    acara
                  </p>
                  <div className="timeline-tags">
                    <span className="tag">Real-time</span>
                    <span className="tag">Contactless</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item-modern">
              <div className="timeline-content-modern">
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon bg-gradient-orange">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <span className="timeline-number">04</span>
                </div>
                <div className="timeline-info">
                  <h3>Terima Sertifikat</h3>
                  <p>
                    Download e-sertifikat digital setelah event selesai langsung
                    dari dashboard
                  </p>
                  <div className="timeline-tags">
                    <span className="tag">Digital</span>
                    <span className="tag">Instant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="cta-section-modern">
        <div className="cta-gradient-bg"></div>
        <div className="container">
          <div className="cta-content-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="cta-text">
                  <h2 className="cta-title">
                    Siap Membawa Event Anda
                    <br />
                    ke Level Berikutnya?
                  </h2>
                  <p className="cta-description">
                    Bergabunglah dengan ratusan event organizer yang telah
                    mempercayai platform kami. Mulai kelola event dengan cara
                    yang lebih modern dan efisien.
                  </p>
                  <div className="cta-features">
                    <div className="cta-feature-item">
                      <i className="fas fa-check-circle"></i>
                      <span>Setup 5 menit</span>
                    </div>
                    <div className="cta-feature-item">
                      <i className="fas fa-check-circle"></i>
                      <span>Gratis trial 30 hari</span>
                    </div>
                    <div className="cta-feature-item">
                      <i className="fas fa-check-circle"></i>
                      <span>Support 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="cta-button-wrapper">
                  <Link to="/admin/auth/login" className="btn-cta-primary">
                    <span>Mulai Sekarang</span>
                    <i className="fas fa-rocket ms-2"></i>
                  </Link>
                  <p className="cta-note">
                    <i className="fas fa-shield-alt me-2"></i>
                    Tidak perlu kartu kredit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern */}
      <footer className="footer-modern">
        <div className="container">
          <div className="footer-content">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="footer-brand">
                  <div className="brand-logo">
                    <i className="fas fa-graduation-cap"></i>
                    <span>Inaugurasi FIK</span>
                  </div>
                  <p className="footer-description">
                    Platform modern untuk manajemen event inaugurasi dan
                    pelantikan. Mudah, cepat, dan terpercaya.
                  </p>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                <div className="footer-links">
                  <h4 className="footer-title">Platform</h4>
                  <ul>
                    <li>
                      <a href="#features">Fitur</a>
                    </li>
                    <li>
                      <a href="#how-it-works">Cara Kerja</a>
                    </li>
                    <li>
                      <a href="#stats">Statistik</a>
                    </li>
                    <li>
                      <Link to="/admin/auth/login">Login</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                <div className="footer-links">
                  <h4 className="footer-title">Bantuan</h4>
                  <ul>
                    <li>
                      <a href="#">Dokumentasi</a>
                    </li>
                    <li>
                      <a href="#">Tutorial</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">Support</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="footer-newsletter">
                  <h4 className="footer-title">Stay Updated</h4>
                  <p>Dapatkan update terbaru tentang fitur dan event.</p>
                  <div className="newsletter-form">
                    <input type="email" placeholder="Email Anda" />
                    <button type="button">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p className="copyright">
                  &copy; {new Date().getFullYear()}{" "}
                  <strong>Inaugurasi FIK</strong>. All rights reserved.
                </p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-bottom-links">
                  <a href="#">Privacy Policy</a>
                  <span className="separator">•</span>
                  <a href="#">Terms of Service</a>
                  <span className="separator">•</span>
                  <a href="#">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
