import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function ProfileDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("api/auth/signin");
  }

  return (
    <>
      <h1>Profile Dashboard</h1>
    </>
  );
}
