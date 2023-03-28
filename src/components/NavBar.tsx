import { useUser } from "@auth0/nextjs-auth0/client";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";

export default function NavBar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const whichButton = () => {
    if (user) {
      return (
        <div className="flex w-full gap-2">
          <LogOutButton />
        </div>
      );
    } else {
      return (
        <div className="flex w-full gap-2">
          <LogInButton />
        </div>
      );
    }
  };

  const dislayButton = whichButton();

  return (
    <div>
      <div>
        <button>
          <a href="/">Home</a>
        </button>
        <button>
          <a href="/myprofile">Profile</a>
        </button>
        {dislayButton}
      </div>
    </div>
  );
}
