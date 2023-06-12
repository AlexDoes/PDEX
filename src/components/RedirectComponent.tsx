import spinner from "public/images/spinner.svg";
import LoadingPlantImage from "./LoadingPlant";
import { Prompt } from "aws-sdk/clients/lexmodelbuildingservice";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PromptProps {
  prompt?: string;
  error?: string;
  location?: string;
}
interface RedirectProps {}

export default function RedirectComponent(
  prompt?: PromptProps,
  path?: RedirectProps
) {
  const promptText = prompt?.prompt;
  const promptError = prompt?.error;
  const router = useRouter();
  const locationPath = prompt?.location;

  useEffect(() => {
    setTimeout(() => {
      if (locationPath) {
        router.push("/" + locationPath);
      } else {
        router.push("/");
      }
    }, 500000);
  }, []);

  return (
    <div className="w-full flex justify-center items-center mx-auto h-[75vh]">
      <div
        id="errorbg"
        className="w-[80%] max-w-[960px] rounded-xl bg-orange-100 bg-opacity-75 h-[70vh] flex justify-evenly  items-center text-center text-3xl flex-col p-2"
      >
        <div className="flex flex-col items-center justify-evenly font-lato py-2 gap xs:text-lg lg:text-2xl">
          <div className="">
            {!promptError
              ? `This doesn't seem to be the right place to be.`
              : promptError}
            <br />
            {promptText ? promptText : `We'll get you BAX( back :) ) home.`}
          </div>
          {/* <img src={spinner.src} alt="spinner" className="" /> */}
          <LoadingPlantImage />
          <div className="animate-pulse-slow">
            Redirecting you to the correct place...
          </div>
        </div>
      </div>
    </div>
  );
}

// jsFunction(x y z)
