import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";
import { useRouter } from "next/router";

async function checkProfileStatus(email: string) {
  const router = useRouter();
  const response = await fetch(`/api/profile/hasProfile?email=${email}`, {
    method: "GET",
  });
  if (response.ok) {
    router.push("/");
  }
}

export default function CreateProfileDisplay() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  const email = user?.email;
  const givenName = user?.given_name;
  const familyName = user?.family_name;
  console.log("hello");

  return (
    <div>
      <h1>Create Profile</h1>
    </div>
  );
}
