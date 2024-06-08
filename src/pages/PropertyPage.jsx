import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PropertyPage = () => {
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
        Company Property
      </motion.h1>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <p className="text-gray-700 mb-4">
          Welcome to our premier company property, where luxury meets
          functionality. Nestled in a prime location, our property offers a
          unique blend of modern architecture and serene surroundings. With
          spacious interiors, state-of-the-art amenities, and meticulous
          attention to detail, our property provides an unparalleled living
          experience. Whether you're looking for a new home or a vibrant
          workspace, our property caters to all your needs.
        </p>
        <img
          src="/path/to/property-image.jpg" // Replace with your image path
          alt="Company Property"
          className="rounded-lg shadow-md mx-auto"
        />
      </motion.div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-4"
      >
        <p className="text-gray-700">
          Discover a place where comfort meets elegance, and make our property
          your next destination.
        </p>
      </motion.div>
    </div>
  );
};

export default PropertyPage;
