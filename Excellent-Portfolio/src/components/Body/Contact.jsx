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
      const url = "https://myportfolio-06wt.onrender.com/api/contact";
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
      className="w-4/5 mx-auto" 
      id="contact"
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(10px)',
        transition: 'all 0.9s'
      }}
    >
      <h2 className="text-3xl text-center my-3">Get In Touch</h2>
      <p className="text-center text-lg mb-4">
        Please contact me directly at <a href="mailto:ayexcellent123@gmail.com" className="underline -underline-offset-['0.5']">
          ayexcellent123@gmail.com
        </a>
        or through this form.
      </p>

      <form name="contact" onSubmit={handleSubmit} className=" py-4 rounded-3xl flex mx-auto  flex-col  shadow-[0_10px_10px_rgba(35,35,35,0.9)] lg:w-1/2 sm:mb-30 items-center px-2" method="POST">
        <input
          className="border py-1 px-2 my-4  w-9/10 rounded-lg"
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
        className="border w-9/10 py-1 my-4 px-2  rounded-lg"
          type="email"
          id="email"
          name="email"
          placeholder="hello@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          className="border w-9/10 py-1 my-4 px-2  h-30 rounded-lg"
          name="message"
          id="message"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <br /><br />

        <button className="bg-slate-900 text-white rounded-sm w-4/5 py-2 border shadow-sm cursor-pointer  transition-all ease-in-out" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>

        {success && <div className="" style={{ color: "green" }}>Message sent successfully!</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
