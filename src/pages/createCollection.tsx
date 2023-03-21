// import * as plantForm from "@/components/form";
import PlantForm from "@/components/createUniquePlantform";
import { useEffect, useState } from "react";
import CreateCollectionForm from "@/components/collectionForm";


export default function CreateCollectiondDisplay() {
  const [user, setUser] = useState<string>("4");

  return (
    <div>
      <CreateCollectionForm user={user} />
    </div>
  );
}
