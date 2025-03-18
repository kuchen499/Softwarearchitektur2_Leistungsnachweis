import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { CartContext } from './CartContext';

const Freizeitpark = ({ isDirector }) => {
    const [parkData, setParkData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [adultTickets, setAdultTickets] = useState(0);
    const [childTickets, setChildTickets] = useState(0);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:8080/api/freizeitpark")
            .then(response => response.json())
            .then(data => setParkData(data))
            .catch(error => console.error("Error fetching park data:", error));
    }, []);

    if (!parkData) return <div>Loading Freizeitpark-Daten...</div>;

    const handleAddEntranceToCart = () => {
        const priceAdult = 20; // Beispielpreis für Erwachsenenticket
        const priceChild = 10; // Beispielpreis für Kinderticket
        addItem({
            id: `entrance-${Date.now()}`,
            type: 'entrance',
            quantity: adultTickets + childTickets,
            price: (adultTickets * priceAdult + childTickets * priceChild) / (adultTickets + childTickets || 1),
            details: { adultTickets, childTickets }
        });
        setAdultTickets(0);
        setChildTickets(0);
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            {/* Hier folgt dein bestehender Freizeitpark-Inhalt (Logo, Name, Adresse, etc.) */}
            <Typography variant="h4" gutterBottom>Freizeitpark Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={parkData.logo} alt="Logo" style={{ maxWidth: "150px" }} />
                </Grid>
                {/* Weitere Felder (Name, Adresse, Öffnungszeiten, Eintrittspreise, Beschreibung) */}
                <Grid item xs={12}>
                    {editMode ? (
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={parkData.name}
                            onChange={(e) => setParkData({ ...parkData, name: e.target.value })}
                        />
                    ) : (
                        <Typography variant="h5">{parkData.name}</Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {editMode ? (
                        <TextField
                            fullWidth
                            label="Adresse"
                            name="adresse"
                            value={parkData.adresse}
                            onChange={(e) => setParkData({ ...parkData, adresse: e.target.value })}
                        />
                    ) : (
                        <Typography variant="body1"><strong>Adresse:</strong> {parkData.adresse}</Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {editMode ? (
                        <TextField
                            fullWidth
                            label="Öffnungszeiten"
                            name="oeffnungszeiten"
                            value={parkData.oeffnungszeiten}
                            onChange={(e) => setParkData({ ...parkData, oeffnungszeiten: e.target.value })}
                        />
                    ) : (
                        <Typography variant="body1"><strong>Öffnungszeiten:</strong> {parkData.oeffnungszeiten}</Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {editMode ? (
                        <TextField
                            fullWidth
                            label="Eintrittspreise"
                            name="eintrittspreise"
                            value={parkData.eintrittspreise}
                            onChange={(e) => setParkData({ ...parkData, eintrittspreise: e.target.value })}
                        />
                    ) : (
                        <Typography variant="body1"><strong>Eintrittspreise:</strong> {parkData.eintrittspreise}</Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {editMode ? (
                        <TextField
                            fullWidth
                            multiline
                            label="Beschreibung"
                            name="beschreibung"
                            value={parkData.beschreibung}
                            onChange={(e) => setParkData({ ...parkData, beschreibung: e.target.value })}
                        />
                    ) : (
                        <Typography variant="body1"><strong>Beschreibung:</strong> {parkData.beschreibung}</Typography>
                    )}
                </Grid>
            </Grid>
            {isDirector && (
                <>
                    <Button variant="contained" color="primary" onClick={() => setEditMode(!editMode)} style={{ marginTop: '20px' }}>
                        {editMode ? "Abbrechen" : "Bearbeiten"}
                    </Button>
                    {editMode && (
                        <Button variant="contained" color="secondary" onClick={() => {
                            fetch("http://localhost:8080/api/freizeitpark", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(parkData)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    setParkData(data);
                                    setEditMode(false);
                                })
                                .catch(error => console.error("Error updating park data:", error));
                        }} style={{ marginTop: '20px', marginLeft: '10px' }}>
                            Speichern
                        </Button>
                    )}
                </>
            )}

            {/* Eintrittsticket Kaufbereich */}
            <Typography variant="h5" style={{ marginTop: '40px' }}>Tickets kaufen (Eintritt)</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Erwachsenentickets"
                        type="number"
                        value={adultTickets}
                        onChange={(e) => setAdultTickets(parseInt(e.target.value) || 0)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Kindertickets"
                        type="number"
                        value={childTickets}
                        onChange={(e) => setChildTickets(parseInt(e.target.value) || 0)}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: '10px' }}>
                Gesamtpreis: {(adultTickets * 20 + childTickets * 10).toFixed(2)} €
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddEntranceToCart} style={{ marginTop: '10px' }}>
                In den Warenkorb
            </Button>
        </Container>
    );
};

export default Freizeitpark;
