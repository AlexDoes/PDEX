import { useEffect, useState } from "react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Redirect } from "next";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/", redirect: false });
  };
  const style = "flex flex-col h-full outline-dashed outline-8  outline-black";
  return (
    <div
      className={`flex flex-col h-[100vh] outline-dashed outline-8 justify-center items-center `}
    >
      <div className=" fixed h-[100vh] w-full -z-20">
        <Image
          src="/loginPageBg.avif"
          alt="Next.js logo"
          fill
          objectFit="cover"
        />
      </div>
      <div
        id="loginForm"
        className=" flex flex-col  bg-[rgb(255,255,255)] min-w-[400px]  min-h-[693px] rounded-3xl justify-center items-center   "
      >
        <div
          id="logo"
          className="flex justify-center flex-col items-center min-h-[213px]"
        >
          <div className="min-h-[149px] flex justify-center flex-col items-center min-w-[400px] w-[80%]">
            <div className="w-[52px] h-[52px] flex justify-center items-center rounded-md outline outline-slate-200  ">
              <Image
                src="/logotransparent.png"
                alt="Next.js logo"
                width={52}
                height={52}
                objectFit="cover"
              />
            </div>
            <h1 className="text-[1.5rem] w-full min-h-[36px] flex justify-center items-center mt-[24px] mb-[16px]">
              Welcome
            </h1>
            <p className="text-[14px]">
              Log in to Pdex to continue to All Applications.
            </p>
          </div>
        </div>
        <div className="flex flex-col border  h-full justify-center items-center w-[80%] min-h-[480px]">
          <form
            className="flex flex-col jusitfy-center items-center w-full h-full  "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full gap-[14px]  ">
              <input
                className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] mb-2 min-h-[52px] text-black"
                type="email"
                placeholder="Username or email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] min-h-[52px] text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  onClick={handleShowPassword}
                  className="pl-[4px] min-h-[50px] min-w-[43px] absolute right-0 top-0 flex justify-center items-center hover:bg-[#c9cace]  "
                >
                  {!showPassword && <BsEye size={20} color={"#020203"} />}
                  {showPassword && <BsEyeSlash size={20} color={"#020203"} />}
                </div>
              </div>
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
