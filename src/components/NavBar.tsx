import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { toTitleCase } from "generalFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

export default function NavBar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const whichButton = () => {
    console.log("user: ", user);
    if (isAuthenticated) {
      return (
        <>
          <LogOutButton />
        </>
      );
    } else {
      return (
        <>
          <LogInButton />
        </>
      );
    }
  };
  const dislayButton = whichButton();

  return (
    <>
      <div className="flex w-full gap-2">
        <Link
          className="w-20 h-12 border-2 border-red-400 flex justify-center items-center"
          href="/"
        >
          Home
        </Link>

        {user && (
          <Link
            className="h-12 outline outline-orange-400 flex justify-center items-center"
            href="/myprofile"
          >
            {toTitleCase(user?.nickname || "Your")}'s Profile
          </Link>
        )}
        {dislayButton}
      </div>
    </>
  );
}
