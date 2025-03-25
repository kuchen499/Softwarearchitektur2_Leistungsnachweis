import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, Card, CardMedia,
    CardContent, CardActions, Button
} from '@mui/material';

const Touren = ({ isDirector }) => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/touren")
            .then(res => res.json())
            .then(setTours)
            .catch(console.error);
    }, []);

    const deleteTour = async (id) => {
        await fetch(`http://localhost:8080/api/touren/${id}`, { method: 'DELETE' });
        setTours(tours.filter(t => t.id !== id));
    };

    const editTour = async (tour) => {
        const name = prompt("Neuer Name:", tour.name);
        if (name === null) return;
        const logo = prompt("Neues Logo (URL):", tour.logo);
        if (logo === null) return;
        const preis = prompt("Neuer Preis:", tour.preis);
        if (preis === null) return;
        const attrs = prompt("Neue Attraktionen (kommagetrennt):", tour.attraktionen.join(","));
        const attrList = attrs === null ? tour.attraktionen : attrs.split(",").map(x => x.trim());
        const dauer = prompt("Neue Dauer:", tour.dauer);
        if (dauer === null) return;
        const startZeit = prompt("Neue Startzeit:", tour.startZeit);
        if (startZeit === null) return;
        const endZeit = prompt("Neue Endzeit:", tour.endZeit);
        if (endZeit === null) return;
        const beschreibung = prompt("Neue Beschreibung:", tour.beschreibung);
        if (beschreibung === null) return;

        const updated = {
            ...tour,
            name,
            logo,
            preis,
            attraktionen: attrList,
            dauer,
            startZeit,
            endZeit,
            beschreibung
        };

        const res = await fetch(`http://localhost:8080/api/touren/${tour.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        const data = await res.json();
        setTours(tours.map(t => t.id === data.id ? data : t));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Touren</Typography>
            <Grid container spacing={3}>
                {tours.map(tour => (
                    <Grid item xs={12} sm={6} md={4} key={tour.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={tour.logo}
                                alt={tour.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{tour.name}</Typography>
                                <Typography variant="subtitle2">Preis: {tour.preis}</Typography>
                                <Typography variant="body2">Attraktionen: {tour.attraktionen.join(", ")}</Typography>
                                <Typography variant="body2">Dauer: {tour.dauer}</Typography>
                                <Typography variant="body2">Startzeit: {tour.startZeit} – Endzeit: {tour.endZeit}</Typography>
                                <Typography variant="body2" mt={1}>{tour.beschreibung}</Typography>
                            </CardContent>
                            {isDirector && (
                                <CardActions>
                                    <Button size="small" onClick={() => editTour(tour)}>Bearbeiten</Button>
                                    <Button size="small" color="error" onClick={() => deleteTour(tour.id)}>Löschen</Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Touren;
