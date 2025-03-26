import { Outlet, createRootRoute } from "@tanstack/react-router";
import HeroImage from "@assets/hero-image.jpg";
import Logo from "@assets/logo.svg";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className=" w-full flex flex-col items-center relative">
      <div className="w-full flex flex-col items-center relative">
        <img className="w-full" src={HeroImage} alt="world ranks hero image" />
        <img
          className="top-[35%] w-64 mt-4 absolute"
          src={Logo}
          alt="world ranks logo"
        />
      </div>
      <div className="relative bg-[var(--color-bg)] border border-[var(--color-border-ui)] w-full p-8 md:absolute md:w-7/8 md:min-h-[400px] md:top-[70%] md:mt-6 md:rounded-lg md:shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
