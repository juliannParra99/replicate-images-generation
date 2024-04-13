import React from "react";
import Image from "next/image";
import Link from "next/link";

// Renders a project card displaying project details, an image, and overlay links for project and code viewing
const CardsModels = ({
  imgUrl,
  title,
  description,
  index,
}: {
  imgUrl: string;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div>
      <div
        className="group rounded-t-xl h-52 md:h-72 bg-center relative overflow-hidden"
        style={{ background: `url(${imgUrl})`, backgroundSize: "contain" }}
      >
        <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center"></div>
      </div>
      <div className="bg-[#181818] rounded-b-xl py-6 px-4 text-white">
        <h5 className="font-lg font-semibold">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default CardsModels;
