import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper
} from '@mui/material';
import { LocalFlorist, Add } from '@mui/icons-material';
import theme from './theme';
import PlantCard from './components/PlantCard';
import AddPlantModal from './components/AddPlantModal';
import CongratulationsPopup from './components/CongratulationsPopup';
import DeleteConfirmation from './components/DeleteConfirmation';
import PlantsImg from './assets/images/Plants.png';
import { plantDB } from './db';
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [wateredPlantName, setWateredPlantName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);

  // Load plants on initial render
  useEffect(() => {
    const loadedPlants = plantDB.getAll().plants || [];
    setPlants(loadedPlants);
  }, []);

  // Notification setup
  useEffect(() => {
    const checkWateringNeeds = () => {
      plants.forEach(plant => {
        const daysSinceWatered = Math.floor((new Date() - new Date(plant.lastWatered)) / (1000 * 60 * 60 * 24));
        if (daysSinceWatered >= plant.wateringFrequency) {
          if (Notification.permission === 'granted') {
            new Notification(`Es hora de regar ${plant.name}!`, {
              body: `Han pasado ${plant.wateringFrequency} día/s desde que regaste ${plant.name}.`
            });
          }
        }
      });
    };

    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    const interval = setInterval(checkWateringNeeds, 60 * 60 * 1000);
    checkWateringNeeds();

    return () => clearInterval(interval);
  }, [plants]);

  const waterPlant = (id) => {
    const updatedPlants = plants.map(plant => {
      if (plant.id === id) {
        return { 
          ...plant, 
          lastWatered: new Date().toISOString().split('T')[0] 
        };
      }
      return plant;
    });
    plantDB.update(id, updatedPlants.find(p => p.id === id));
    setPlants(updatedPlants);
    setWateredPlantName(updatedPlants.find(p => p.id === id).name);
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 5000);
  };

  const deletePlant = (id) => {
    setPlantToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    plantDB.delete(plantToDelete);
    setPlants(plantDB.getAll().plants);
    setShowDeleteModal(false);
    setPlantToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPlantToDelete(null);
  };

  const handleAddPlant = (newPlant) => {
    const savedPlant = plantDB.save(newPlant);
    setPlants(plantDB.getAll().plants);
    setShowAddModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${PlantsImg})`,
          backgroundSize: '600px 300px',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'repeat',
        }}
      >
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <LocalFlorist sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Recordatorio de regada de plantas
            </Typography>
            <Button 
              color="inherit" 
              startIcon={<Add />}
              onClick={() => setShowAddModal(true)}
            >
              Agregar nueva planta
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
          {plants.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                No tienes plantas aún
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Preparate para agregar tu primer planta!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setShowAddModal(true)}
              >
                Agregar planta
              </Button>
            </Paper>
          ) : (
            <Box sx={{ display: 'grid', gap: 3 }}>
              {plants.map((plant) => (
                <PlantCard 
                  key={plant.id}
                  plant={plant} 
                  onWater={() => waterPlant(plant.id)}
                  onDelete={() => deletePlant(plant.id)}
                />
              ))}
            </Box>
          )}
        </Container>

        <AddPlantModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddPlant={handleAddPlant}
        />
      
        {showCongrats && (
          <CongratulationsPopup 
            plantName={wateredPlantName}
            onClose={() => setShowCongrats(false)}
          />
        )}

        {showDeleteModal && plantToDelete !== null && (
          <DeleteConfirmation
            plantName={plants.find(p => p.id === plantToDelete)?.name || ''}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;