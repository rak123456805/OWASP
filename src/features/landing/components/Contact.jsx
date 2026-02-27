import React, { useState } from "react";
import "../../../App.css";
import Toast from "../../../components/Toast";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle, sending, sent
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      setShowToast(true);

      // Optionally reset to idle after some time
      setTimeout(() => {
        setStatus("idle");
        setShowToast(false);
      }, 3000);
    }, 2000); // 2-second timeout
  };

  return (
    <div className="contact-container">
      {showToast && (
        <Toast
          message="Your Feedback has been sent successfully!"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="cform">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Fill out the form below.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button
            type="submit"
            disabled={status !== "idle"}
            className={status === "sent" ? "sent-button" : ""}
          >
            {status === "idle" && "Send Message"}
            {status === "sending" && "Sending..."}
            {status === "sent" && "Sent ✓"}
          </button>
        </form>
      </div>


      <div className="cimage">
        <img
          src="./Contact_Us.png"
          alt="Contact"
        />
      </div>
    </div>
  );
}
