import { useState } from "react";
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const formData = { name, email, message };
    
    try {
      const url = "https://formspree.io/f/xjkazzlr";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      if (response.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setSuccess(true);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError('Failed to send message. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="contact" 
      id="contact"
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(10px)',
        transition: 'all 0.9s'
      }}
    >
      <h2 className="contact-title">Get In Touch</h2>
      <p>
        Please contact me directly at{" "}
        <a href="mailto:ayexcellent123@gmail.com" className="contact-link">
          ayexcellent123@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form name="contact" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="hello@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          name="message"
          id="message"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>

        {success && <div style={{ color: "green" }}>Message sent successfully!</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
