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

    const divStyle2 = {
        padding : '10px',
        margin: '0 auto',
        width: '50%',
        font : '20px',
        backgroundColor: 'lightblue',
        fontSize : '30px',
        color: 'coral',
    }   

    return (
    <div style={divStyle2}>
        <ul>
        {plantsIndex.map((plant) => (<li key={plant.id}> 
            Plant ID: {plant.id} <br></br>
            Scientific name: {plant.scientific_name} <br></br>
            Common names: {plant.common_name} <br></br>
            {plant.other_name && <p>Other name :{plant.other_name.map(names => {return names})}</p>}     
            {plant.default_image && <img width='300px' height='50px' src={plant.default_image.thumbnail} alt={plant.common_name} /> } <br></br>
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