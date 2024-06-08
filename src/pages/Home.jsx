// pages/Home.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { motion } from "framer-motion"; // Import framer-motion
import SearchComponent from "../components/SearchComponent";

const Home = () => {
  // Offers
  const [offerListings, setOfferListings] = useState([]);
  useEffect(() => {
    async function fetchOfferListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log("Error fetching offer listings:", error);
        setOfferListings([]);
      }
    }
    fetchOfferListings();
  }, []);

  // Places for rent
  const [rentListings, setRentListings] = useState([]);
  useEffect(() => {
    async function fetchRentListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log("Error fetching rent listings:", error);
        setRentListings([]);
      }
    }
    fetchRentListings();
  }, []);

  // Places for sale
  const [saleListings, setSaleListings] = useState([]);
  useEffect(() => {
    async function fetchSaleListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log("Error fetching sale listings:", error);
        setSaleListings([]);
      }
    }
    fetchSaleListings();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <Slider />
      <SearchComponent />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings.length > 0 && (
          <motion.div
            className="m-2 mb-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </motion.div>
        )}

        {rentListings.length > 0 && (
          <motion.div
            className="m-2 mb-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </motion.div>
        )}

        {saleListings.length > 0 && (
          <motion.div
            className="m-2 mb-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for sale
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Home;
