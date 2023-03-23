import { useEffect, useState, useContext, useRef } from "react";

// const sampleDate:Object[] = [
//     {
//         owner_id: 10,
//         collection_name: "collection sample",
//         collection_description: "this is a sample collection",
//         collection_items: [
//             {
//                 item_id: 1,
//                 item_unique_id: 'sample-unique-id',
//                 item_name: "Hime",
//                 item_species: 'Pink Princess',
//                 item_description: "This is a Pink Princess",
//                 item_image: "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14771%20Philodendron_Pink_Princess.jpg",
//                 item_sunlight: 'full',
//                 item_water: 'weekly',
//                 item_notes: 'this is a sample note',
//             }
//         ]
//     },
//     {
//         owner_id: 10,
//         collection_name: "collection sample 2",
//         collection_description: "this is a sample collection 2",
//         collection_items: [
//             {
//                 item_id: 1,
//                 item_unique_id: 'sample-unique-id',
//                 item_name: "Jade",
//                 item_species: 'White Jade Pineapple',
//                 item_description: "This is a white jade pineapple",
//                 item_image: "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14520%20Ananas%20White%20Jade%20Pineapple.jpg",
//                 item_sunlight: 'full',
//                 item_water: 'weekly',
//                 item_notes: 'this is a sample note',
//             }
//         ]
//     },
//     {
//         owner_id: 11,
//         collection_name: "collection sample 3",
//         collection_description: "this is a sample collection 3",
//         collection_items: [
//             {
//                 item_id: 1,
//                 item_unique_id: 'sample-unique-id',
//                 item_name: "Red Regal Fern",
//                 item_species: 'Fern',
//                 item_description: "This is a Red Regal Fern",
//                 item_image: "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14372%20Regal%20Red%20Fern.jpg",
//                 item_sunlight: 'full',
//                 item_water: 'weekly',
//                 item_notes: 'this is a sample note',
//             }
//         ]
//     },
//         {
//         owner_id: 10,
//         collection_name: "collection sample 3",
//         collection_description: "this is a sample collection 3",
//         collection_items: [
//             {
//                 item_id: 1,
//                 item_unique_id: 'sample-unique-id',
//                 item_name: "Red Regal Fern",
//                 item_species: 'Fern',
//                 item_description: "This is a Red Regal Fern",
//                 item_image: "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14372%20Regal%20Red%20Fern.jpg",
//                 item_sunlight: 'full',
//                 item_water: 'weekly',
//                 item_notes: 'this is a sample note',
//             }
//         ]
//     }
// ];
type Item = {
  item_id: number;
  item_name: string;
  item_description: string;
  item_species: string;
  item_sunlight: string;
  item_water: string;
  item_notes: string;
  item_image: string;
};

type Collection = {
  owner_id: number;
  collection_name: string;
  collection_description: string;
  collection_items: Item[];
};

function myCollection() {
  const [user, setUser] = useState<number>(10);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/collections?owner_id=${user}`)
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
      });
  }, []);

  return (
    <div>
      <h1>My Collection</h1>
      <div>
        {collections.map((collection) => {
          return (
            collection.owner_id === user && (
              <div key={collection["collection_name"]}>
                <h2>{collection.collection_name}</h2>
                <p>{collection.collection_description}</p>
                <ul>
                  {collection.collection_items.map((item) => (
                    <li key={item.item_id}>
                      <h1> Name: {item.item_name}</h1>
                      <p>Description: {item.item_description}</p>
                      <p> Species: {item.item_species}</p>
                      <p> Sunlight: {item.item_sunlight}</p>
                      <p> Water: {item.item_water}</p>
                      <p> Notes: {item.item_notes}</p>
                      <img src={item.item_image} alt={item.item_name} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default myCollection;
