import spinner from "public/images/spinner.svg";

export default function RedirectComponent() {
  return (
    <div className="w-full flex justify-center items-center mx-auto h-[75vh]">
      <div className="w-[80%] border-2 rounded-xl bg-orange-100 h-[70vh] flex justify-evenly  items-center text-center text-3xl flex-col">
        <div className="flex flex-col items-center justify-evenly">
          <p>
            This doesn't seem to be the right place to be. <br />
            We'll get you back to the home page.
          </p>
          <img src={spinner.src} alt="spinner" className="" />
          <div className="animate-pulse">
            Redirecting you to the correct place...
          </div>
        </div>
      </div>
    </div>
  );
}
