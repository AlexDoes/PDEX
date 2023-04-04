import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function AuthButtonComponent() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        Email: {session.user.email} <br />
        Name:{" "}
        {
          session.user.name
          // ?.split(" ")[0]
        }{" "}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Link href={"/"}> Home </Link>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button> <br />
      <Link
        href={"/"}
        className=" border-4 border-cyan-500 text-3xl bg-red-500 font-serif  "
      >
        Home
      </Link>
    </>
  );
}
