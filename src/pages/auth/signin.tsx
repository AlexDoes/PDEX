import { useEffect, useState } from "react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Redirect } from "next";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignupClick = () => {
    router.push("/auth/newuser");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const authenticate = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    if (authenticate?.error) {
      console.log(authenticate.error);
    } else {
      console.log("success");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/", redirect: false });
  };

  return (
    <div className=" bg-black text-[rgb(232,74,74)] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-red-500 flex flex-col w-[50%] justify-center items-center"
      >
        <div className="gap">
          <label className="flex flex-row border-yellow-200 border-2 justify-evenly">
            Email
            <input
              className="border-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-row border-orange-200 border-2 justify-evenly">
            Password
            <input
              className="border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          className="border-2 border-gray-700 bg-cyan-500 w-[50%]"
          type="submit"
        >
          Sign in with credentials
        </button>
        <button
          className="border-2 border-gray-500 bg-green-300 justify-center items-center"
          type="button"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
