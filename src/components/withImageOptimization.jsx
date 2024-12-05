import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Higher-Order Component
const withImageOptimization = (WrappedComponent) => {
  const OptimizedImage = ({ src, alt, width, height, placeholder = true, ...props }) => {
    const getPlaceholder = () => {
      if (!placeholder) return null;

      // Placeholder as a low-quality color if blurDataURL is not provided
      return (
        <div
          style={{
            backgroundColor: "#e0e0e0",
            width: width || "100%",
            height: height || "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></div>
      );
    };

    return (
      <div
        style={{
          position: "relative",
          width: width ? `${width}px` : "auto",
          height: height ? `${height}px` : "auto",
        }}
      >
        {getPlaceholder()}
        <LazyLoadImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          effect="blur" // Add blur effect while loading
          {...props}
        />
      </div>
    );
  };

  return (props) => <WrappedComponent {...props} OptimizedImage={OptimizedImage} />;
};

export default withImageOptimization;
