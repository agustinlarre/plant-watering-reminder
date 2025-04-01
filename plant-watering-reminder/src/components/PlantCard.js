import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Grow
} from '@mui/material';
import { Opacity, Delete } from '@mui/icons-material';

function PlantCard({ plant, onWater, onDelete }) {
  const daysSinceWatered = Math.floor((new Date() - new Date(plant.lastWatered)) / (1000 * 60 * 60 * 24));
  const needsWater = daysSinceWatered >= plant.wateringFrequency;

  return (
    <Grow in={true} timeout={500}>
        <Card>
        {plant.image && (
            <CardMedia
            component="img"
            height="160"
            image={plant.image}
            alt={plant.name}
            />
        )}
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h5" component="div">
                {plant.name}
            </Typography>
            {needsWater && (
                <Chip 
                label="Thirsty!" 
                color="error" 
                size="small"
                icon={<Opacity />}
                />
            )}
            </Box>
            <Typography variant="body2" color="text.secondary">
            Última regada: {new Date(plant.lastWatered).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Regar cada {plant.wateringFrequency} día/s
            </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
            <Button
            size="small"
            startIcon={<Opacity />}
            onClick={onWater}
            color={needsWater ? 'primary' : 'secondary'}
            variant={needsWater ? 'contained' : 'outlined'}
            >
            Regar
            </Button>
            <IconButton 
            aria-label="delete" 
            onClick={onDelete}
            color="error"
            >
            <Delete />
            </IconButton>
        </CardActions>
        </Card>
    </Grow>
  );
}

export default PlantCard;