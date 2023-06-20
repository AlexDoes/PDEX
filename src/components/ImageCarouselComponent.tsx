import { Carousel } from "react-responsive-carousel";

type CarouselProps = {
  images: string[];
};

export default function ImageCarousel({ images }: CarouselProps) {
  return (
    <Carousel
      showThumbs={false}
      showIndicators={false}
      showStatus={true}
      infiniteLoop
    >
      {images.map((image, index) => (
        <div key={{ image } + String(Math.random() * 1000000000)}>
          <img
            src={image}
            alt={`Image ${index}`}
            className="xs:w-[200px] xs:h-[200px] xsss:w-[150px] xsss:h-[150px] object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}
