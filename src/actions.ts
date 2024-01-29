//the plan it's to use the content that we got from server action
//in client components after get the data from the server; When we wanna work with server actions, we can create un 'server component' y passarlo como prop al server client, or as in this case we can create a file which can have everything we need and import them into the server client



"use server"

import { Prediction } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export async function createPrediction(_state: null | Prediction,formData: FormData): Promise<Prediction>  {

    //with this we make that the data will come from the fetch, from a request; not from the cache
    noStore()

    let prediction = await fetch("https://replicate.com/api/predictions", {
      headers: {
        accept: "application/json",
        "accept-language": "en;q=0.5",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-csrftoken": "u2UdJdQ88paQhGRuFDSd1IRk1c9iur6c",
      },
      referrer: "https://replicate.com/jagilley/controlnet-hough",
      referrerPolicy: "same-origin",
      body: JSON.stringify({
        input: {
          eta: 0,
          image: formData.get("image") as string,
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
        is_training: false,
        create_model: "0",
        stream: false,
        version:
          "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }).then((res) => res.json() as Promise<Prediction>);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await fetch(
        "https://replicate.com/api/predictions/" + prediction.id,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en;q=0.5",
            "sec-ch-ua":
              '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
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
        }
      ).then((res) => res.json() as Promise<Prediction>);

      console.log(prediction)

      await sleep(4000);
    }

    return prediction;
  }