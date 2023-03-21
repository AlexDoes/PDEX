import { NextApiRequest, NextApiResponse } from "next";

const sampleData = [
  {
    owner_id: 10,
    collection_name: "collection sample",
    collection_description: "this is a sample collection",
    collection_items: [
      {
        item_id: 1,
        item_unique_id: "sample-unique-id",
        item_name: "Hime",
        item_species: "Pink Princess",
        item_description: "This is a Pink Princess",
        item_image:
          "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14771%20Philodendron_Pink_Princess.jpg",
        item_sunlight: "full",
        item_water: "weekly",
        item_notes: "this is a sample note",
      },
    ],
  },
  {
    owner_id: 10,
    collection_name: "collection sample 2",
    collection_description: "this is a sample collection 2",
    collection_items: [
      {
        item_id: 1,
        item_unique_id: "sample-unique-id",
        item_name: "Jade",
        item_species: "White Jade Pineapple",
        item_description: "This is a white jade pineapple",
        item_image:
          "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14520%20Ananas%20White%20Jade%20Pineapple.jpg",
        item_sunlight: "full",
        item_water: "weekly",
        item_notes: "this is a sample note",
      },
    ],
  },
  {
    owner_id: 11,
    collection_name: "collection sample 3",
    collection_description: "this is a sample collection 3",
    collection_items: [
      {
        item_id: 1,
        item_unique_id: "sample-unique-id",
        item_name: "Red Regal Fern",
        item_species: "Fern",
        item_description: "This is a Red Regal Fern",
        item_image:
          "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14372%20Regal%20Red%20Fern.jpg",
        item_sunlight: "full",
        item_water: "weekly",
        item_notes: "this is a sample note",
      },
    ],
  },
  {
    owner_id: 10,
    collection_name: "collection sample 3",
    collection_description: "this is a sample collection 3",
    collection_items: [
      {
        item_id: 1,
        item_unique_id: "sample-unique-id",
        item_name: "Red Regal Fern",
        item_species: "Fern",
        item_description: "This is a Red Regal Fern",
        item_image:
          "https://www.cottagefarmsdirect.com/CFDImages/ProductImages/CFD14372%20Regal%20Red%20Fern.jpg",
        item_sunlight: "full",
        item_water: "weekly",
        item_notes: "this is a sample note",
      },
    ],
  },
];

type sampleData = {
  owner_id: number | string | string[] | undefined;
  collection_name: string;
  collection_description: string;
  collection_items: {
    item_id: number;
    item_unique_id: string;
    item_name: string;
    item_species: string;
    item_description: string;
    item_image: string;
    item_sunlight: string;
    item_water: string;
    item_notes: string;
  }[];
}[];

type Object = {
  owner_id: number | string | string[] | undefined;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { owner_id } = req.query;
  const filtered = sampleData.filter((p: any) => p.owner_id == owner_id);
  if (filtered.length > 0) {
    res.status(200).json(filtered);
  } else {
    res
      .status(404)
      .json({ message: `Owner with the id of ${owner_id} is not found` });
  }
};
