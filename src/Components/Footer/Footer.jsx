const Footer = () => {
  return (
    <footer class="footer-section py-5 text-light">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-4 col-md-6">
            <h2 class="footer-logo">PharmaAssist</h2>
            <p class="footer-text mt-3">
              Helping users discover medications, check nearby availability, and
              find safe alternatives instantly.
            </p>

            <div class="social-icons mt-4">
              <a href="#">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div class="col-lg-2 col-md-6">
            <h5 class="footer-title">Quick Links</h5>

            <ul class="list-unstyled footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Drug Search</a>
              </li>
              <li>
                <a href="#">Alternatives</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-6">
            <h5 class="footer-title">Resources</h5>

            <ul class="list-unstyled footer-links">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6">
            <h5 class="footer-title">Contact Us</h5>

            <div class="contact-item">
              <i class="fa-solid fa-location-dot"></i>
              <span>Cairo, Egypt</span>
            </div>

            <div class="contact-item">
              <i class="fa-solid fa-envelope"></i>
              <span>support@pharmaassist.com</span>
            </div>

            <div class="contact-item">
              <i class="fa-solid fa-phone"></i>
              <span>+201020433005</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom mt-5 pt-4">
          <p class="mb-0">
            © {new Date().getFullYear()} PharmaAssist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
