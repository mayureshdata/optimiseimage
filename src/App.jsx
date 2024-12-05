import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { createClient } from "pexels";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature"); // Default search query
  const [loading, setLoading] = useState(false);

  // const UNSPLASH_ACCESS_KEY = "tIcu5pw3FOXnW6Y-qAGP_Ni4H9VXfbeJnImeyrSv7D8";//this is secrete key
  const UNSPLASH_ACCESS_KEY = "mfa2jN4-22m7PJJbZHtmcvhmdAQWhX1P26I12i19qJo"; // working

  // Function to fetch images from Unsplash API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=25&orientation=landscape`
      );
      const data = await response.json();
      console.log("data.results", data.results);
      setImages(data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  // =================================== for PEXELS ===================================
  const PEXEL_ACCESS_KEY =
    "UihL9nVPpnpaWgXSjebPZY8Nkc4OAsKUBO16O842FlcSGBiJK54ICLPc";

  const fetByPexels = async () => {
    try {
      const client = createClient(PEXEL_ACCESS_KEY);
      const photos = await client.photos.search({ query, per_page: 12 }); // Fetch 12 photos
      setImages(photos?.photos || []); // Update state with photos
    } catch (error) {
      console.error("Error fetching images from Pexels:", error);
    }
  };

  // Fetch images on component mount and query change
  useEffect(() => {
    // fetchImages();
    fetByPexels();
  }, [query]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Image Search</h1>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button
          // onClick={fetchImages}
          onClick={fetByPexels}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <h2>Loading...</h2>}

      {/* Image Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {images &&
          images.map((image) => (
            <div key={image.id} style={{ position: "relative" }}>
              <LazyLoadImage
                // src={image.urls.regular} // for unsplash
                // src={image.urls.small}
                src={image.src.medium}
                alt={image.alt || "PEXELS Image"}
                // alt={image.alt_description || "Unsplash Image"}
                effect="blur"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                {/* {image.user.name} // unspalsh*/}
                {image.photographer}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
