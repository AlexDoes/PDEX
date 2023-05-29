import { useEffect, useState } from "react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [noUser, setNoUser] = useState<any>("");
  const [wrongPassword, setWrongPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPassword2, setShowConfirmPassword2] = useState(false);
  const [toggleSignUpAndSignIn, setToggleSignUpAndSignIn] = useState(true);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (email.length < 1) {
      toast.error("Please enter an email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    const standardizedEmail = email.toLowerCase();
    await signUp({
      email: standardizedEmail,
      password: password,
    }).then((response) => {
      if (response.error) {
        toast.error(response.error);
      } else {
        signIn("credentials", {
          email: standardizedEmail,
          password: password,
          redirect: false,
          callbackUrl: "/",
        });
        toast.success("Welcome BAX (back) !");
      }
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNoUser("");
    setWrongPassword("");
    const standardizedEmail = email.toLowerCase();

    const authenticate = await signIn("credentials", {
      email: standardizedEmail,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    if (authenticate?.error) {
      const error = JSON.parse(authenticate.error);
      toast.error(error.message);
      switch (error.code) {
        case "NO_USER":
          setNoUser("No account is associated with this email");
          break;
        case "WRONG_PASSWORD":
          setWrongPassword("Wrong password combination");
          break;
        default:
          break;
      }
    } else {
      console.log("Successfully logged in");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const ShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignIn = (e: any) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/", redirect: false });
  };

  const handleGithubSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("github", {
        callbackUrl: "/",
        redirect: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpandSignInToggle = () => {
    setToggleSignUpAndSignIn(!toggleSignUpAndSignIn);
  };

  const style = "flex flex-col h-full  ";
  return (
    <div className={`flex flex-col h-[100vh] items-center justify-center `}>
      <div className=" fixed h-[100vh] w-full -z-20">
        <Image
          src="/loginPageBg.jpg"
          alt="Next.js logo"
          fill
          style={{ objectFit: "cover" }}
          priority={true} // this is for image optimization, it will load the image first before the page loads
        />
      </div>
      <div
        id="loginForm"
        // change rgba to < 1 for opaque and blur
        className=" flex flex-col border-white 
        bg-white bg-opacity-20 backdrop-filter backdrop-blur-xs
        min-w-[400px]  min-h-[650px] rounded-3xl justify-center items-center mt-[1vh]  "
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
                Sign Up for BAX to continue to All Applications.
              </p>
            )}
            {toggleSignUpAndSignIn && (
              <p className="text-[14px]">
                Log In to BAX to continue to All Applications.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col  h-full justify-center items-center w-[80%] min-h-[400px]">
          <form
            className="flex flex-col jusitfy-center items-center w-full h-full  "
            onSubmit={toggleSignUpAndSignIn ? handleSubmit : handleSignUp}
          >
            <div className="flex flex-col w-full gap-[14px]  ">
              {noUser && (
                <div className="text-red-500 font-thin"> {noUser} </div>
              )}
              <input
                className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace]  min-h-[52px] text-black"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />

              {wrongPassword && (
                <div className="text-red-500 font-thin"> {wrongPassword} </div>
              )}
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
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
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

              {toggleSignUpAndSignIn && (
                <span className="my-1">
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
              )}
              {!toggleSignUpAndSignIn && (
                <span className="my-1">
                  Have an Account?
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
              )}
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
              {/* <div className="flex pb-10 hidden">
                <button
                  className="pl-[16px] pr-[16px] w-full border-[1px] border-[#c9cace] min-h-[52px] text-black rounded-sm flex  items-center gap-2 shadow-md"
                  // type="submit"
                  onClick={handleGithubSignIn}
                >
                  <div className=" ">
                    <AiOutlineGithub size={25} />
                  </div>
                  {toggleSignUpAndSignIn ? "Continue" : "Sign Up"} with Github
                </button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

async function signUp(newUserData: any) {
  const response = await fetch("/api/account/signUpAPI", {
    method: "POST",
    body: JSON.stringify(newUserData),
  });

  if (!response.ok) {
    const error_message = await response.json().then((data) => {
      return data.message;
    });
    return { error: error_message };
  }
  return await response.json();
}
