import React, { useState, useEffect } from "react";
import placeHolderIMG from "assets/images/Spinner.gif";

const placeHolder = "/assets/images/Spinner.gif";
const placeHolderError = "/assets/images/placeHolder404.png";

export const LazyImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  const onLoad = (event) => {
    event.target.classList.add("loaded");
  };

  const onError = (event) => {
    event.target.classList.add("has-error");
    event.target.src = placeHolderError;
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef);
      } else {
        // Old browsers fallback
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);
  return (
    <img
      className={`lazy_img ${props.className}`}
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      placeholder={placeHolderIMG}
    />
  );
};
