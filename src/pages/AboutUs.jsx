import { useEffect, useRef } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import "./AboutUs.css";

// Import images
import aboutImage1 from "../assets/about1.png";
import aboutImage2 from "../assets/about2.png";
import aboutImage3 from "../assets/about3.png";

// Custom hook for intersection observer
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

const AboutUs = () => {
  const missionRef = useRef();
  const whoWeAreRef = useRef();
  const whatWeDoRef = useRef();
  const valuesRef = useRef();
  const joinUsRef = useRef();

  useIntersectionObserver(missionRef);
  useIntersectionObserver(whoWeAreRef);
  useIntersectionObserver(whatWeDoRef);
  useIntersectionObserver(valuesRef);
  useIntersectionObserver(joinUsRef);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        About Us
      </h1>
      <nav className="text-center mb-8">
        <ScrollLink
          to="mission"
          smooth={true}
          duration={500}
          className="text-blue-600 cursor-pointer hover:text-blue-800 mx-4"
        >
          Our Mission
        </ScrollLink>
        <ScrollLink
          to="who-we-are"
          smooth={true}
          duration={500}
          className="text-blue-600 cursor-pointer hover:text-blue-800 mx-4"
        >
          Who We Are
        </ScrollLink>
        <ScrollLink
          to="what-we-do"
          smooth={true}
          duration={500}
          className="text-blue-600 cursor-pointer hover:text-blue-800 mx-4"
        >
          What We Do
        </ScrollLink>
        <ScrollLink
          to="values"
          smooth={true}
          duration={500}
          className="text-blue-600 cursor-pointer hover:text-blue-800 mx-4"
        >
          Our Values
        </ScrollLink>
        <ScrollLink
          to="join-us"
          smooth={true}
          duration={500}
          className="text-blue-600 cursor-pointer hover:text-blue-800 mx-4"
        >
          Join Us
        </ScrollLink>
      </nav>
      <Element name="mission" className="mb-8">
        <div
          className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-8"
          ref={missionRef}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              At UniHomes Company Ltd, our mission is to revolutionize the real
              estate market by providing a seamless, transparent, and efficient
              platform for buying, selling, and renting properties. We aim to
              empower our users with the tools and information they need to make
              informed decisions.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={aboutImage3}
              alt="Our Mission"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </Element>
      <Element name="who-we-are" className="mb-8">
        <div
          className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-8"
          ref={whoWeAreRef}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2018, UniHomes has grown to become a trusted name in
              the real estate industry. Our team is composed of experienced
              professionals passionate about real estate and technology, working
              together to bring you the best service possible.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={aboutImage2}
              alt="Who We Are"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </Element>
      <Element name="what-we-do" className="mb-8">
        <div
          className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-8"
          ref={whatWeDoRef}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We offer a comprehensive platform that connects buyers, sellers,
              and renters with properties that meet their needs. Whether you are
              looking for your dream home, a commercial space, or a rental
              property, we provide a wide range of listings and the latest
              market information.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={aboutImage1}
              alt="What We Do"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </Element>
      <Element name="values" className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Our Values
        </h2>
        <div
          className="fade-in-up flex flex-col md:flex-row justify-around text-center"
          ref={valuesRef}
        >
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Integrity
            </h3>
            <p className="text-lg text-gray-600">
              We believe in honesty and transparency in all our dealings.
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Innovation
            </h3>
            <p className="text-lg text-gray-600">
              We strive to bring the latest technology and innovative solutions
              to our users.
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Customer Focus
            </h3>
            <p className="text-lg text-gray-600">
              Our customers are at the heart of everything we do.
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Excellence
            </h3>
            <p className="text-lg text-gray-600">
              We are committed to delivering the highest quality of service.
            </p>
          </div>
        </div>
      </Element>
      <Element name="join-us" className="mt-16 text-center">
        <div className="fade-in-up" ref={joinUsRef}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Join Us on Our Journey
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Whether you are a buyer, seller, renter, or real estate
            professional, we invite you to join us on our journey to transform
            the real estate industry. Together, we can make finding your next
            property a breeze.
          </p>
        </div>
      </Element>
    </div>
  );
};

export default AboutUs;
