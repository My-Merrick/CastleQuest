import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { FaTrash, FaEdit } from "react-icons/fa";

const ListingItem = ({ listing, id, onEdit, onDelete }) => {
  if (!listing) {
    return null;
  }

  console.log("Listing Data:", listing);

  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // handle null or undefined timestamp

    const date = timestamp.toDate(); // Assuming toDate() returns a valid Date object
    if (!date) return "";

    const now = new Date();
    const diff = now - date;

    // Calculate the difference in time
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Choose format based on the time difference
    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }
  };

  const getFormattedPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-3">
      <div className="w-full h-full">
        <Link to={`/category/${listing.type}/${id}`}>
          <img
            className="h-48 w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
            loading="lazy"
            src={
              listing.imgUrls && listing.imgUrls.length > 0
                ? listing.imgUrls[0]
                : ""
            }
            alt={listing.name}
          />
          <div className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
            {formatDate(listing.timestamp)}
          </div>
          <div className="w-full p-4">
            <div className="flex items-center space-x-1">
              <MdLocationOn className="h-4 w-4 text-green-600" />
              <p className="font-semibold text-sm mb-1 text-gray-600 truncate">
                {listing.address}
              </p>
            </div>
            <p className="font-semibold text-lg truncate">{listing.name}</p>
            <div className="flex items-center">
              <p className="text-[#457b9d] mt-2 font-semibold">
                GHS{" "}
                {getFormattedPrice(
                  listing.offer ? listing.discountedPrice : listing.regularPrice
                )}
                {listing.type === "rent" && " / month"}
              </p>
              {listing.offer && (
                <p className="text-gray-500 line-through ml-2">
                  GHS {getFormattedPrice(listing.regularPrice)}
                </p>
              )}
            </div>
            <div className="flex items-center mt-3 space-x-3">
              <div className="flex items-center space-x-1">
                <p className="font-bold text-xs">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <p className="font-bold text-xs">
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths`
                    : "1 Bath"}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2 text-gray-500 text-xs space-x-2">
              <div className="flex items-center space-x-1">
                <MdPhone className="h-4 w-4" />
                <span>{listing.phoneNumber}</span>
              </div>
            </div>
          </div>
        </Link>
        {onDelete && (
          <FaTrash
            className="absolute bottom-2 right-2 h-4 w-4 cursor-pointer text-red-500"
            onClick={() => onDelete(id)}
          />
        )}
        {onEdit && (
          <FaEdit
            className="absolute bottom-2 right-8 h-4 w-4 cursor-pointer text-[#3182ce]"
            onClick={() => onEdit(id)}
          />
        )}
      </div>
    </li>
  );
};

export default ListingItem;
