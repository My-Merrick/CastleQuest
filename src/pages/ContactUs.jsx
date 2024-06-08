import { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import "./AboutUs.css";

const useIntersectionObserver = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const { current } = ref;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref]);
};

const ContactUs = () => {
  const formRef = useRef();
  const mapRef = useRef();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useIntersectionObserver(formRef);
  useIntersectionObserver(mapRef);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_xc5r2nu", "unihomes154", e.target, "39EtNuAEBjtG8FIPi")
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the message, please try again.");
        }
      );

    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="fade-in-up" ref={formRef}>
          <form
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            onSubmit={sendEmail}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="subject"
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your message"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="fade-in-up" ref={mapRef}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed/v1/place?q=University+of+Ghana&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
