import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

type CarouselProps = {
  images: string[];
  names: Plant[];
};

type Plant = {
  id: string;
  name: string;
  index: number;
  species: string;
  species2: string;
};

export default function CollectionImageCarousel({
  images,
  names,
}: CarouselProps) {
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
          <div className="legend flex flex-col items-center justify-center">
            <Link href={`/p/${names[index].id}`}>
              <div className="flex items-center justifer-center gap-1 hover:text-blue-300">
                {names[index].name}
                {/* <BsBoxArrowUpRight className="" /> */}
              </div>
            </Link>
            {names[index].species ? names[index].species : null}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
