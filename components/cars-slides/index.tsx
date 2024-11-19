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
} from "@/components/ui/carousel";

import CarsMockData from "@/mock-data";
import { groupItems } from "@/lib/utils";

import { Car } from "@/models";

export default function CarsSlides() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(checkMobile);
  }, []);

  const formatedCarsData: Array<Car | Car[]> = useMemo(() => {
    if (isMobile) return CarsMockData;
    return groupItems(CarsMockData, 8);
  }, [isMobile]);

  if (!isClient) return null;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={`w-full ${isMobile ? "max-w-xs" : "max-w-2xl"}`}
    >
      <CarouselContent>
        {formatedCarsData.map((item: Car | Car[], index) => (
          <CarouselItem key={index}>
            {isMobile ? (
              <div className="p-1">
                <Card>
                  <CardContent className="flex gap-2 flex-col justify-center items-center aspect-square items-center justify-center p-6">
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
                        <CardContent className="flex gap-2 flex-col justify-center items-center aspect-square items-center justify-center p-6">
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
  );
}
