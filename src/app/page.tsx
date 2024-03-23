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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? <Skeleton className="h-[480px] w-[512px]"></Skeleton> : null}
      <Input
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        //defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        name="image"
        type="file"
      />
      <Textarea name="promt" placeholder="An industrial bedroom" />
      <Button disabled={pending}>Run</Button>
    </>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(handleSubmit, null)
  async function handleSubmit(_state: null | Prediction,formData: FormData) {
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);

      await sleep(4000);
    }
    return prediction
  }

  return (
    <section className="m-auto grid gap-4 max-w-[512px]">
      {state?.output ? (
        <img src={state.output[1]} alt="Render previsualization" />
      ) : null}
      <form action={formAction} className="grid gap-4">
        <FormContent />
      </form>
    </section>
  );
}
