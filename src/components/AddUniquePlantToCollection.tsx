import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiFallingLeaf } from "react-icons/gi";

export default function AddUniquePlantToCollection(props: any) {
  const usersPlants = props.usersPlants;

  let plantsToBeAdded: string[] = [];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const plantData = {
      plants: plantsToBeAdded,
      collectionId: props.collectionId,
      userId: props.userId,
    };
    addPlantToCollection(plantData).then((data) => {
      console.log("triggered");
      console.log(plantsToBeAdded);
      props.onSubmit(plantsToBeAdded);
    });
  };

  const handleCheckboxChange = (e: any) => {
    const plantId = e.target.value;
    if (e.target.checked) {
      plantsToBeAdded.push(String(plantId));
    } else {
      plantsToBeAdded = plantsToBeAdded.filter(
        (plant: any) => plant !== plantId
      );
    }
  };

  return (
    <>
      <div className="fixed z-50 top-0 left-0 right-0 bottom-0 h-[100vh]  w-[100vw] flex justify-center items-center  ">
        <div className="gradient-bg-card2-reverse rounded-md md:w-[50%]   w-[80%] h-[50%]  max-w-[600px]  border-2 border-[#c1e1c1] p-2   ">
          <form
            onSubmit={handleSubmit}
            className="z-50  w-full  flex flex-col justify-center items-center gap-5 h-full "
          >
            <div
              onClick={props.onSubmit}
              className="absolute md:right-6 md:top-6 top-2 right-2 shadow-md rounded-full cursor-pointer"
            >
              <AiOutlineCloseCircle size={30} color="white" />
            </div>
            <h2 className=" sm:text-2xl text-1xl   top-0  mt-2 font-bold text-slate-500 pt-2">
              Add Plants to your Collection
            </h2>
            <div className="overflow-y-auto w-[90%] flex flex-col h-[80%] ml-3 mt-5  ">
              {usersPlants.map((plant: any) => {
                return (
                  <div
                    key={plant.id}
                    className="gap-2 flex items-center text-slate-500 font-semibold pl-1"
                  >
                    <input
                      type="checkbox"
                      id={plant.id}
                      name={plant.name}
                      value={plant.id}
                      defaultChecked={false}
                      onChange={handleCheckboxChange}
                      className="mr-2 rounded-full pl-2 "
                    />
                    <label htmlFor={plant.id}>{plant.name}</label>
                  </div>
                );
              })}
            </div>

            <button
              className=" bg-[#fffbcc] hover:border-sky-300 border rounded-md py-3  px-5 flex justify-center items-center gap-1 xs:text-2xl text-xl bg-opacity-90 hover:bg-opacity-810 border-red-300 hover:text-white
              ease-in-out duration-300
            hover:bg-green-300  text-[#ec9e69]
        "
              type="submit"
            >
              Add <GiFallingLeaf />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

async function addPlantToCollection(plantData: any) {
  const response = await fetch(
    "/api/collections/addUniquePlantToCollectionAPI",
    {
      method: "POST",
      body: JSON.stringify(plantData),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
