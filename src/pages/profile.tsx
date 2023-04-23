import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import UpdateDataComponent from "@/components/UpdateFieldDialogBox";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
  nickname: string;
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
}

export default function ProfileDashboard({ userInfo, userId }: userInfoProps) {
  const router = useRouter();
  const [fieldsChangeButton, setFieldsChangeButton] = useState<fieldState>({
    nickname: false,
    email: false,
    name: false,
    image: false,
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

  return (
    <>
      <div className="border-4 border-green-900">
        <h1>Profile Dashboard</h1>
        <div className="flex border-red-400 border 2 justify-between">
          Username: {userInfo.nickname} {showChangeButton("nickname")}
        </div>
        <div className="flex border-red-400 border 2 justify-between">
          Email: {userInfo.email} {showChangeButton("email")}
        </div>
        <div className="flex border-red-400 border 2 justify-between">
          Name: {userInfo.name} {showChangeButton("name")}
        </div>
        <div>
          Image:
          <img
            className="h-40 w-40 object-cover"
            src={
              userInfo.image
                ? userInfo.image
                : "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=912&q=80"
            }
          />
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
        destination: "/login",
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
    console.log(response);
    return;
  } else {
    reload();
    return await response.json();
  }
}
