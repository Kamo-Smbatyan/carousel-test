"use client";

import { useEffect, useState, useMemo } from "react";
import { isMobile as checkMobile } from "react-device-detect";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

import CarsMockData from "@/mock-data";
import { groupItems } from "@/lib/utils";

import { Car } from "@/models";

export default function CarsSlides() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [totalSections, setTotalSections] = useState(1);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(checkMobile);
  }, []);

  const formattedCarsData: Array<Car | Car[]> = useMemo(() => {
    if (isMobile) return CarsMockData;
    const groupedData = groupItems(CarsMockData, 8);
    setTotalSections(groupedData.length);
    return groupedData;
  }, [isMobile]);

  const handleSelect = () => {
    if (carouselApi) {
      const section = carouselApi.selectedScrollSnap() + 1;
      setCurrentSection(section);
    }
  };

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("select", handleSelect);
      setTotalSections(carouselApi.scrollSnapList().length);

      return () => {
        carouselApi.off("select", handleSelect);
      };
    }
  }, [carouselApi]);

  if (!isClient) return null;

  return (
    <div className="w-full">
      
      <Carousel
        opts={{
          align: "start",
        }}
        className={`w-full ${isMobile ? "max-w-xs" : "max-w-2xl"}`}
        setApi={setCarouselApi}
      >
        <CarouselContent>
          {formattedCarsData.map((item: Car | Car[], index) => (
            <CarouselItem key={index}>
              {isMobile ? (
                <div className="p-1">
                  <Card>
                    <CardContent className="flex gap-2 flex-col justify-center items-center aspect-square p-6">
                      <img
                        src={
                          item instanceof Object && "image" in item
                            ? item.image
                            : undefined
                        }
                        alt="car logo"
                        width={"80em"}
                      />
                      <span className="text-[8vmin] font-semibold uppercase">
                        {item instanceof Object && "make" in item && item.make}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {item instanceof Array &&
                    item.map((subItem: Car) => (
                      <div key={subItem.id} className="p-1">
                        <Card>
                          <CardContent className="flex gap-2 flex-col justify-center items-center aspect-square p-6">
                            <img
                              src={subItem.image}
                              alt="car logo"
                              width={"50em"}
                            />
                            <span className="text-[1.8vmin] font-semibold uppercase">
                              {subItem.make}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-center mb-4">
        <span className="text-lg font-bold">
          {currentSection}/{totalSections}
        </span>
      </div>
    </div>
  );
}
