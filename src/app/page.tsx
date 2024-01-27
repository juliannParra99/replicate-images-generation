import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Prediction } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/*
This code implements HTTP requests, both GET and POST, to the Replicate API.

For the GET method, a specific URL (e.g., https://replicate.com/jagilley/controlnet-hough) is provided to retrieve data or resources from the server. The parameters for the GET request are included in the URL.

As for the POST method, a request is made to the "https://replicate.com/api/predictions" URL. Headers, such as JSON acceptance and user agent details, are configured, and structured data in JSON format is sent in the request body. This request is designed to obtain predictions based on the provided information.

Make sure to customize the URL, parameters, and headers according to the specific requirements of your application. Additionally, verify credentials and security as needed for your use case.
*/

export default function Home() {
  async function createPrediction(formData: FormData) {

    "use server";
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

    console.log(prediction);
  }
  return (
    <form action={createPrediction} className="m-auto grid gap-4 max-w-[512px]">
      <Input
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        name="image"
        type="text"
      />
      <Textarea name="promt" placeholder="An industrial bedroom" />
      <Button>Run</Button>
    </form>
  );
}
