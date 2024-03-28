import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            
          </h1>
          <h2 className="inline">
            Generate Images with AI. Choose Between thousands of Models to get your image.
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Run and fine-tune open-source models. Deploy custom models at scale. All with one line of code.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Get Started</Button>
        </div>
      </div>
    
    </section>
  );
};