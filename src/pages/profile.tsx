import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import UpdateDataComponent from "@/components/UpdateFieldDialogBox";
import s3 from "lib/aws";
import { toast } from "react-toastify";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
  nickname: string;
  description: string | null | undefined;
}

interface userInfoProps {
  userInfo: User;
  userId: string;
}

type fieldName = keyof fieldState;

interface fieldState {
  nickname: boolean;
  email: boolean;
  name: boolean;
  image: boolean;
  description: boolean;
}

export default function ProfileDashboard({ userInfo, userId }: userInfoProps) {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [editPhoto, setEditPhoto] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

  const [fieldsChangeButton, setFieldsChangeButton] = useState<fieldState>({
    nickname: false,
    email: false,
    name: false,
    image: false,
    description: false,
  });

  const reload = () => {
    router.push(router.asPath);
  };

  const showChangeButton = (field: fieldName) => {
    const props = { field, userId, userInfo };
    return (
      <UpdateDataComponent
        field={field}
        userId={userId}
        userInfo={userInfo}
        onConfirm={(data: string) => handleUpdate(field, props, data, reload)}
      />
    );
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

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      console.log("no image selected");
      return;
    }

    const url = await uploadImage(image);
    setImageUrl(url);
    await updateImage({ userInfo, userId }, url, reload);
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

  console.log(editPhoto);
  return (
    <>
      <div className=" w-[85vw] md:w-[90vw] h-[7vh] justify-center flex mt-10">
        <div className="border-4 border-[#c1e1c1]  bg-gradient-to-b from-[#efefbb] to-slate-400 flex flex-col gap-14 items-center h-[1100px] w-[900px] rounded-lg ">
          <h1 className="text-4xl mt-5 font-bold text-slate-400 ">
            Profile Dashboard
          </h1>
          <div className="  flex flex-col justify-center items-center">
            <div className="h-full w-full flex flex-col justify-center items-center relative">
              <img
                className="h-64 w-64 w object-cover rounded-full  "
                src={
                  userInfo.image
                    ? userInfo.image
                    : "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=912&q=80"
                }
              />
              <div className="absolute bottom-2 mr-32 h-[30px] w-[60px]">
                <div
                  className="bg-[#c1e1c1] hover:bg-[#c1e1c183] cursor-pointer shadow-lg font-semibold h-[30px] w-[60px] rounded-md  text-slate-400  text-center py-1 "
                  onClick={EditPhoto}
                >
                  Edit
                </div>

                {editPhoto && (
                  <div className=" w-[99px]">
                    <form className=" " onSubmit={handleSubmitForm}>
                      <div className="flex flex-row ">
                        <label className="flex flex-row  ">
                          <input
                            type="file"
                            className=" cursor-pointer"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple={false}
                            Data-ButtonText="Select images"
                          />
                        </label>
                      </div>

                      <div className="flex flex-row gap-2 w-[200px]">
                        {upload && (
                          <button
                            onClick={() => handleClosePhotoUploadButton}
                            className="bg-[#c1e1c1] hover:bg-[#c1e1c183] cursor-pointer shadow-lg font-semibold h-[30px] w-[60px] rounded-md  text-slate-400  text-center py-1  "
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
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col  items-center w-[400px] md:w-[700px] flex-shrink transition-all duration-200 ease-in-out ">
            <label
              className="bg-[#efe6c1] rounded-md w-[80%] h-[40px] text-center item-center py-2 outline outline-white"
              htmlFor=""
            >
              Username:{" "}
              {userInfo.nickname ? userInfo.nickname : "<No Username Set>"}
            </label>
            <div>{showChangeButton("nickname")}</div>
          </div>
          <div className="flex flex-col items-center w-[400px] md:w-[700px] flex-shrink transition-all duration-200 ease-in-out ">
            <label
              className="bg-[#efe6c1] rounded-md w-[80%] h-[40px] text-center item-center py-2 outline outline-white"
              htmlFor=""
            >
              Email: {userInfo.email}
            </label>
            <div>{showChangeButton("email")}</div>
          </div>
          <div className="flex flex-col  items-center w-[400px] md:w-[700px] flex-shrink transition-all duration-200 ease-in-out ">
            <label
              className="bg-[#efe6c1]  rounded-md w-[80%] h-[40px] text-center item-center py-2 outline outline-white"
              htmlFor=""
            >
              Name: {userInfo.name ? userInfo.name : "<No Name Set>"}
            </label>
            <div>{showChangeButton("name")}</div>
          </div>
          <div className="flex flex-col  items-center w-[400px] md:w-[700px] flex-shrink transition-all duration-200 ease-in-out ">
            <p className="bg-[#efe6c1] rounded-md w-[80%] items-center py-2 outline px-5 outline-white">
              Description: {userInfo.description}{" "}
            </p>
            <div>{showChangeButton("description")}</div>
          </div>
        </div>
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
      },
    };
  }
  const userId = (session.user as User).id;
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      name: true,
      image: true,
      nickname: true,
      role: true,
      description: true,
    },
  });
  return {
    props: {
      userId,
      userInfo,
    },
  };
}

async function handleUpdate(
  field: fieldName,
  props: userInfoProps,
  data: string,
  reload: any
) {
  const response = await fetch(`/api/profile/updateProfileAPI`, {
    method: "PATCH",
    body: JSON.stringify({
      field: field,
      userId: props.userId,
      userInfo: props.userInfo,
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
    reload();
    toast.success("Updated Successfully", {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#C6F6D5" },
    });
    return await response.json();
  }
}

async function updateImage(props: userInfoProps, data: string, reload: any) {
  const response = await fetch(`/api/profile/updateProfilePicAPI`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: props.userId,
      userInfo: props.userInfo,
      image: data,
    }),
  });

  if (!response.ok) {
    console.log(response);
    return;
  } else {
    reload();
    return await response.json();
  }
}
