// Footer.jsx
export default function Footer() {
    return (
      <footer style={{ backgroundColor: '#222', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
        <div>
          <h3>Contact Us</h3>
          <p>📞 +1 234 567 8900</p>
        </div>
        <div style={{ marginTop: '10px' }}>
          <a href="https://facebook.com" target="_blank" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>
            LinkedIn
          </a>
        </div>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>&copy; 2025 Transform. All rights reserved.</p>
      </footer>
    );
  }
  