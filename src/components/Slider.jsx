import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import "./Slider.css"; // Add custom CSS for slider

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  useEffect(() => {
    if (listings && listings.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % listings.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [listings]);

  if (loading) {
    return <Spinner />;
  }

  if (!listings || listings.length === 0) {
    return <></>;
  }

  return (
    <div className="slider-container">
      {listings.map(({ data, id }, index) => (
        <div
          key={id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          onClick={() => navigate(`/category/${data.type}/${id}`)}
          style={{
            backgroundImage: `url(${data.imgUrls[0]})`,
          }}
        >
          <div className="slide-content">
            <p className="slide-title">{data.name}</p>
            <p className="slide-price">
              GHS {data.discountedPrice ?? data.regularPrice}
              {data.type === "rent" && " / month"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
