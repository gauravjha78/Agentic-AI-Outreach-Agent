import "@/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <div className="logo-icon">C</div>
            <span className="logo-name">XTRACT</span>
          </div>
          <p className="footer-tagline">
            AI-powered enrollment and outreach automation. Helping 50+ businesses
            scale smarter, faster.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-pill">𝕏 Twitter</a>
            <a href="#" className="social-pill">in LinkedIn</a>
            <a href="#" className="social-pill">▶ YouTube</a>
          </div>
        </div>

        {/* Product */}
        <div>
          <p className="footer-col-title">Product</p>
          <ul className="footer-links">
            <li><a href="/service">Services</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/enrollment">Enroll Now</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="footer-col-title">Company</p>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="https://cal.com" target="_blank" rel="noreferrer">Book a Call</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="footer-col-title">Legal</p>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">GDPR</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} <strong>XTRACT</strong>. All rights reserved.
        </p>
        <div className="footer-badge">
          <span className="dot" />
          All systems operational
        </div>
      </div>
    </footer>
  );
}
