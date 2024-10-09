import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BannerImages } from "./Carrousel";

interface CarouselProps {
  slides: BannerImages[];
  currentIndex: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

export function CarrouselMobile({
  slides,
  currentIndex,
  prevSlide,
  nextSlide,
}: CarouselProps) {



  return (
    <div className="w-full h-[180px] m-auto relative group overflow-hidden z-[0]">
      {slides.length > 0 && (
        <img
        style={{
          maskImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9) 90%, rgba(255, 255, 255, 0))", // Aplica una máscara de gradiente
          WebkitMaskImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9) 90%, rgba(255, 255, 255, 0))",
          borderRadius: "8px 8px 0 0"
      }}

          src={`/carrousel/${slides[currentIndex].url}`}
          alt="Banner"
          className="w-[100vw] h-full"
        />
      )}
      <div
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <div>
          <MdKeyboardArrowLeft />
        </div>
      </div>
      <div
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <div>
          <MdKeyboardArrowRight />
        </div>
      </div>
    </div>
  )
}
