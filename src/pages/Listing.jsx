// import React from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (currentImageIndex < listing.imgUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const formatPrice = (price) => {
    return price?.toLocaleString("en-US");
  };

  return (
    <main className="max-w-6xl mx-auto px-4">
      <div className="relative w-full h-96 mb-6 overflow-hidden">
        <img
          src={listing.imgUrls[currentImageIndex]}
          alt={listing.name}
          className="object-cover w-full h-full"
        />
        {listing.imgUrls.length > 1 && (
          <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full z-10">
            <button
              onClick={prevImage}
              className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-full shadow-lg hover:bg-opacity-70 transition duration-300 ease-in-out"
            >
              &#8249;
            </button>
            <button
              onClick={nextImage}
              className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-full shadow-lg hover:bg-opacity-70 transition duration-300 ease-in-out"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={handleCopyLink}
          className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 hover:border-slate-600 rounded transition duration-150 ease-in-out"
        >
          <FaShare className="text-lg text-slate-500" />
          {shareLinkCopied && <span className="ml-2">Link Copied</span>}
        </button>
      </div>
      <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className="w-full">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - GHS
            {listing.offer
              ? formatPrice(listing.discountedPrice)
              : formatPrice(listing.regularPrice)}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                GHS{+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
      </div>
    </main>
  );
}
