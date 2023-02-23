import { useEffect,useState } from "react"
type Plant = {   id: number,   common_name: string }
type PlantsIndex = {   id: number,   common_name: string }[]
type Page = number

function plantdex() {
    let [plantsIndex, setPlantsIndex] = useState([])
    let [page,setPage] = useState(1)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.target as HTMLButtonElement;
        setPage(Number(button.textContent));
    };  

    useEffect( () => {
        async function fetchData(){
            const res = await fetch(`data/page${page}.json`)
            const json = await res.json();
            setPlantsIndex(json.data);
            console.log(json)
        }
        fetchData();
    },[page]);

    const pageNumbers: number[] = [];
    for (let i = page - 3; i <= page + 3; i++) {
        if (i > 0 && i <= 200) {
        pageNumbers.push(i);
        }
    }

    const divStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'lightgreen',
    };

    return (
    <div>
        <ul>
        {plantsIndex.map((plant) => (<li key={plant.id}> 
            {plant.id} 
            {plant.scientific_name} 
            {plant.common_name}
            {plant.default_image && <img src={plant.default_image.thumbnail} alt={plant.common_name} /> }
        </li>))}
        </ul>
        {pageNumbers.map((pageNumber) => (
        <button style={divStyle} key={pageNumber} onClick={handleClick}>
            {pageNumber}
        </button>
        ))}
    </div>
    )
}

export default plantdex