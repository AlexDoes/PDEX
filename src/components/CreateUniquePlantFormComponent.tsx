import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import s3 from "lib/aws";
import { toTitleCase } from "lib/generalFunctions";
import prisma from "lib/prisma";
import NewSearchBar from "./NewSearchBar";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { forEach } from "lodash";
import filter from "./Filter";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface Fields {
  height: boolean;
  width: boolean;
  depth: boolean;
  subspecies: boolean;
}

interface FormInputs {
  singleErrorInput: string;
  ename: string;
}

type Inputs = {
  example: string | undefined;
  exampleRequired: string;
  plantName: string;
  plantImage: string;
  plantSpecies: string;
  plantSubspecies: string;
  plantHeight: string;
  plantWidth: string;
  plantDepth: string;
  plantWeight: string;
  plantDescription: string;
  unit: string;
  unit2: string;
  user: string;
  normalized_species: string;
  normalized_species2: string;
};

const errorsMap = {
  plantName: {
    maxLength: "Plant name is too long",
    minLength: "Plant name is too short",
    required: "Plant name is required",
    pattern: "Plant name is invalid, alphanumeric characters only",
  },
  plantImage: {
    required: "Plant image is required",
  },
  plantSpecies: {
    required: "Plant species is required, if it's unknown please enter unknown",
    pattern: "Plant species is invalid, alphanumeric characters only",
  },
  plantSubspecies: {
    pattern: "Plant subspecies is invalid, alphanumeric characters only",
  },
  plantHeight: {},
  plantWidth: {},
  plantDescription: {},
};

export default function CreateUniquePlant(props: any) {
  const speciesSet: Set<string> = new Set();
  props.data.forEach((plant: any) => {
    speciesSet.add(plant.species);
    if (plant.species2 !== null) {
      speciesSet.add(plant.species2);
    }
  });
  const speciesArray: string[] = Array.from(speciesSet.values());
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = props.userId;
  const onSubmitFunction = props.onSubmit;
  const [species, setSpecies] = useState<string>("");
  const [species2, setSpecies2] = useState<string>("");

  // // // // // // // // // // //
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const uploadImage = async (file: File): Promise<string> => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: file.name + Date.now(),
      Body: file,
      ContentType: file.type,
    };

    const { Location } = await s3.upload(params).promise();
    return Location;
  };
  // // // // // // // // // // //

  const [fields, setFields] = useState<Fields>({
    height: false,
    width: false,
    depth: false,
    subspecies: false,
  });

  const handleAddFieldClick = (fieldName: keyof Fields) => {
    setFields({ ...fields, [fieldName]: true });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const checkValidUser = async (id: string) => {
    const response = fetch(`/api/user/getUserAPI`, {
      body: JSON.stringify({ id }),
      method: "POST",
    });
    if ((await response).status !== 200) {
      return false;
    }
    return true;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    if (!image) {
      toast.error("Please upload an image", {
        style: {
          background: "#f8e0e0",
          color: "#ffffff",
          textShadow: "0 0 0.5rem #000000",
        },
      });
      return;
    }
    data.plantName = filter.clean(data.plantName);
    data.plantSpecies = toTitleCase(filter.clean(species));
    data.plantSubspecies = toTitleCase(species2 ? filter.clean(species2) : "");
    data.normalized_species = toTitleCase(data.plantSpecies);
    data.normalized_species2 = toTitleCase(species2);
    data.plantDescription = data.plantDescription
      ? filter.clean(data.plantDescription)
      : "";
    if (data.normalized_species === data.normalized_species2) {
      data.plantSubspecies = "";
      data.normalized_species2 = "";
    }
    data.user = userId;
    const res = await checkValidUser(data.user);
    if (!res) {
      toast.error(
        <div>
          Something went wrong, try refreshing or logging again.
          <br />
          If this persists, please contact us.
        </div>,
        {
          autoClose: 8000,
          style: {
            background: "#f8e0e0",
            color: "#ffffff",
            textShadow: "0 0 0.15rem #000000",
          },
        }
      );
      return;
    }
    const url = await uploadImage(image);
    // const url = "https://pdex.s3.amazonaws.com/0_3.png1682803498914";
    data.plantImage = url;
    await createTheUniquePlant(data).then((res) => {
      toast.success(`${data.plantName} created successfully!`, {
        style: {
          background: "#e0f0e3",
          color: "black",
        },
      });
      onSubmitFunction({ ...data, plantImage: url, id: res.id });
    });
  };

  const renderButton = (field: string) => {
    return (
      <button
        className="w-[160px] border-green-500 rounded-md px-1 sm:px-5 py-1 shadow-lg bg-[#c1e1c1]  hover:bg-[#c1e1c183] text-black  sm:font-semibold "
        onClick={() => handleAddFieldClick(field as keyof Fields)}
      >
        Add {field}
      </button>
    );
  };

  const handleChangeOnForm = (entry: string) => {
    setSpecies(entry);
  };

  const handleChangeOnForm2 = (entry: string) => {
    setSpecies2(entry);
  };

  return (
    <>
      <div
        ref={props.forwaredRef}
        // onClick={props.onSubmit}
        className=" z-50  bottom-0 top-0 fixed w-[90vw] flex items-center justify-center "
      >
        <form
          onSubmit={handleSubmit((values, e) => {
            onSubmit(values);
          })}
          className=" flex flex-col w-[80vw] sm:w-[60vw] transition-all ease-in-out duration-200 max-w-[1200px] h-[80vh] max-h-[750px] items-center 
         border-[#c1e1c1]  pb-7   rounded-lg gradient-bg-card2-reverse z-50
          "
          id="createuniqueplantform"
        >
          <div className="  h-[100%] w-[80%] flex flex-col justify-center gap-4 ">
            <div
              onClick={props.onClose}
              className="absolute right-6 top-6 shadow-md rounded-full cursor-pointer"
            >
              <AiOutlineCloseCircle size={30} color="white" />
            </div>
            <div className="w-full  flex justify-center relative text-center ">
              <h2 className="text-3xl   top-0  mt-2 font-semibold text-[#b8f0bbad] pt-2">
                Add a Plant
              </h2>
            </div>
            <div className="  border-white rounded-l-md   ">
              <input
                className=" w-full h-[40px] bg-[#efe6c1] pl-5 focus:bg-[#efe6c1d1] rounded-r-md"
                placeholder="Plant Name (required)"
                {...register("plantName", {
                  required: true,
                  pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
                  maxLength: 32,
                  minLength: 2,
                })}
              />
            </div>
            <div className="flex gap-5 items-center h-[40px]   border-white rounded-r-md  text-center bg-[#efe6c1] ">
              <label className="pl-4 text-slate-500">Image</label>
              <input
                type="file"
                placeholder="Plant Image (URL required)"
                onChange={handleImageChange}
                required
                // defaultValue={"https://plus.unsplash.com/premium_photo-1665653066799-acafe686fba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"}
              />
            </div>
            {/* plant species */}
            <div className="w-full border-blue">
              <NewSearchBar
                data={speciesArray}
                width="w-[20vw] "
                onChange={handleChangeOnForm}
                placeHolder="Plant Species (required)"
              />
            </div>

            <input
              placeholder="Plant Species (required)"
              ref={inputRef}
              value={species}
              readOnly
              required
              className="border border-red-500 hidden "
            />
            {fields.subspecies && (
              <>
                <input
                  placeholder="Plant's Secondary Species"
                  className="w-full h-[40px] bg-[#efe6c1]  pl-5  border-white rounded-r-md  outline-none hidden"
                  value={species2}
                  readOnly
                  {...register("plantSubspecies")}
                />
                <div className="w-full border-blue">
                  <NewSearchBar
                    data={speciesArray}
                    width="w-[20vw] "
                    onChange={handleChangeOnForm2}
                    placeHolder="Plant's Secondary Species"
                  />
                </div>
              </>
            )}
            {fields.height && (
              <div className="w-full flex">
                <input
                  className="w-full h-[40px] bg-[#efe6c1]  border-white rounded-r-md border-none"
                  type="number"
                  placeholder="Plant Height"
                  {...register("plantHeight", {
                    //   required: true,
                    min: { value: 0, message: "Height must be at least 0" },
                  })}
                  // defaultValue={Number(18)}
                />

                {errors && (
                  <p className="text-red-500">{errors.plantHeight?.message}</p>
                )}
              </div>
            )}
            <div>
              <div className="space-x-5 flex">
                {!fields.subspecies && renderButton("subspecies")}
                {!fields.height && renderButton("height")}
                {!fields.width && renderButton("width")}
              </div>
              {fields.width && (
                <div className="w-full flex">
                  <input
                    className="w-full h-[40px] bg-[#efe6c1] outline-none  border-white rounded-r-md border-none"
                    type="number"
                    placeholder="Plant Width"
                    {...register("plantWidth", {
                      //   required: true,
                      min: { value: 0, message: "Height must be at least 0" },
                    })}
                    // defaultValue={18}
                  />
                </div>
              )}
            </div>
            <textarea
              placeholder="Plant Description"
              {...register("plantDescription")}
              className=" pl-5 outline-none border-white h-[20%] rounded-b-md bg-[#efe6c1]"
            />
            <button
              className=" h-[40px] border-green-500 rounded-md px-1 sm:px-5 py-1 shadow-lg bg-[#c1e1c1]  hover:bg-[#c1e1c183] text-black  sm:font-semibold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const userId: string = (session.user as User).id;

  return {
    props: {
      userId,
    },
  };
}

async function createTheUniquePlant(uniquePlantData: any) {
  const response = await fetch("/api/uniqueplants/createUniquePlant", {
    method: "POST",
    body: JSON.stringify(uniquePlantData),
  });

  if (!response.ok) {
    console.log(response);
    return;
  }

  return await response.json();
}
