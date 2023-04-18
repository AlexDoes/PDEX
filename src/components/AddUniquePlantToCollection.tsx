export default function AddUniquePlantToCollection(props: any) {
  const usersPlants = props.usersPlants;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("yup");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select className="border-2" id="">
          {usersPlants.map((item: any) => (
            <option value={item.id} key={item.id}>
              {item.name + " " + item.id}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
