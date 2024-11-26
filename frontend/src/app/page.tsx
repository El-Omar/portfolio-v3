import Intro from "@/components/home/Intro";
import Design from "@/components/home/Design";
import Develop from "@/components/home/Develop";
import ParallaxTitleSection from "@/components/ui/ParallaxTitleSection";

const Home = () => {
  return (
    <div className={`flex flex-col items-center relative overflow-x-hidden`}>
      <main className="flex flex-col items-center container">
        <section className="w-full md:py-20 py-10 xl:mt-6">
          <Intro />
        </section>
        <ParallaxTitleSection
          className="mt-10 md:mt-24 bg-neutral-100 flex flex-col gap-4 w-full md:px-12 md:py-20 xl:p-20 xl:py-36 px-4 py-10"
          contentClassName="flex flex-col gap-12 mt-20"
          title={
            <h2 className="text-center">
              Expertise{" "}
              <span className="font-baskerville text-cool-red">
                & experience
              </span>
            </h2>
          }
        >
          <Design />
          <Develop />
        </ParallaxTitleSection>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
