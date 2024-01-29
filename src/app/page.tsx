"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPrediction } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";

function FormContent() {
  const {pending} = useFormStatus();
  return (
    <>
      <Input
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        name="image"
        type="text"
      />
      <Textarea name="promt" placeholder="An industrial bedroom" />
      <Button disabled={pending}>Run</Button>
    </>
  );
}

export default function Home() {
  //i pass it my server action; with this, i recover the data from my server component, and i can use it in the client
  const [state, formAction] = useFormState(createPrediction, null);

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
