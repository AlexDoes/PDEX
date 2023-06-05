import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

interface updateProps {
  field: string;
  userId: string;
  plantInfo: any;
  onSubmit: any;
  onClose: any;
  ref2: any;
}

const map: Myobject = {
  name: "name",
  species: "species",
  species2: "secondary Species",
  water: "watering Schedule",
  light: "sunlight requirements",
  plantHeight: "height",
  plantWidth: "width",
  description: "description",
  image: "Image",
};

interface Myobject {
  [key: string]: any;
}

export default function UpdateDataComponent({
  field,
  userId,
  plantInfo,
  onSubmit,
  onClose,
  ref2,
}: updateProps) {
  const handleSubmissionFromParent = onSubmit;
  const closeCollectionForm = onClose;

  const [textInputValue, setTextInputValue] = useState(
    `${plantInfo[field] !== null ? plantInfo[field] : ""}` || ""
  );

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInputValue(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = textInputValue;
    handleSubmissionFromParent(data);
  };

  return (
    <>
      <div
        ref={ref2}
        className="fixed z-50 top-0 left-0 right-0 bottom-0 h-[100vh]  w-[100vw] flex justify-center items-center  "
      >
        <div
          id="createuniqueplantform"
          className="gradient-bg-card2-reverse rounded-md md:w-[50%]   w-[80%] h-[50%]  max-w-[600px] border-[#c1e1c1] p-2  relative "
        >
          <div
            className={`absolute bottom-2 right-1 text-[#fffbcc] font-extralight text-xs ${
              field === "name" || field === "species" ? "hidden" : ""
            }`}
          >
            Update with an empty field to delete a value.
          </div>
          <div
            onClick={closeCollectionForm}
            className="absolute right-2 top-2 shadow-md rounded-full cursor-pointer"
          >
            <AiOutlineCloseCircle size={30} color="#C0C2C9" />
          </div>
          <form
            onSubmit={handleSubmit}
            className=" w-full flex flex-col justify-center items-center gap-3 h-full"
          >
            <div className="text-3xl top-0  mt-2 font-bold text-[#fffbcc] pt-2 text-center">
              Update {plantInfo.name}'s {map[field]}:
            </div>
            <input
              type={
                field === "plantHeight" || field === "plantWidth"
                  ? "number"
                  : "text"
              }
              placeholder={
                field === "plantHeight" || field === "plantWidth"
                  ? `Update ${map[field]} (cm)`
                  : `What would you like to update ${map[field]} to?`
              }
              className="w-[80%] h-[50px] rounded-md text-md border-[#c1e1c1] bg-[#efe6c1] border-none focus:outline-none focus:border-none focus:ring-0 focus:ring-transparent "
              value={textInputValue}
              minLength={3}
              onChange={handleTextInputChange}
            />
            <div className="w-full flex flex-row justify-center items-center gap-1">
              <button
                type="submit"
                className="hover:bg-green-300 border-sky-300 rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 text-[#ec9e69] hover:text-green-600 transition-all ease-in-out duration-300 bg-[#fffbcc]"
              >
                Update
              </button>
              <button
                onClick={closeCollectionForm}
                className="rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 text-[#ec8369] hover:text-[#e28a74] transition-all ease-in-out duration-300 bg-[#fccfb8] hover:bg-[#fcaeaa]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
