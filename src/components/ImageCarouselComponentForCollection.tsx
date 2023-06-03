import { Carousel } from "react-responsive-carousel";

type CarouselProps = {
  images: string[];
};

export default function CollectionImageCarousel({ images }: CarouselProps) {
  return (
    <Carousel
      className="h-full w-full"
      showThumbs={false}
      showStatus={false}
      infiniteLoop
    >
      {images.map((image, index) => (
        <div key={{ image } + String(Math.random() * 1000000000)}>
          <img
            src={image}
            alt={`Image ${index}`}
            className="w-[full] h-[full] object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}
