// encapsulates critical server-side functions within the application. The createPrediction and getPrediction functions play a pivotal role in facilitating interaction with a remote API for the creation and retrieval of predictions, respectively. These functions abstract the complexity of HTTP requests, providing a consistent interface for managing prediction-related logic at the server level.
"use server";

import { Prediction } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function createPrediction(
  formData: FormData
): Promise<Prediction> {
  noStore();

  const imageUrl = await fetch(
    `https://api.cloudinary.com/v1_1/dbictymrm/image/upload?upload_preset=replicate-stream&folder=replicate-stream`,
    {
      method: "PUT",
      body: formData.get("image") as File,
    }
  )
    .then((res) => res.json() as Promise<{ secure_url: string }>)
    .then(({ secure_url }) => secure_url);

  const prediction = await fetch(
    "https://replicate.com/api/models/jagilley/controlnet-hough/versions/854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b/predictions",
    {
      headers: {
        accept: "application/json",
        "accept-language": "en;q=0.5",
        "content-type": "application/json",
        "sec-ch-ua": '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-csrftoken": "S67uOvqx5Arg09pCZdcC7hxNyk8hy36k",
      },
      referrer:
        "https://replicate.com/jagilley/controlnet-hough?prediction=ngeoyu3bonf5wop5qiqrrkje3a&input=nodejs",
      referrerPolicy: "same-origin",
      body: JSON.stringify({
        input: {
          eta: 0,
          image:formData.get("image") as string,
          scale: 9,
          prompt: formData.get("promt") as string,
          a_prompt:
            "best quality, extremely detailed, 4k, octane render, sharp bloom, daylight",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
          ddim_steps: 20,
          num_samples: "1",
          value_threshold: 0.1,
          image_resolution: "512",
          detect_resolution: 512,
          distance_threshold: 0.1,
        },
        stream: false,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  )
  .then((res) => res.json() as Promise<Prediction>);
  console.log(prediction)
  return prediction;
}

export async function getPrediction(id: string) {
  noStore();
  return fetch("https://replicate.com/api/predictions/" + id, {
    headers: {
      accept: "*/*",
      "accept-language": "en;q=0.5",
      "sec-ch-ua": '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
    },
    referrer: "https://replicate.com/jagilley/controlnet-hough",
    referrerPolicy: "same-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json() as Promise<Prediction>);

  
}

