import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, TextField, Button } from '@mui/material';
import { CartContext } from './CartContext';

export default function Freizeitpark({ isDirector }) {
    const [parkData, setParkData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [adultTickets, setAdultTickets] = useState(0);
    const [childTickets, setChildTickets] = useState(0);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:8080/api/freizeitpark")
            .then(res => res.json())
            .then(setParkData)
            .catch(console.error);
    }, []);

    if (!parkData) return <Typography>Loading…</Typography>;

    const handleAddEntranceToCart = () => {
        const adultPrice = 20;
        const childPrice = 10;
        const totalAdults = Number(adultTickets) || 0;
        const totalChildren = Number(childTickets) || 0;
        const totalQuantity = totalAdults + totalChildren;
        const totalPrice = totalAdults * adultPrice + totalChildren * childPrice;

        addItem({
            id: `entrance-${Date.now()}`,
            type: 'entrance',
            quantity: 1,                        // immer 1 Item
            price: totalPrice,                  // Gesamtpreis für alle Tickets
            details: { adultTickets: totalAdults, childTickets: totalChildren }
        });
        setAdultTickets(0);
        setChildTickets(0);
    };

    const handleSave = () => {
        fetch("http://localhost:8080/api/freizeitpark", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parkData)
        })
            .then(res => res.json())
            .then(data => {
                setParkData(data);
                setEditMode(false);
            })
            .catch(console.error);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Freizeitpark Details</Typography>
            <Card sx={{ display: 'flex', mb: 4 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={parkData.logo}
                    alt="Park Logo"
                />
                <CardContent sx={{ flex: 1 }}>
                    {editMode ? (
                        <>
                            <TextField fullWidth label="Name" name="name" value={parkData.name} onChange={e => setParkData({ ...parkData, name: e.target.value })} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Adresse" name="adresse" value={parkData.adresse} onChange={e => setParkData({ ...parkData, adresse: e.target.value })} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Öffnungszeiten" name="oeffnungszeiten" value={parkData.oeffnungszeiten} onChange={e => setParkData({ ...parkData, oeffnungszeiten: e.target.value })} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Eintrittspreise" name="eintrittspreise" value={parkData.eintrittspreise} onChange={e => setParkData({ ...parkData, eintrittspreise: e.target.value })} sx={{ mb: 2 }} />
                            <TextField fullWidth multiline label="Beschreibung" name="beschreibung" value={parkData.beschreibung} onChange={e => setParkData({ ...parkData, beschreibung: e.target.value })} rows={4} />
                        </>
                    ) : (
                        <>
                            <Typography variant="h5">{parkData.name}</Typography>
                            <Typography><strong>Adresse:</strong> {parkData.adresse}</Typography>
                            <Typography><strong>Öffnungszeiten:</strong> {parkData.oeffnungszeiten}</Typography>
                            <Typography><strong>Eintrittspreise:</strong> {parkData.eintrittspreise}</Typography>
                            <Typography sx={{ mt: 2 }}>{parkData.beschreibung}</Typography>
                        </>
                    )}
                </CardContent>
                {isDirector && (
                    <CardActions sx={{ alignItems: 'flex-start', p: 2 }}>
                        <Button variant="outlined" onClick={() => setEditMode(!editMode)}>
                            {editMode ? "Abbrechen" : "Bearbeiten"}
                        </Button>
                        {editMode && (
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Speichern
                            </Button>
                        )}
                    </CardActions>
                )}
            </Card>

            {/* Ticket Purchase - VISIBLE FOR ALL USERS */}
            <Card sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Tickets kaufen</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Erwachsenentickets"
                            type="number"
                            fullWidth
                            value={adultTickets}
                            onChange={e => setAdultTickets(Math.max(0, +e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Kindertickets"
                            type="number"
                            fullWidth
                            value={childTickets}
                            onChange={e => setChildTickets(Math.max(0, +e.target.value))}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Gesamtpreis: {(adultTickets * 20 + childTickets * 10).toFixed(2)} €
                </Typography>
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleAddEntranceToCart}>
                    In den Warenkorb
                </Button>
            </Card>
        </Container>
    );
}
