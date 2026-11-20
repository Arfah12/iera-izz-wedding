
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Couple.css";
import { weddingData } from "../config/weddingData";

export default function Couple() {
  const galleryRef = useRef(null);
  const sectionRef = useRef(null);

  const galleryPhotos = [
    {
      src: weddingData.galleryPhoto1,
      label: "THE BEGINNING",
    },
    {
      src: weddingData.galleryPhoto2,
      label: "SWEET MEMORIES",
    },
    {
      src: weddingData.galleryPhoto3,
      label: "OUR JOURNEY",
    },
  ].filter((photo) => photo.src);

  // SLOW COLOUR REVEAL
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("colour-revealed");
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // GALLERY SLIDER
  const slideGallery = (direction) => {
    if (!galleryRef.current) return;

    galleryRef.current.scrollBy({
      left: direction * galleryRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="couple-section" ref={sectionRef}>

      {/* HEADER */}
      <div className="couple-header">
        <p className="couple-eyebrow">
          TWO HEARTS, ONE STORY
        </p>

        <h2 className="couple-title">
          The People
          <br />
          Behind The Story
        </h2>

        <p className="couple-subtitle">
          A beautiful journey that brings two souls together.
        </p>
      </div>

      {/* BRIDE & GROOM */}
      <div className="couple-gallery">

        {/* BRIDE */}
        <div className="polaroid-card bride-card">
          <div className="polaroid-image">
            <img
              src={weddingData.bridePhoto}
              alt="Bride portrait"
            />
          </div>

          <div className="polaroid-caption">
            <span>THE BRIDE</span>
            <h3>{weddingData.brideName}</h3>
          </div>
        </div>

        {/* GROOM */}
        <div className="polaroid-card groom-card">
          <div className="polaroid-image">
            <img
              src={weddingData.groomPhoto}
              alt="Groom portrait"
            />
          </div>

          <div className="polaroid-caption">
            <span>THE GROOM</span>
            <h3>{weddingData.groomName}</h3>
          </div>
        </div>

      </div>

      {/* MAIN COUPLE PHOTO */}
      <div className="couple-main-photo">
        <img
          src={weddingData.couplePhoto}
          alt="Together as one"
        />

        <div className="couple-photo-caption">
          <span>AND SO, THE STORY CONTINUES</span>

          <h3>
            Together
            <br />
            Forever.
          </h3>
        </div>
      </div>

      {/* EXTRA PHOTO GALLERY */}
      {galleryPhotos.length > 0 && (
        <div className="couple-extra-gallery">

          <div className="extra-gallery-heading">
            <div>
              <p>CAPTURED MOMENTS</p>

              <h3>
                Little Moments, <i>Forever Memories.</i>
              </h3>
            </div>

            <div className="gallery-arrows">
              <button
                type="button"
                onClick={() => slideGallery(-1)}
                aria-label="Previous photos"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                onClick={() => slideGallery(1)}
                aria-label="Next photos"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>

          <div
            className="extra-gallery-track"
            ref={galleryRef}
          >
            {galleryPhotos.map((photo, index) => (
              <div
                className="extra-photo-card"
                key={index}
              >
                <div className="extra-photo-image">
                  <img
                    src={photo.src}
                    alt={`Couple memory ${index + 1}`}
                  />
                </div>

                <div className="extra-photo-caption">
                  <span>{photo.label}</span>
                  <span>0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="gallery-hint">
            SWIPE TO EXPLORE OUR MEMORIES →
          </p>

        </div>
      )}

      {/* FOOTER */}
      <div className="couple-bottom">
        <span>WARKAHKASIH</span>
        <span>EST. 2027</span>
      </div>

    </section>
  );
}
