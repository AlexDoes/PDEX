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
    addPlantToCollection(plantData);
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
      <form onSubmit={handleSubmit}>
        {usersPlants.map((plant: any) => {
          return (
            <div key={plant.id}>
              <input
                type="checkbox"
                id={plant.id}
                name={plant.name}
                value={plant.id}
                defaultChecked={false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={plant.id}>{plant.name}</label>
            </div>
          );
        })}
        <button type="submit">Add</button>
      </form>
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
