import  React from 'react';
import { useNavigate } from "react-router-dom";
import "./styling/footer.css"
const Footer = () => {
  const navigate = useNavigate();

  return (

<footer class="footer">
  <div class="footer-container">

    <div class="footer-brand">
      <h2>Flownotes</h2>
      <p>Your simple and secure place for notes ✨</p>


      <div class="social-icons">
        <a href="https://github.com/" target="_blank" class="social github">G</a>
        <a href="https://instagram.com/" target="_blank" class="social insta">I</a>
        <a href="https://linkedin.com/" target="_blank" class="social linkedin">L</a>
      </div>
    </div>

    <div class="footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Notes</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div class="footer-contact">
      <h3>Contact</h3>
      <p>Email: support@flownotes.com</p>
      <p>Made with ❤️ by Palak</p>
    </div>

  </div>

  <div class="footer-bottom">
    © 2025 Flownotes. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;