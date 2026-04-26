import React from "react";
import { FaEnvelope, FaPhoneAlt, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="contact-wrapper">
      {/* HERO */}
      <section className="contact-hero">
        <h1>
          We’d Love to <span>Hear From</span> You
        </h1>
        <p>
          Have questions, feedback, or suggestions? Reach out anytime — your
          thoughts help us grow and serve you better. 🌿
        </p>
      </section>

      {/* CONTENT */}
      <section className="contact-content">
        {/* LEFT */}
        <div className="contact-left">
          <div className="info-card">
            <div className="icon-box">
              <FaEnvelope />
            </div>
            <div>
              <h4>Email Us</h4>
              {/* <p>vedaahar25@gmail.com</p> */}
              <p>
                <a href="mailto:vedaahar25@gmail.com" className="text-dark text-decoration-none">vedaahar25@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaCommentDots />
            </div>
            <div>
              <h4>Share with us</h4>
              <p>Want to share your healthy recipes</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaCommentDots />
            </div>
            <div >
              <a href="https://forms.gle/jVPgC48uCuKE7nn87" target="_blank" className="text-dark text-decoration-none"
              >
                <h4>Feedback</h4>
              </a>
              <p>Share your thoughts anytime</p>
            </div>
          </div>

          {/* FORM */}
          {/* <div className="form-card">
            <h3>Quick Message</h3>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows="4" />
            <button>✈️ Send Message</button>
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <div className="image-card">
            <div className="overlay-card">
              <h3>Join Our Community</h3>
              <p>
                Follow us on social media for daily Ayurvedic tips and recipes.
              </p>
              <div className="socials">
                <span>F</span>
                <span>I</span>
                <span>T</span>
                <span>L</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
        }

        .contact-wrapper {
          background: #fafaf6;
        }

        /* HERO */
        .contact-hero {
          padding: 100px 80px 60px;
        }

        .contact-hero h1 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 800;
          color: #173f2f;
        }

        .contact-hero span {
          color: #e7a33e;
        }

        .contact-hero p {
          max-width: 520px;
          margin-top: 16px;
          color: #5f7c6c;
          line-height: 1.7;
        }

        /* LAYOUT */
        .contact-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 50px;
          padding: 0 80px 100px;
        }

        /* LEFT */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .info-card {
          display: flex;
          gap: 18px;
          align-items: center;
          background: #fff;
          padding: 22px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
        }

        .icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #eef4ef;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #173f2f;
          font-size: 1.1rem;
        }

        .form-card {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .form-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.14);
        }

        .form-card h3 {
          margin-bottom: 20px;
          color: #173f2f;
        }

        .form-card input,
        .form-card textarea {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid #dfe9e2;
          margin-bottom: 16px;
          background: #eef4ef;
        }

        .form-card button {
          width: 100%;
          padding: 14px;
          border-radius: 30px;
          border: none;
          background: #173f2f;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-card button:hover {
          background: #1f523c;
          transform: scale(1.04);
        }

        /* RIGHT IMAGE */
        .image-card {
          height: 420px;
          border-radius: 28px;
          background-image: url("https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2");
          background-size: cover;
          background-position: center;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          display: flex;
          align-items: flex-end;
          transition: all 0.6s ease;
          animation: gentleFloat 6s ease-in-out infinite;
        }

        .image-card:hover {
          transform: scale(1.04);
          box-shadow: 0 30px 65px rgba(0,0,0,0.35);
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .overlay-card {
          background: #f2efe9;
          width: calc(100% - 60px);
          margin: 0 auto 30px;
          padding: 28px;
          border-radius: 22px;
          transition: all 0.4s ease;
        }

        .image-card:hover .overlay-card {
          transform: translateY(-10px);
          box-shadow: 0 18px 45px rgba(0,0,0,0.2);
        }

        .overlay-card h3 {
          color: #173f2f;
          margin-bottom: 8px;
        }

        .overlay-card p {
          color: #5f7c6c;
          margin-bottom: 20px;
        }

        .socials {
          display: flex;
          gap: 14px;
        }

        .socials span {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #d9ded8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #173f2f;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .socials span:hover {
          background: #e7a33e;
          transform: scale(1.15);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .contact-content {
            grid-template-columns: 1fr;
            padding: 0 20px 80px;
          }

          .contact-hero {
            padding: 80px 20px 40px;
          }

          .image-card {
            height: 320px;
          }
        }
      `}</style>
    </main>
  );
};

export default Contact;
