import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Avatar,
  Typography,
  Slide
} from '@mui/material';
import { LocalFlorist, CalendarToday, Opacity } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddPlantModal({ open, onClose, onAddPlant }) {
  const [plant, setPlant] = useState({
    name: '',
    wateringFrequency: 7,
    lastWatered: new Date().toISOString().split('T')[0],
    image: null
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPlant({ ...plant, image: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (plant.name.trim()) {
      onAddPlant(plant);
      setPlant({
        name: '',
        wateringFrequency: 7,
        lastWatered: new Date().toISOString().split('T')[0],
        image: null
      });
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <LocalFlorist color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h5">Agregar nueva planta</Typography>
      </DialogTitle>
      <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                src={plant.image}
                sx={{ width: 120, height: 120 }}
                variant="rounded"
                >
                <LocalFlorist sx={{ fontSize: 60 }} />
                </Avatar>
            </Grid>
            <Grid item xs={12}>
                <Button 
                variant="outlined" 
                component="label"
                fullWidth
                >
                Subir foto de la planta
                <input 
                    type="file" 
                    hidden 
                    accept="image/*" 
                    onChange={handleImageChange}
                />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Nombre de la planta"
                value={plant.name}
                onChange={(e) => setPlant({ ...plant, name: e.target.value })}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LocalFlorist color="action" />
                    </InputAdornment>
                    ),
                }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Frecuencia de regada"
                type="number"
                value={plant.wateringFrequency}
                onChange={(e) => setPlant({ ...plant, wateringFrequency: e.target.value })}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">día/s</InputAdornment>
                    ),
                    startAdornment: (
                    <InputAdornment position="start">
                        <Opacity color="action" />
                    </InputAdornment>
                    ),
                }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Última regada"
                type="date"
                value={plant.lastWatered}
                onChange={(e) => setPlant({ ...plant, lastWatered: e.target.value })}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <CalendarToday color="action" />
                    </InputAdornment>
                    ),
                }}
                />
            </Grid>
            </Grid>
        </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!plant.name.trim()}
        >
          Agregar planta
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPlantModal;