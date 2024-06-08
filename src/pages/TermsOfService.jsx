import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TermsOfService = () => {
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
        Terms of Service
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
          Welcome to our website. By accessing or using our website, you agree
          to be bound by these terms of service and our privacy policy. If you
          do not agree with any part of the terms, you must not use our website.
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">2. Use of the Site</h2>
        <p className="text-gray-700 mb-4">
          You agree to use the site for lawful purposes only. You must not use
          the site in any way that may cause damage to the site or impair the
          availability or accessibility of the site.
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
          3. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4">
          All content on the site, including but not limited to text, graphics,
          logos, images, and software, is the property of the site owner and is
          protected by copyright and other intellectual property laws.
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
          4. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          In no event shall the site owner be liable for any damages arising out
          of the use or inability to use the site, even if the site owner has
          been advised of the possibility of such damages.
        </p>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
