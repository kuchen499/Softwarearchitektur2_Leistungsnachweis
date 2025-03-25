import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Chip
} from '@mui/material';
import { CartContext } from './CartContext';

const Touren = ({ isDirector }) => {
    const [tours, setTours] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:8080/api/touren")
            .then(res => res.json())
            .then(data => setTours(data._embedded ? data._embedded.tour : data))
            .catch(console.error);
    }, []);

    const allAttrs = Array.from(new Set(tours.flatMap(t => t.attraktionen)));
    const filtered = tours.filter(t => selectedAttractions.every(a => t.attraktionen.includes(a)));
    const toggleAttr = a => setSelectedAttractions(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

    const handleAddTourToCart = (tour) => {
        const price = parseFloat(tour.preis.replace('€', '')) || 0;
        addItem({
            id: `tour-${tour.id}-${Date.now()}`,
            type: 'tour',
            quantity: 1,
            price,
            details: { tourName: tour.name }
        });
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Touren</Typography>
            <Grid container spacing={1} mb={3}>
                {allAttrs.map(attr => (
                    <Grid item key={attr}><Chip
                        label={attr}
                        variant={selectedAttractions.includes(attr) ? "filled" : "outlined"}
                        color={selectedAttractions.includes(attr) ? "primary" : "default"}
                        onClick={() => toggleAttr(attr)}
                    /></Grid>
                ))}
            </Grid>
            <Grid container spacing={3}>
                {filtered.map(tour => (
                    <Grid item xs={12} sm={6} md={4} key={tour.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={tour.logo}
                                alt={tour.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{tour.name}</Typography>
                                <Typography variant="subtitle2">Preis: {tour.preis}</Typography>
                                <Typography variant="body2">Attraktionen: {tour.attraktionen.join(', ')}</Typography>
                                <Typography variant="body2">Dauer: {tour.dauer}</Typography>
                                <Typography variant="body2" mt={1}>{tour.beschreibung}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleAddTourToCart(tour)}>In den Warenkorb</Button>
                                {isDirector && <Button size="small" color="error">Löschen</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Touren;
