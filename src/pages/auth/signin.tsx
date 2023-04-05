import { useEffect, useState } from "react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Redirect } from "next";
import Image from "next/image";

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
    <div className="overflow-hidden">
      <div className=" fixed h-full w-full -z-20">
        <Image
          src="/loginPageBg.avif"
          alt="Next.js logo"
          fill
          objectFit="cover"
        />
      </div>
      <div id="loginForm" className="border border-green-500 ">
        <div id="logo">
          <Image src="/logotransparent.png" alt="Next.js logo" width={200} height={200} />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Sign in with credentials</button>
            <button type="button" onClick={handleGoogleSignIn}>
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
