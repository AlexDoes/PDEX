// import * as plantForm from "@/components/form";
import PlantForm from "@/components/createUniquePlantform";
import { useEffect, useState } from "react";
import CreateCollectionForm from "@/components/collectionForm";
import { useSession } from "next-auth/react";
import prisma from "lib/prisma";
import Email from "next-auth/providers/email";

export default function CreateCollectiondDisplay() {
  const { data: session, status } = useSession();
  let name: string;
  let email: string;
  let id: string = "";

  if (session) {
    name = session.user.name || "";
    email = session.user.email || "";
    id = session.user.id || "";
  }

  const [user, setUser] = useState("");

  useEffect(() => {
    if (session) {
      setUser(id);
      console.log(user);
    }
  }, [session]);

  return (
    <div>
      <CreateCollectionForm user={user} />
    </div>
  );
}
