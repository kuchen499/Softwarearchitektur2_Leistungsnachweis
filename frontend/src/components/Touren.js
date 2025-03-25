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
    Chip,
    TextField
} from '@mui/material';
import { CartContext } from './CartContext';

const Touren = ({ isDirector }) => {
    const [tours, setTours] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const { addItem } = useContext(CartContext);

    // Zustände für den Edit-Modus
    const [editingTourId, setEditingTourId] = useState(null);
    const [editedTour, setEditedTour] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/api/touren")
            .then(res => res.json())
            .then(data => setTours(data._embedded ? data._embedded.tour : data))
            .catch(console.error);
    }, []);

    const allAttrs = Array.from(new Set(tours.flatMap(t => t.attraktionen)));
    const filtered = tours.filter(t => selectedAttractions.every(a => t.attraktionen.includes(a)));
    const toggleAttr = a => setSelectedAttractions(prev =>
        prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );

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

    const handleEditClick = (tour) => {
        setEditingTourId(tour.id);
        setEditedTour(tour);
    };

    const handleSaveEdit = () => {
        fetch(`http://localhost:8080/api/touren/${editingTourId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedTour)
        })
            .then(res => res.json())
            .then(updatedTour => {
                setTours(prev => prev.map(t => t.id === editingTourId ? updatedTour : t));
                setEditingTourId(null);
            })
            .catch(console.error);
    };

    const handleDeleteTour = (id) => {
        fetch(`http://localhost:8080/api/touren/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    setTours(prev => prev.filter(t => t.id !== id));
                } else {
                    console.error("Löschen fehlgeschlagen");
                }
            })
            .catch(console.error);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Touren</Typography>
            <Grid container spacing={1} mb={3}>
                {allAttrs.map(attr => (
                    <Grid item key={attr}>
                        <Chip
                            label={attr}
                            variant={selectedAttractions.includes(attr) ? "filled" : "outlined"}
                            color={selectedAttractions.includes(attr) ? "primary" : "default"}
                            onClick={() => toggleAttr(attr)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={3}>
                {filtered.map(tour => (
                    <Grid item xs={12} sm={6} md={4} key={tour.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {editingTourId === tour.id ? (
                                <>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <TextField
                                            label="Name"
                                            value={editedTour.name}
                                            onChange={(e) =>
                                                setEditedTour({ ...editedTour, name: e.target.value })
                                            }
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Logo URL"
                                            value={editedTour.logo}
                                            onChange={(e) =>
                                                setEditedTour({ ...editedTour, logo: e.target.value })
                                            }
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Preis"
                                            value={editedTour.preis}
                                            onChange={(e) =>
                                                setEditedTour({ ...editedTour, preis: e.target.value })
                                            }
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Dauer"
                                            value={editedTour.dauer}
                                            onChange={(e) =>
                                                setEditedTour({ ...editedTour, dauer: e.target.value })
                                            }
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Beschreibung"
                                            value={editedTour.beschreibung}
                                            onChange={(e) =>
                                                setEditedTour({ ...editedTour, beschreibung: e.target.value })
                                            }
                                            fullWidth
                                            multiline
                                            margin="dense"
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={handleSaveEdit}>Speichern</Button>
                                        <Button size="small" onClick={() => setEditingTourId(null)}>Abbrechen</Button>
                                    </CardActions>
                                </>
                            ) : (
                                <>
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
                                        {isDirector && (
                                            <>
                                                <Button size="small" onClick={() => handleEditClick(tour)}>Bearbeiten</Button>
                                                <Button size="small" color="error" onClick={() => handleDeleteTour(tour.id)}>Löschen</Button>
                                            </>
                                        )}
                                    </CardActions>
                                </>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Touren;
