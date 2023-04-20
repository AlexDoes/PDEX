import { useEffect, useState } from "react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Redirect } from "next";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toggleSignUpAndSignIn, setToggleSignUpAndSignIn] = useState(false);

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

  const ShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/", redirect: false });
  };

  const handleSignUpandSignInToggle = () => {
    setToggleSignUpAndSignIn(!toggleSignUpAndSignIn);
  };

  const style = "flex flex-col h-full  ";
  return (
    <div className={`flex flex-col h-[100vh] items-center border  `}>
      <div className=" fixed h-[100vh] w-full -z-20">
        <Image
          src="/loginPageBg.avif"
          alt="Next.js logo"
          fill
          style={{ objectFit: "cover" }}
          priority={true} // this is for image optimization, it will load the image first before the page loads
        />
      </div>
      <div
        id="loginForm"
        className=" flex flex-col  bg-[rgb(255,255,255)] min-w-[400px]  min-h-[693px] rounded-3xl justify-center items-center mt-[20vh] mb-[20vh] "
      >
        <div
          id="logo"
          className="flex justify-center flex-col items-center min-h-[213px]"
        >
          <div className="min-h-[149px] flex justify-center flex-col items-center min-w-[400px] w-[80%]">
            <div className="w-[52px] h-[52px] flex justify-center items-center rounded-md   ">
              <Image
                src="/logotransparent.png"
                alt="Next.js logo"
                width={52}
                height={52}
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
            <h1 className="text-[1.5rem] w-full min-h-[36px] flex justify-center items-center mt-[24px] mb-[16px]">
              Welcome
            </h1>

            {!toggleSignUpAndSignIn && (
              <p className="text-[14px]">
                Sign Up to Pdex to continue to All Applications.
              </p>
            )}
            {toggleSignUpAndSignIn && (
              <p className="text-[14px]">
                Log In to Pdex to continue to All Applications.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col  h-full justify-center items-center w-[80%] min-h-[480px]">
          <form
            className="flex flex-col jusitfy-center items-center w-full h-full  "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full gap-[14px]  ">
              <input
                className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace]  min-h-[52px] text-black"
                type="email"
                placeholder="Username or email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />

              <div className="relative">
                <input
                  className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] min-h-[52px] text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                />
                <div
                  onClick={handleShowPassword}
                  className="pl-[4px] min-h-[50px] min-w-[43px] absolute right-0 top-0 flex justify-center items-center hover:bg-[#c9cace]  "
                >
                  {!showPassword && <BsEye size={20} color={"#020203"} />}
                  {showPassword && <BsEyeSlash size={20} color={"#020203"} />}
                </div>
              </div>

              {!toggleSignUpAndSignIn && (
                <div className="relative">
                  <input
                    className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] min-h-[52px] text-black"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                  />
                  <div
                    onClick={ShowConfirmPassword}
                    className="pl-[4px] min-h-[50px] min-w-[43px] absolute right-0 top-0 flex justify-center items-center hover:bg-[#c9cace]  "
                  >
                    {!showConfirmPassword && (
                      <BsEye size={20} color={"#020203"} />
                    )}
                    {showConfirmPassword && (
                      <BsEyeSlash size={20} color={"#020203"} />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-col gap-4 mt-5">
              {toggleSignUpAndSignIn && (
                <span className="text-[#635dff] font-semibold">
                  Forgot password?
                </span>
              )}

              <button
                className="bg-[#635dff] min-h-[52px] w-full text-white rounded-sm shadow-md "
                type="submit"
              >
                Continue
              </button>

              <span>
                Don't have an account?
                {toggleSignUpAndSignIn ? (
                  <span
                    className="text-blue-500 font-semibold underline cursor-pointer ml-1"
                    onClick={handleSignUpandSignInToggle}
                  >
                    Sign Up
                  </span>
                ) : (
                  <span
                    className="text-blue-500 font-semibold underline cursor-pointer ml-1"
                    onClick={handleSignUpandSignInToggle}
                  >
                    Sign In
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center ">
              <div className="flex-grow h-[.5px] w-full bg-gray-400"></div>

              <span className="flex-shrink  text-gray-500 p-2">OR</span>

              <div className="flex-grow h-[.5px] w-[280px] bg-gray-400"></div>
            </div>
            <div className="w-full flex flex-col gap-1 mt-2">
              <div className="flex shadow-md">
                <button
                  className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] min-h-[52px] text-black rounded-sm flex  items-center gap-2"
                  // type="submit"
                  onClick={handleGoogleSignIn}
                >
                  <div>
                    <FcGoogle size={25} />
                  </div>
                  {toggleSignUpAndSignIn ? "Continue" : "Sign Up"} with Google
                </button>
              </div>
              <div className="flex pb-10">
                <button
                  className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] min-h-[52px] text-black rounded-sm flex  items-center gap-2 shadow-md"
                  // type="submit"
                >
                  <div className=" ">
                    <AiOutlineGithub size={25} />
                  </div>
                  {toggleSignUpAndSignIn ? "Continue" : "Sign Up"} with Github
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
