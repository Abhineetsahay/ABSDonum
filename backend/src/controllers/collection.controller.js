import Collection from "../models/collection.model.js";

export const createCollection = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const exists = await Collection.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Collection already exists" });
    }

    const imageUrl = req.file.path;

    const collection = await Collection.create({
      name,
      slug,
      image: imageUrl,
    });

    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create collection" });
  }
};

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch collections" });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    await collection.deleteOne();
    res.status(200).json({ message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete collection" });
  }
};
