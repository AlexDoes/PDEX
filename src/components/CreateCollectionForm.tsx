import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaSeedling } from "react-icons/fa";
const colors = {
  //ansi color codes for console.log
  black: "\u001b[38;5;0m",
  gray: "\u001b[38;5;8m",
  darkGray: "\u001b[38;5;240m",
  lightGray: "\u001b[38;5;250m",
  white: "\u001b[38;5;7m",

  red: "\u001b[38;5;1m",
  brightRed: "\u001b[38;5;9m",

  green: "\u001b[38;5;2m",
  brightGreen: "\u001b[38;5;10m",

  yellow: "\u001b[38;5;3m",
  brightYellow: "\u001b[38;5;11m",

  blue: "\u001b[38;5;4m",
  brightBlue: "\u001b[38;5;12m",
  deepBlue: "\u001b[38;5;18m",

  magenta: "\u001b[38;5;5m",
  brightMagenta: "\u001b[38;5;13m",

  cyan: "\u001b[1;36m",
  brightCyan: "\u001b[38;5;14m",

  purple: "\u001b[38;5;93m",

  pink: "\u001b[38;5;206m",
  lightPink: "\u001b[38;5;225m",

  orange: "\u001b[38;5;208m",
  redOrange: "\u001b[38;5;202m",
  yellowOrange: "\u001b[38;5;214m",

  limeGreen: "\u001b[38;5;46m",
  greenYellow: "\u001b[38;5;154m",

  skyBlue: "\u001b[38;5;117m",
  lightBlue: "\u001b[38;5;111m",

  brown: "\u001b[38;5;130m",
  tan: "\u001b[38;5;180m",
  salmon: "\u001b[38;5;174m",

  coral: "\u001b[38;5;209m",
  olive: "\u001b[38;5;58m",
  reset: "\u001b[0m",
};

async function createCollection(collectionData: any) {
  const response = await fetch("/api/collections/createCollectionAPI", {
    method: "POST",
    body: JSON.stringify(collectionData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function CreateCollectionForm(data: any) {
  const [user, setUser] = useState<string>(data.user);
  const [collectionName, setCollectionName] = useState<string>("");
  const handleSubmissionFromParent = data.onSubmit;
  const closeCollectionForm = data.closeCollectionForm;
  useEffect(() => {
    if (data.user) {
      setUser(data.user);
    }
  }, [data.user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const newCollection = await createCollection({
        ownerId: user,
        name: collectionName,
      });
      toast.success(`${newCollection.name} created!`, {
        style: {
          background: "#e0f0e3",
          color: "#ffffff",
          textShadow: "0 0 0.5rem #000000",
        },
      });
      handleSubmissionFromParent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 h-[100vh]  w-[100vw] flex justify-center items-center  ">
      {/* <div className=" absolute w-[100vw] h-[100vh] bg-red-500 "></div> */}
      <div className="gradient-bg-card2-reverse rounded-md md:w-[50%] w-[80%] h-[50%]  max-w-[600px]  border-2 border-[#c1e1c1] p-2   ">
        <div
          onClick={closeCollectionForm}
          className="absolute right-6 top-6 shadow-md rounded-full cursor-pointer"
        >
          <AiOutlineCloseCircle size={30} color="#C0C2C9" />
        </div>
        <form
          onSubmit={handleSubmit}
          className=" w-full flex flex-col justify-center items-center gap-5 h-full"
        >
          <h2 className="text-3xl top-0  mt-2 font-bold text-slate-500 pt-2 text-center">
            What would you like to name your new collection?
          </h2>
          <input
            type="text"
            placeholder="Collection's Name"
            className="w-[80%] h-[50px] rounded-md border-2 border-[#c1e1c1] bg-[#efe6c1] "
            value={collectionName}
            minLength={3}
            onChange={(e) => setCollectionName(e.target.value)}
          />
          {/* //TODO: add a description field //TODO: add a privacy field */}
          {/* <button
            className="border h-[40px] border-green-500 rounded-md px-1 sm:px-5 py-1 shadow-lg bg-[#c1e1c1]  hover:bg-[#c1e1c183] text-black  sm:font-bold"
            type="submit"
          >
            Create{" "}
          </button> */}
          <button
            type="submit"
            className="bg-green-300 border-sky-300 border rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 hover:text-[#ec9e69]
            ease-in-out duration-300
          hover:bg-[#fffbcc]
        "
            //#fffbcc
            //#389168
            //#389168
            //#fffbcc
            //#ec9e69
          >
            Create <FaSeedling />
          </button>
        </form>
      </div>
    </div>
  );
}
