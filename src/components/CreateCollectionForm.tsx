import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
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
    <div className="fixed z-50 top-0 h-[400px]  w-[100vw] border border-red-50  flex justify-end">
      {/* <div className=" absolute w-[100vw] h-[100vh] bg-red-500 "></div> */}
      <div className="bg-gray-500 w-[50%] border">
        <form onSubmit={handleSubmit}>
          <label>
            Collection Name:
            <input
              type="text"
              style={{ border: "1px solid black" }}
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </label>
          {/* //TODO: add a description field //TODO: add a privacy field */}
          <button className="text-white" type="submit">
            Submit{" "}
          </button>
        </form>
        <button onClick={closeCollectionForm} className="text-white ml-1">
          Cancel
        </button>
      </div>
    </div>
  );
}
