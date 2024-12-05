import React from "react";
import withImageOptimization from "./withImageOptimization";

const Gallery = ({ images, OptimizedImage }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <OptimizedImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={300}
          height={200}
          placeholder={true}
        />
      ))}
    </div>
  );
};

export default withImageOptimization(Gallery);
