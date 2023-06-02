import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import DeleteUniquePlantButton from "@/components/DeleteUniquePlantButton";
import { useRouter } from "next/router";
import UpdateDataComponent from "@/components/UpdatePlantDetailsComponentNew";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import s3 from "lib/aws";
import spinner from "public/images/spinner.svg";
import { SlPencil } from "react-icons/sl";
import { CSSTransition } from "react-transition-group";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface Plant {
  id: string;
  name: string;
  species: string;
  species2: string | null | undefined;
  water: string | null | undefined;
  light: string | null | undefined;
  plantHeight: string | null | undefined;
  plantWidth: string | null | undefined;
  description: string | null | undefined;
  image: string;
  userId: string;
}

type fieldName = keyof fieldState;

interface fieldState {
  name: boolean;
  species: boolean;
  species2: boolean;
  water: boolean;
  light: boolean;
  plantHeight: boolean;
  plantWidth: boolean;
  description: boolean;
  image: boolean;
}

interface plantInfoProps {
  plantInfo: Plant;
  userId: string;
}

interface MyObject {
  [key: string]: any;
}

export default function plantDisplay({ plant, userId }: any) {
  const plantData = plant;
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [editPhoto, setEditPhoto] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string | null>("");

  const onSubmitFromParent = () => {
    setShowForm(false);
    setActiveField("");
    // router.push(router.asPath);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setActiveField("");
  };

  useEffect(() => {
    if (userId !== plantData.ownedBy.id) {
      const redirectTimeout = setTimeout(() => {
        router.push("/myplants");
      }, 5000);
      return () => clearTimeout(redirectTimeout);
    }
  }, []);

  const [plantDataDisplay, setPlantData] = useState({
    id: plantData.id,
    name: plantData.name,
    species: plantData.species,
    species2: plantData.species2,
    water: plantData.water,
    light: plantData.light,
    plantHeight: plantData.plantHeight,
    plantWidth: plantData.plantWidth,
    description: plantData.description,
    image: plantData.image,
    ownedBy: plantData.ownedBy,
  });

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

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      console.log("no image selected");
      return;
    }

    const url = await uploadImage(image);
    setImageUrl(url);
    await updateImage({ plantData, userId }, url, reload);
    setEditPhoto(false);
    setUpload(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setUpload(true);
    } else if (e.target.files && e.target.files.length === 0) {
      setUpload(false);
    }
  };

  const EditPhoto = () => {
    console.log("clicked");
    setEditPhoto(true);
  };

  const handleClosePhotoUploadButton = (e: any) => {
    e.preventDefault();
    console.log("close photo upload button");
    setEditPhoto(false);
  };

  useEffect(() => {
    setPlantData(plantDataDisplay);
  }, [plantDataDisplay]);

  if (userId !== plantData.ownedBy.id) {
    return (
      <div className="w-full flex justify-center items-center mx-auto h-[75vh]">
        <div className="w-[80%] border-2 rounded-xl bg-orange-100 h-[70vh] flex justify-evenly  items-center text-center text-3xl flex-col">
          <p>
            This doesn't seem to be the right place to be. <br />
            We'll get you back to your plants.
          </p>
          <div className="flex flex-col items-center justify-evenly">
            <img src={spinner.src} alt="spinner" className="" />
            <div className="animate-pulse">
              Redirecting you to your plants...
            </div>
          </div>
        </div>
      </div>
    );
  }

  const reload = (response: any, field: string) => {
    setPlantData((prev) => {
      return { ...prev, [field]: response };
    });
  };

  function onDelete() {
    router.back();
  }

  const showChangeButton = (field: fieldName) => {
    const props = { field, userId, plantInfo: plantData };
  };

  const props = { userId, plantInfo: plantData };
  const showChangeButtonV2 = (field: fieldName) => {
    return (
      <button
        className=" border-green-500 rounded-md w-[25px] h-[25px] shadow-md bg-[#c1e1c1]  hover:bg-[#c1e1c183] text-slate-400 font-bold flex mx-auto my-auto justify-center items-center hover:shadow-lg hover:shadow-slate-300
      "
        onClick={() => {
          setShowForm(true);
          setActiveField(field);
        }}
      >
        <SlPencil />
      </button>
    );
  };

  const updatedDate = new Date(plantData.updatedAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <>
      <div className="m-5">
        <div className="bg-orange-100 bg-opacity-90 rounded-xl px-10 xs:pb-5 pt-5 flex flex-col md:pb-10 lg:pb-0 gap-1 w-full my-auto  ">
          <h1 className=" text-[#a0cfa0] flex items-center justify-center mb-2 xs:text-xl sm:text-2xl">
            {plantDataDisplay.name}'s information displayed below{" "}
          </h1>
          <div className="flex xs:flex-col md:flex-row gap-4  md:items-start items-center    ">
            <div className="relative  h-full pb-10">
              <img
                className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-xl cursor-pointer"
                src={plantDataDisplay.image}
                alt={plantDataDisplay.name}
                onClick={() => {
                  window.open(plantDataDisplay.image, "_blank");
                }}
              />
              <div
                className={`absolute right-0 bottom-5 bg-[#c1e1c1] hover:bg-[#c1e1c183] cursor-pointer shadow-lg font-semibold h-[30px] w-[60px] rounded-md  text-slate-400  text-center py-1 ${
                  !editPhoto ? "opacity-100" : "opacity-0"
                } `}
                onClick={EditPhoto}
              >
                Edit
              </div>
              {editPhoto && (
                <div className=" absolute -bottom-1 w-[300px] ">
                  <div className=" w-full absolute xs:-bottom-3 md:-bottom-3 lg:bottom-2 ">
                    <form
                      className=" flex items-start xs:flex-col lg:flex-row "
                      onSubmit={handleSubmitForm}
                    >
                      <div className="flex  ">
                        <label className="flex ">
                          <input
                            type="file"
                            className=" cursor-pointer truncate"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple={false}
                            Data-ButtonText="Select images"
                          />
                        </label>
                      </div>

                      <div className="flex flex-row gap-2 w-full ">
                        {upload && (
                          <button
                            onClick={() => handleClosePhotoUploadButton}
                            className="bg-[#c1e1c1] hover:bg-[#c1e1c183] cursor-pointer shadow-lg font-semibold h-[30px] w-[60px] rounded-md  text-white  text-center py-1  "
                            type="submit"
                          >
                            Upload
                          </button>
                        )}
                        <button
                          className="bg-red-400 hover:bg-red-500   cursor-pointer shadow-lg font-bold h-[30px] w-[60px] rounded-md  text-white  text-center py-1   "
                          onClick={handleClosePhotoUploadButton}
                        >
                          {" "}
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 h-full  border-cyan-300 rounded-2xl p-3 w-full">
              <div className="flex flex-row w-full">
                <div className="gap-1 flex">
                  {showChangeButtonV2("name")}
                  Name: <p className="font-light"> {plantDataDisplay.name}</p>
                </div>
              </div>
              <div className="flex">
                <div className="gap-1 flex">
                  {showChangeButtonV2("species")}
                  Species:{" "}
                  <p className="font-light"> {plantDataDisplay.species}</p>
                </div>
              </div>
              <div className="flex">
                <div className="gap-1 flex">
                  {showChangeButtonV2("species2")}
                  Secondary Species:{" "}
                  <p className="font-light">
                    {" "}
                    {plantDataDisplay.species2 || "None provided"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="gap-1 flex">
                  <div>{showChangeButtonV2("water")}</div>
                  Watering schedule:{" "}
                  <p className="font-light">
                    {" "}
                    {plantDataDisplay.water || "None provided"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="gap-1 flex">
                  <div>{showChangeButtonV2("light")}</div>
                  Sunlight:{" "}
                  <p className="font-light">
                    {" "}
                    {plantDataDisplay.light || "None provided"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="gap-1 flex">
                  <div>{showChangeButtonV2("plantHeight")}</div>
                  Height:{" "}
                  <p className="font-light">
                    {" "}
                    {(plantDataDisplay.plantHeight &&
                      plantDataDisplay.plantHeight + " cm") ||
                      "None provided"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="gap-1 flex">
                  <div>{showChangeButtonV2("plantWidth")}</div>
                  Width:{" "}
                  <p className="font-light">
                    {" "}
                    {(plantDataDisplay.plantWidth &&
                      plantDataDisplay.plantWidth + " cm") ||
                      "None provided"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div>{showChangeButtonV2("description")}</div>
                  <p className="text-left">Description:</p>
                </div>
                <div className="flex flex-col items-center justify-center pt-2">
                  <div className="border-slate-400 border rounded-xl w-[80%] p-2 font-extralight">
                    {plantDataDisplay.description ||
                      "None provided please add one"}
                  </div>
                </div>
              </div>
              <div className="w-inherit flex justify-between item-center">
                <div className="flex items-center hover:text-blue-600hover:underline">
                  {" "}
                  <Link
                    href={`/p/${plantDataDisplay.id}`}
                    className="text-blue-400 font-light"
                  >
                    Public view of {plantDataDisplay.name}
                  </Link>
                </div>
                <DeleteUniquePlantButton
                  uniquePlantId={plantDataDisplay.id}
                  user={userId}
                  objectName={plantDataDisplay.name}
                  onConfirm={onDelete}
                  liked={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CSSTransition
        in={showForm}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <div className="fixed top-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] z-40 right-0"></div>
      </CSSTransition>

      <CSSTransition
        in={showForm}
        timeout={600}
        classNames="page"
        unmountOnExit
        mountOnEnter
      >
        <UpdateDataComponent
          field={activeField || ""}
          userId={userId}
          plantInfo={plantData}
          onSubmit={onSubmitFromParent}
          onClose={handleOnClose}
        />
      </CSSTransition>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userId = (session.user as User).id;
  const plant = await prisma.uniquePlant.findUnique({
    where: {
      id: String(context.params.plantId),
    },
    include: {
      ownedBy: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      collectionsPartOf: true,
    },
  });

  return {
    props: {
      plant: JSON.parse(JSON.stringify(plant)),
      userId,
    },
  };
}

async function handleUpdate(
  field: fieldName,
  props: plantInfoProps,
  data: string,
  reload: any
) {
  const response = await fetch(`/api/uniqueplants/updateUniquePlantAPI`, {
    method: "PATCH",
    body: JSON.stringify({
      field: field,
      userId: props.userId,
      plantInfo: props.plantInfo,
      data: data,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error.message);
    toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#FECACA" },
    });
    return;
  } else {
    reload(data, field);
    toast.success("Updated Successfully", {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#C6F6D5" },
    });
    return await response.json();
  }
}

async function updateImage(props: any, data: string, reload2: any) {
  const response = await fetch(`/api/uniqueplants/updatePlantPicAPI`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: props.userId,
      plantInfo: props.plantData,
      image: data,
    }),
  });

  if (!response.ok) {
    console.log(response);
    return;
  } else {
    reload2(data, "image");
    return await response.json();
  }
}
