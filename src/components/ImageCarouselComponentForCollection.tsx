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
    <div className="h-full w-full">
      <Carousel showThumbs={false} showStatus={false} infiniteLoop>
        {images.map((image, index) => (
          <div
            className="h-full"
            key={{ image } + String(Math.random() * 1000000000)}
          >
            <div>
              <img
                src={image}
                alt={`Image ${index}`}
                className="
                xs:w-[80vw] xs:h-[80vw]
                lg:max-h-[80vh] lg:max-w-[80vh] 
                xl:max-w-[80vh] xl:max-h-[80vh]
                sm:max-w-[80vw]
                lg:w-[45vw] lg:h-[45vw]"
              />
              <div className="legend flex flex-col items-center justify-center max-h-[90px] overflow-hidden">
                <Link href={`/p/${names[index].id}`}>
                  <div className="flex items-center justifer-center gap-1 hover:text-blue-300">
                    {names[index].name}
                  </div>
                </Link>
                {names[index].species ? names[index].species : null}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
