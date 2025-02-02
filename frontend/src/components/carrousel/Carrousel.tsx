import { useEffect, useState } from "react";
import { CarrouselMobile } from "./CarrouselMobile";
import { CarrouselDesktop } from "./CarrouselDesktop";

export interface BannerImages {
  id: string;
  alt: string;
  url: string;
  mobile: boolean;
}

const Img: BannerImages[] = [
  {
    id: "20153590-dfc8-4727-bd6e-6fce3aab8db7.webp",
    alt: "banner",
    url: "20153590-dfc8-4727-bd6e-6fce3aab8db7.webp",
    mobile: false
  },
  {
    id: "a1c5fff3-9a56-4990-9767-f5ff9569fe07.webp",
    alt: "banner2",
    url: "a1c5fff3-9a56-4990-9767-f5ff9569fe07.webp",
    mobile: false
  },
  {
    id: "logo3.jpg",
    alt: "banner2",
    url: "logo3.jpg",
    mobile: false
  },
  {
    id: "logo4.avif",
    alt: "banner2",
    url: "logo4.avif",
    mobile: true
  },
  {
    id: "a674edbd-f23b-4e5a-83e7-46de9eeaa927.jpg",
    alt: "banner2",
    url: "a674edbd-f23b-4e5a-83e7-46de9eeaa927.jpg",
    mobile: true
  },
  {
    id: "mobile1.jpg",
    alt: "banner2",
    url: "mobile1.jpg",
    mobile: true
  },
  {
    id: "mobile2.jpg",
    alt: "banner 3",
    url: "mobile2.jpg",
    mobile: true
  },
]



export function Carrousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const [slides, setSlides] = useState<BannerImages[]>(Img);
  console.log(setSlides)

  const slidesDesktop = slides.filter((e) => e.mobile === false)
  const slidesMobile = slides.filter((e) => e.mobile === true )


  useEffect(() => {
    const handleResize = () => setIsMobileWidth(window.innerWidth < 768)

    handleResize();


    // Elimina el event listener cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slidesLength = isMobileWidth ? slidesMobile.length : slidesDesktop.length
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
   
      prevIndex === 0 ? slidesLength - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slidesLength - 1 ? 0 : prevIndex + 1,
    );
  };



  useEffect(() => {

    if (slides.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [currentIndex, slides]);





  return (
    <>
    {isMobileWidth ? (
        <CarrouselMobile
            slides={slidesMobile}
            currentIndex={currentIndex}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
        />
    ) : (
        <CarrouselDesktop
            slides={slidesDesktop}
            currentIndex={currentIndex}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
        />
    )}
</>
  )
}
