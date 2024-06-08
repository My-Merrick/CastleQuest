import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PrivacyPolicy = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto px-4">
      <motion.h1
        className="text-3xl font-bold text-center my-8"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        Privacy Policy
      </motion.h1>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Welcome to our Privacy Policy page. Your privacy is critically
          important to us. We are committed to protecting your personal
          information and your right to privacy.
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We collect various types of information in connection with the
          services we provide, including:
          <ul className="list-disc ml-5 mt-2">
            <li>
              Personal identification information (Name, email address, phone
              number, etc.)
            </li>
            <li>Usage data (pages visited, time spent on pages, etc.)</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">
          3. How We Use Information
        </h2>
        <p className="text-gray-700 mb-4">
          We use the collected information in various ways, including to:
          <ul className="list-disc ml-5 mt-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
          </ul>
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">
          4. Third-Party Privacy Policies
        </h2>
        <p className="text-gray-700 mb-4">
          Our Privacy Policy does not apply to other advertisers or websites.
          Thus, we advise you to consult the respective Privacy Policies of
          these third-party ad servers for more detailed information.
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">
          5. Children's Information
        </h2>
        <p className="text-gray-700 mb-4">
          We do not knowingly collect any Personal Information from children
          under the age of 13. If you think that any Personal Information that
          we have collected from children under 13, please contact us
          immediately and we will remove it from our databases.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
