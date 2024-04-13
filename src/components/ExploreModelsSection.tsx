"use client";
import React, { useState, useRef } from "react";
import CardsModels from "./CardsModels";

const modelsData = [
  {
    title: "smoretalk/{rembg-enhance",
    description: `A background removal model enhanced with ViTMatte.`,
    image:
      "https://tjzk.replicate.delivery/models_models_featured_image/36ad614e-4103-4012-9ae4-6937bf146b67/vit-matte.jpg",
  },
  {
    title: "fofr/become-image",
    description: `Adapt any picture of a face into another image`,
    image:
      "https://tjzk.replicate.delivery/models_models_featured_image/b37fc7b7-0cef-4895-9176-bf5bb0cb7011/pearl-earring-1.webp",
  },
  {
    title: "bytedance/lightning-4step",
    description: `SDXL-Lightning by ByteDance: a fast text-to-image model that makes high-quality images in 4 steps`,

    image:
      "https://tjzk.replicate.delivery/models_models_featured_image/779f3f58-c3db-4403-a01b-3ffed97a1449/out-0-1.jpg",
  },
  {
    title: "mistralai/mistral-8x7b-instruct-v0.1",
    description:
      "The Mixtral-8x7B-instruct-v0.1 Large Language Model (LLM) is a pretrained generative Sparse Mixture of Experts tuned to be a helpful assistant.",
    image:
      "https://tjzk.replicate.delivery/models_models_featured_image/b9867b79-28e4-4e8f-b2b3-0f669111869c/mixtral.png",
  },
  {
    title: "vaibhavs10/incredibibly-fast-whisper",
    description: `
    whisper-large-v3, incredibly fast, powered by Hugging Face Transformers! 🤗
  `,
    image:
      "https://tjzk.replicate.delivery/models_models_featured_image/4c5d637c-c441-4857-9791-7c11111b38b4/52ebbd85-50a7-4741-b398-30e31.webp",
  },
  {
    title: "meta/musicgen",
    description: `Generate music from a prompt or melody`,

    image:
      "https://tjzk.replicate.delivery/models_models_featured_image/a921a8b3-3e9e-48ef-995c-29143ea11bec/musicgen.jpeg",
  },
];

const ExploreModelsSection = () => {
  return (
    <section id="projects" className="my-8 md:my-12">
      <h4 className="text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Other Models
      </h4>

      <ul className="grid md:grid-cols-3 gap-8 md:gap-12">
        {modelsData.map((project, index) => (
          <CardsModels
            key={index}
            index={index}
            title={project.title}
            description={project.description}
            imgUrl={project.image}
          />
        ))}
      </ul>
    </section>
  );
};

export default ExploreModelsSection;
