import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Copyright */}
      <p className="footer-text">
        &copy; 2025 <strong>VedAahar</strong>. All Rights Reserved.
      </p>

      {/* Feedback */}
      <div className="feedback-btn">
        <a
          href="https://forms.gle/jVPgC48uCuKE7nn87"
          target="_blank"
          rel="noopener noreferrer"
          className="feedback-link"
        >
          Give Feedback
        </a>
      </div>

      {/* Social Icons */}
      <div className="social-icons">
        <SocialIcon icon={<FaFacebookF />} />
        <SocialIcon icon={<FaInstagram />} />
        <SocialIcon icon={<FaTwitter />} />
        <SocialIcon icon={<FaLinkedinIn />} />
      </div>

      <p className="footer-note">
        Follow us for Ayurveda & healthy meals
      </p>

      {/* Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#1B5E20"
            d="M0,256L80,240C160,224,320,192,480,176C640,160,800,160,960,170C1120,181,1280,203,1360,213L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(135deg, #2E7D32, #1B5E20);
          color: #E8F5E9;
          padding: 30px 15px 55px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .footer-text {
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .feedback-btn {
          margin-bottom: 15px;
        }

        .feedback-link {
          padding: 6px 16px;
          background: #A5D6A7;
          color: #1B5E20;
          font-weight: 600;
          border-radius: 20px;
          font-size: 0.85rem;
          text-decoration: none;
          transition: 0.3s;
        }

        .feedback-link:hover {
          background: #81C784;
          transform: translateY(-2px);
        }

        .social-icons {
          margin-bottom: 10px;
        }

        .social-icon {
          margin: 0 6px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          color: #E8F5E9;
          transition: 0.3s;
        }

        .social-icon:hover {
          background: #A5D6A7;
          color: #1B5E20;
          transform: scale(1.1);
        }

        .footer-note {
          font-size: 0.75rem;
          color: #C8E6C9;
        }

        .footer-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 45px;
        }

        .footer-wave svg {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 576px) {
          .social-icon {
            width: 32px;
            height: 32px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);

export default Footer;
