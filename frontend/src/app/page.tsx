import Intro from "@/components/home/Intro";
import Design from "@/components/home/Design";

const Home = () => {
  return (
    <div className="relative overflow-x-hidden">
      <main className="flex flex-col items-center gap-6 xl:gap-10">
        <div className="w-full md:px-12 md:py-20 xl:p-20 px-4 py-10 xl:mt-6">
          <Intro />
        </div>
        <div className="w-full md:px-12 md:py-20 xl:p-20 px-4 py-10">
          <Design />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
