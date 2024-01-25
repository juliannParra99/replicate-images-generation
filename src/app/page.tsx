import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  async function createPrediction(formData: FormData){
    "use server"
    console.log(formData)

  }
  return (
    <form action={createPrediction} className="m-auto grid gap-4 max-w-[512px]">
      <Input placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png" defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png" name="image" type="text"/>
      <Textarea name="promt" placeholder="An industrial bedroom"/>
      <Button>Run</Button>
    </form>
    
  );
}
