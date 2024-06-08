import { useState } from "react";
import { db } from "../firebase"; // Ensure the correct path to your Firebase config
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"; // Adjust this import

// Importing icons from react-icons
import {
  FaMoneyBillWave,
  FaHome,
  FaBath,
  FaBed,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCouch,
} from "react-icons/fa";

const SearchComponent = () => {
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const listingsRef = collection(db, "listings");
    let constraints = [];

    // Filter by price range
    // if (minPrice) {
    //   constraints.push(where("regularPrice", ">=", parseInt(minPrice)));
    // }
    // if (maxPrice) {
    //   constraints.push(where("regularPrice", "<=", parseInt(maxPrice)));
    // }

    // Filter by address
    if (address) {
      constraints.push(where("address", "==", address));
    }

    // Filter by type (rent or sale)
    if (type) {
      constraints.push(where("type", "==", type));
    }

    // Add order by price
    constraints.push(orderBy("regularPrice", "asc"));

    const q = query(listingsRef, ...constraints);

    console.log("Query constraints: ", constraints);

    getDocs(q)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched data: ", data);
        setListings(data);
        setError(""); // Clear any previous errors
      })
      .catch((error) => {
        if (error.code === "permission-denied") {
          setError(
            "Permission denied accessing listings. Please contact support."
          );
        } else if (error.code === "unimplemented") {
          setError(
            "The query is not supported by the Firebase SDK. Please check your query."
          );
        } else if (error.code === "failed-precondition") {
          setError(
            "The query requires an index. Please check your Firestore indexes."
          );
        } else {
          setError("Error searching listings: " + error.message);
        }
        console.error("Error searching listings: ", error);
        setListings([]); // Clear listings on error
      });
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-1 mb-4">
        <h1 className="text-1xl font-bold text-gray-700 mb-8">Filter By</h1>
        {/* <span className="block sm:inline-block mb-2 sm:mb-0 text-gray-500 ml-3 mt-2 sm:mt-1">
          min price
        </span>
        <input
          type="number"
          placeholder="Min Price"
          className="w-full sm:w-1/4 border-gray-300 rounded-md p-2"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <span className="block sm:inline-block mb-2 sm:mb-0 text-gray-500 ml-3 mt-2 sm:mt-1">
          {" "}
          Max Price:
        </span>
        <input
          type="number"
          placeholder="Max Price"
          className="w-full sm:w-1/4 border-gray-300 rounded-md p-2"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        /> */}
        <span className="block sm:inline-block mb-2 sm:mb-0 text-gray-500 mr-1 ml-3 mt-3 sm:mt-3">
          {" "}
          Location:
        </span>
        <input
          type="text"
          placeholder="Address"
          className="w-full sm:w-1/4 border-gray-300 rounded-md p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <span className="block sm:inline-block mb-2 sm:mb-0 text-gray-500 mr-1 ml-3 mt-3 sm:mt-3">
          Type:
        </span>
        <select
          className="w-full sm:w-1/4 border-gray-300 rounded-md p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <div className="text-center">
          <button
            className="block sm:inline-block ml-3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-200 text-red-700">
          <p>{error}</p>
        </div>
      )}
      <div className="mt-8">
        {listings.length === 0 ? (
          <p className="text-center">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white shadow-md rounded-md overflow-hidden"
              >
                {listing.imgUrls && listing.imgUrls.length > 0 && (
                  <img
                    src={listing.imgUrls[0]}
                    alt={`Image of ${listing.address}`}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> {listing.address}
                  </h2>
                  <p className="text-gray-600 flex items-center">
                    <FaHome className="mr-2" />{" "}
                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaMoneyBillWave className="mr-2" /> Price: GHS
                    {listing.regularPrice}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaCouch className="mr-2" /> Furnished:{" "}
                    {listing.furnished ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaBath className="mr-2" /> Bathrooms: {listing.bathrooms}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaBed className="mr-2" /> {listing.bedrooms}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaPhone className="mr-2" /> {listing.phoneNumber}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaCalendarAlt className="mr-2" /> Listed on:{" "}
                    {new Date(
                      listing.timestamp.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
