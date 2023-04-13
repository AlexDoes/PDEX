import { useEffect } from "react";
import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface FormInputs {
  singleErrorInput: string;
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
};

export default function CreateUniquePlant(props: any) {
  const userId = props.userId;
  const onSubmitFunction = props.onSubmit;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.user = userId;
    createTheUniquePlant(data).then((res) => {
      onSubmitFunction();
    });
  };

  return (
    <>
      <ErrorMessage errors={errors} name="singleErrorInput" />

      <ErrorMessage
        errors={errors}
        name="singleErrorInput"
        render={({ message }) => <p>{message}</p>}
      />
      <form
        onSubmit={handleSubmit((values, e) => {
          onSubmit(values);
        })}
        className="flex flex-col"
      >
        <input
          placeholder="Plant Name"
          {...register("plantName", {
            required: true,
            maxLength: 32,
            minLength: 2,
          })}
          defaultValue={"Plant Name"}
        />
        <input
          placeholder="Plant Image"
          {...register("plantImage")}
          defaultValue={
            "https://plus.unsplash.com/premium_photo-1665653066799-acafe686fba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          }
        />
        <input
          placeholder="Plant Species"
          {...register("plantSpecies")}
          defaultValue={"Plant Species"}
        />
        <input
          placeholder="Plant Subspecies"
          {...register("plantSubspecies")}
          defaultValue={"Plant Subspecies"}
        />
        <div>
          <input
            placeholder="Plant Height"
            {...register("plantHeight")}
            defaultValue={"18"}
          />
          <select id="unit" className="border-2" {...register("unit")}>
            <option value="inches">in</option>
            <option value="cm">cm</option>
          </select>
        </div>
        <div>
          <input
            placeholder="Plant Width"
            {...register("plantWidth")}
            defaultValue={"18"}
          />
          <select id="unit" className="border-2" {...register("unit2")}>
            <option value="inches">in</option>
            <option value="cm">cm</option>
          </select>
        </div>
        <textarea
          placeholder="Plant Description"
          {...register("plantDescription")}
          className="border-2"
          defaultValue={"Testing purposes only"}
        />
        <button type="submit">Submit</button>
      </form>
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
    throw new Error(response.statusText);
  }

  return await response.json();
}
