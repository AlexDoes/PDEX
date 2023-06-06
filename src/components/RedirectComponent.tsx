import spinner from "public/images/spinner.svg";
import LoadingPlantImage from "./LoadingPlant";

export default function RedirectComponent() {
  return (
    <div className="w-full flex justify-center items-center mx-auto h-[75vh]">
      <div className="w-[80%] rounded-xl bg-orange-100 bg-opacity-75 h-[70vh] flex justify-evenly  items-center text-center text-3xl flex-col p-2">
        <div className="flex flex-col items-center justify-evenly">
          <p>
            This doesn't seem to be the right place to be. <br />
            We'll get you back to the home page.
          </p>
          {/* <img src={spinner.src} alt="spinner" className="" /> */}
          <LoadingPlantImage />
          <div className="animate-pulse">
            Redirecting you to the correct place...
          </div>
        </div>
      </div>
    </div>
  );
}
