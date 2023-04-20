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
    required: "Plant species is required",
  },
  plantSubspecies: {},
  plantHeight: {},
  plantWidth: {},
  plantDescription: {},
};

export default function CreateUniquePlant(props: any) {
  const userId = props.userId;
  const onSubmitFunction = props.onSubmit;

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.user = userId;
    createTheUniquePlant(data).then((res) => {
      onSubmitFunction();
    });
  };

  const renderButton = (field: string) => {
    return (
      <button
        className="border-2 border-red-500 w-40"
        onClick={() => handleAddFieldClick(field as keyof Fields)}
      >
        Add {field}
      </button>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((values, e) => {
          onSubmit(values);
        })}
        className="flex flex-col w-[600px] 
        border-2 border-sky-500
        gap-1
        "
      >
        <input
          className="outline-dotted outline-2 outline-blue-500"
          placeholder="Plant Name (required)"
          {...register("plantName", {
            required: true,
            pattern: /^[A-Za-z0-9]+$/,
            maxLength: 32,
            minLength: 2,
          })}
        />
        <p className="text-red-500">
          {errors.plantName?.type &&
            ({ ...errorsMap.plantName } as any)[errors.plantName.type]}
        </p>

        <input
          placeholder="Plant Image (URL required)"
          {...register("plantImage")}
          defaultValue={
            "https://plus.unsplash.com/premium_photo-1665653066799-acafe686fba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          }
        />

        <input
          placeholder="Plant Species"
          {...register("plantSpecies", {
            required: true,
          })}
          //   defaultValue={"Plant Species"}
        />

        {fields.subspecies && (
          <input
            placeholder="Plant Subspecies"
            {...register("plantSubspecies")}
          />
        )}

        {fields.height && (
          <div>
            <input
              type="number"
              placeholder="Plant Height"
              {...register("plantHeight", {
                //   required: true,
                min: { value: 0, message: "Height must be at least 0" },
              })}
              // defaultValue={Number(18)}
            />
            <select id="unit" className="border-2" {...register("unit")}>
              <option value="cm">cm</option>
              <option value="inches">in</option>
            </select>
            {errors && (
              <p className="text-red-500">{errors.plantHeight?.message}</p>
            )}
          </div>
        )}
        {!fields.height && renderButton("height")}
        {!fields.subspecies && renderButton("subspecies")}
        {!fields.width && renderButton("width")}
        {fields.width && (
          <div>
            <input
              placeholder="Plant Width"
              {...register("plantWidth", {
                //   required: true,
                min: { value: 0, message: "Height must be at least 0" },
              })}
              // defaultValue={18}
            />
            <select id="unit" className="border-2" {...register("unit2")}>
              <option value="cm">cm</option>
              <option value="inches">in</option>
            </select>
          </div>
        )}

        <textarea
          placeholder="Plant Description"
          {...register("plantDescription")}
          className="border-2"
          //   defaultValue={"Testing purposes only"}
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

  alert("Plant Created!");
  return await response.json();
}