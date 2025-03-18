import React, { useState, useEffect, useContext } from 'react';
import {
    Container, Typography, Table, TableHead, TableRow, TableCell,
    TableBody, Chip, Grid, Button, TextField, Snackbar, Alert
} from '@mui/material';
import { CartContext } from './CartContext';

const Touren = ({ isDirector }) => {
    const [tours, setTours] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editData, setEditData] = useState({});
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    // CartContext: Zum Hinzufügen von Tour-Tickets in den Warenkorb
    const { addItem } = useContext(CartContext);

    // Touren vom Backend laden
    useEffect(() => {
        fetch("http://localhost:8080/api/touren")
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error("Error fetching tours:", error));
    }, []);

    const toggleAttraction = (attraction) => {
        if (selectedAttractions.includes(attraction)) {
            setSelectedAttractions(selectedAttractions.filter(a => a !== attraction));
        } else {
            setSelectedAttractions([...selectedAttractions, attraction]);
        }
    };

    const filteredTours = tours.filter(tour =>
        selectedAttractions.every(attr => tour.attraktionen.includes(attr))
    );

    const allAttractions = Array.from(new Set(tours.flatMap(tour => tour.attraktionen)));

    // Edit handlers für Touren
    const handleEdit = (tour) => {
        setEditRowId(tour.id);
        setEditData({ ...tour, attraktionen: tour.attraktionen.join(", ") });
    };

    const handleCancelEdit = () => {
        setEditRowId(null);
        setEditData({});
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = (id) => {
        const updatedTour = {
            ...editData,
            attraktionen: editData.attraktionen.split(",").map(a => a.trim())
        };
        fetch(`http://localhost:8080/api/touren/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTour)
        })
            .then(response => response.json())
            .then(data => {
                setTours(tours.map(tour => tour.id === id ? data : tour));
                setEditRowId(null);
                setNotification({ open: true, message: "Tour updated successfully", severity: "success" });
            })
            .catch(error => {
                console.error("Error updating tour:", error);
                setNotification({ open: true, message: "Error updating tour", severity: "error" });
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/touren/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setTours(tours.filter(tour => tour.id !== id));
                setNotification({ open: true, message: "Tour deleted successfully", severity: "success" });
            })
            .catch(error => {
                console.error("Error deleting tour:", error);
                setNotification({ open: true, message: "Error deleting tour", severity: "error" });
            });
    };

    // Handler: Tour-Ticket in den Warenkorb legen
    const handleAddTourToCart = (tour) => {
        // Konvertiere den Tourpreis: Annahme: tour.preis enthält z. B. "30€"
        const price = parseFloat(tour.preis.replace("€", "")) || 0;
        // Für dieses Beispiel fügen wir immer 1 Ticket hinzu; in einer erweiterten Version könnte man die Menge auswählen.
        addItem({
            id: `tour-${tour.id}-${Date.now()}`,
            type: 'tour',
            tourId: tour.id,
            quantity: 1,
            price: price,
            details: { tourName: tour.name }
        });
        setNotification({ open: true, message: "Tour-Ticket zum Warenkorb hinzugefügt", severity: "success" });
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>Touren</Typography>
            <Typography variant="h6">Filter nach Attraktionen:</Typography>
            <Grid container spacing={1} style={{ marginBottom: '20px' }}>
                {allAttractions.map((attraction, index) => (
                    <Grid item key={index}>
                        <Chip
                            label={attraction}
                            color={selectedAttractions.includes(attraction) ? "primary" : "default"}
                            onClick={() => toggleAttraction(attraction)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Preis</TableCell>
                        <TableCell>Attraktionen</TableCell>
                        <TableCell>Dauer</TableCell>
                        <TableCell>Startzeit</TableCell>
                        <TableCell>Endzeit</TableCell>
                        <TableCell>Beschreibung</TableCell>
                        <TableCell>Aktionen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTours.map(tour => (
                        <TableRow key={tour.id}>
                            <TableCell>
                                <img src={tour.logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="name" value={editData.name || ''} onChange={handleEditChange} />
                                ) : (
                                    tour.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="preis" value={editData.preis || ''} onChange={handleEditChange} />
                                ) : (
                                    tour.preis
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="attraktionen" value={editData.attraktionen || ''} onChange={handleEditChange} />
                                ) : (
                                    tour.attraktionen.join(", ")
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="dauer" value={editData.dauer || ''} onChange={handleEditChange} />
                                ) : (
                                    tour.dauer
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="startZeit" value={editData.startZeit || ''} onChange={handleEditChange} />
                                ) : (
                                    tour.startZeit
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="endZeit" value={editData.endZeit || ''} onChange={handleEditChange} />
                                ) : (
                                    tour.endZeit
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === tour.id ? (
                                    <TextField name="beschreibung" value={editData.beschreibung || ''} onChange={handleEditChange} fullWidth />
                                ) : (
                                    tour.beschreibung
                                )}
                            </TableCell>
                            <TableCell>
                                {isDirector ? (
                                    editRowId === tour.id ? (
                                        <>
                                            <Button variant="contained" color="primary" onClick={() => handleSaveEdit(tour.id)}>Speichern</Button>
                                            <Button variant="outlined" onClick={handleCancelEdit} style={{ marginLeft: '5px' }}>Abbrechen</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outlined" size="small" onClick={() => handleEdit(tour)} style={{ marginRight: '5px' }}>Bearbeiten</Button>
                                            <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(tour.id)}>Löschen</Button>
                                        </>
                                    )
                                ) : null}
                                <Button variant="contained" size="small" onClick={() => handleAddTourToCart(tour)} style={{ marginTop: '5px' }}>
                                    In den Warenkorb
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={() => setNotification({ ...notification, open: false })}
            >
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Touren;
