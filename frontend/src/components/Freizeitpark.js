import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    TextField
} from '@mui/material';
import { CartContext } from './CartContext';

const Freizeitpark = ({ isDirector }) => {
    const [parkData, setParkData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedParkData, setEditedParkData] = useState({});
    const [adultTickets, setAdultTickets] = useState(0);
    const [childTickets, setChildTickets] = useState(0);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:8080/api/freizeitpark")
            .then(res => res.json())
            .then(data => {
                setParkData(data);
                setEditedParkData(data);
            })
            .catch(console.error);
    }, []);

    if (!parkData) return <Typography>Loading…</Typography>;

    const handleSaveEdit = () => {
        fetch("http://localhost:8080/api/freizeitpark", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedParkData)
        })
            .then(res => res.json())
            .then(data => {
                setParkData(data);
                setEditMode(false);
            })
            .catch(console.error);
    };

    const handleAddEntranceToCart = () => {
        addItem({
            id: `entrance-${Date.now()}`,
            type: 'entrance',
            quantity: adultTickets + childTickets,
            price: (adultTickets * 20 + childTickets * 10) / (adultTickets + childTickets || 1),
            details: { adultTickets, childTickets }
        });
        setAdultTickets(0);
        setChildTickets(0);
    };

    return (
        <Container>
            <Grid container spacing={4}>
                {/* Park Details Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {editMode ? (
                            <>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <TextField
                                        label="Name"
                                        value={editedParkData.name}
                                        onChange={(e) => setEditedParkData({ ...editedParkData, name: e.target.value })}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Logo URL"
                                        value={editedParkData.logo}
                                        onChange={(e) => setEditedParkData({ ...editedParkData, logo: e.target.value })}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Adresse"
                                        value={editedParkData.adresse}
                                        onChange={(e) => setEditedParkData({ ...editedParkData, adresse: e.target.value })}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Öffnungszeiten"
                                        value={editedParkData.oeffnungszeiten}
                                        onChange={(e) => setEditedParkData({ ...editedParkData, oeffnungszeiten: e.target.value })}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Eintrittspreise"
                                        value={editedParkData.eintrittspreise}
                                        onChange={(e) => setEditedParkData({ ...editedParkData, eintrittspreise: e.target.value })}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Beschreibung"
                                        value={editedParkData.beschreibung}
                                        onChange={(e) => setEditedParkData({ ...editedParkData, beschreibung: e.target.value })}
                                        fullWidth
                                        multiline
                                        margin="dense"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="secondary" onClick={handleSaveEdit}>Speichern</Button>
                                    <Button variant="outlined" onClick={() => { setEditMode(false); setEditedParkData(parkData); }}>Abbrechen</Button>
                                </CardActions>
                            </>
                        ) : (
                            <>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={parkData.logo}
                                    alt="Park Logo"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h4">{parkData.name}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        <strong>Adresse:</strong> {parkData.adresse}
                                    </Typography>
                                    <Typography variant="body1"><strong>Öffnungszeiten:</strong> {parkData.oeffnungszeiten}</Typography>
                                    <Typography variant="body1"><strong>Eintrittspreise:</strong> {parkData.eintrittspreise}</Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>{parkData.beschreibung}</Typography>
                                </CardContent>
                                {isDirector && (
                                    <CardActions>
                                        <Button variant="outlined" onClick={() => setEditMode(true)}>Bearbeiten</Button>
                                    </CardActions>
                                )}
                            </>
                        )}
                    </Card>
                </Grid>

                {/* Ticket Purchase Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Tickets kaufen</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Erwachsenentickets"
                                    type="number"
                                    value={adultTickets}
                                    onChange={e => setAdultTickets(+e.target.value || 0)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Kindertickets"
                                    type="number"
                                    value={childTickets}
                                    onChange={e => setChildTickets(+e.target.value || 0)}
                                    fullWidth
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default Freizeitpark;
