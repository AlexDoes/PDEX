import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type CarouselProps = {
  images: string[];
};

export default function ImageCarousel({ images }: CarouselProps) {
  return (
    <Carousel showThumbs={false} showStatus={false} infiniteLoop>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Image ${index}`}
            className="w-[200px] h-[200px] object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}
