// Simple database using localStorage
export const plantDB = {
    // Get all plants
    getAll: () => {
        const data = localStorage.getItem('plantData');
        if (!data) return { plants: [], maxId: 0 };
        return JSON.parse(data);
    },

    // Save the complete state
    _saveAll: (data) => {
        localStorage.setItem('plantData', JSON.stringify(data));
    },

    // Save a plant
    save: (plant) => {
        const data = plantDB.getAll();
        const newId = data.maxId + 1;
        const newPlant = { ...plant, id: newId };
        const newData = {
            plants: [...data.plants, newPlant],
            maxId: newId
        }
        plantDB._saveAll(newData)
        return newPlant;
    },

    // update a plant
    update: (id, updatedPlant) => {
        const data = plantDB.getAll();
        const index = data.plants.findIndex(p => p.id === id);
        if (index !== -1) {
            const newPlants = [...data.plants]
            newPlants[index] = updatedPlant;
            plantDB._saveAll({ ...data, plants: newPlants });
        }
    },

    // Delete a plant
    delete: (id) => {
        const data = plantDB.getAll();
        const newPlants = data.plants.filter(p => p.id !== id);
        plantDB._saveAll({ ...data, plants: newPlants });
    }
}