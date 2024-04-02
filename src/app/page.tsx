// the "use client" section focuses on handling form state and user interface elements. Through the use of the useFormState and useFormStatus hooks, managing form state and obtaining information about submission status is streamlined. The handleSubmit function serves as a bridge between client-side logic and server-side functions, orchestrating form submission and dynamically updating the user interface based on prediction progress. This seamless integration between the client and server enables a cohesive and responsive user experience in the application.
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPrediction, getPrediction } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Prediction } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function SkeletonPending() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? <Skeleton className="h-[480px] w-[512px]"></Skeleton> : null}
    </>
  );
}

function FormContent() {
  const { pending } = useFormStatus();
  // handle an image file. It initializes a state variable image with a default value
  const [image, setImage] = useState<string | null>(
    "https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
  );

  //   handleImageChange function is an event handler for the onChange event of an input element (<Input type="file" />). When a user selects a file using the file input, this function is called with the event object e.
  //  it first checks if a file was selected (const file = e.target.files?.[0]). If a file was selected, it creates a new FileReader object, reads the selected file as a data URL using reader.readAsDataURL(file), and sets the image state to the result (reader.result) once the file has been read (reader.onloadend).
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* here i can improve the code choosing one of another input if an input was selected or not. */}
      <p className="text-xl text-purple-50">Choose a picture (Optional)</p>
      <div className="flex items-center space-x-6">
        <div className="shrink-0">
          {image && (
            <img
              src={image}
              alt="Uploaded Image"
              className="h-[5.5rem] w-[5.5rem] mt-2 object-cover rounded-sm "
            />
          )}
        </div>
        <Input
          type="file"
          className="block w-full text-sm text-slate-500
      file:mr-4 
      file:rounded-sm file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:
      hover:file:bg-violet-100
    "
          onChange={handleImageChange}
        />
      </div>

      <Input
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        name="image"
        type="hidden"
        value={image || ""}
      />
      <p className="text-xl text-purple-50">Prompt:</p>
      <Textarea name="promt" placeholder="An industrial bedroom" />
      <Button disabled={pending}>
        {pending ? (
          <div className=" h-5 w-5 animate-spin rounded-full border-b-2 border-blue"></div>
        ) : (
          <>Generate</>
        )}
      </Button>
    </>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(handleSubmit, null);
  console.log(state);
  async function handleSubmit(_state: null | Prediction, formData: FormData) {
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);
      await sleep(4000);
      console.log("prediction until now: ", prediction);
    }
    return prediction;
  }

  return (
    <section className="m-auto grid gap-4 max-w-[512px]">
      <form action={formAction} className="grid gap-4">
        <div className=" h-[512px] w-[512px]">
          {state?.output ? (
            <img
              src={state.output[1]}
              className="h-[512px] w-[512px]"
              alt="Render previsualization"
            />
          ) : (
            <SkeletonPending />
          )}
        </div>
        <FormContent />
      </form>
    </section>
  );
}
