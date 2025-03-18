import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Table, TableHead, TableRow, TableCell,
    TableBody, Chip, Grid, Button, TextField, Snackbar, Alert
} from '@mui/material';

const Attraktionen = ({ isDirector }) => {
    const [attractions, setAttractions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editData, setEditData] = useState({});
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    // Attraktionen vom Backend laden
    useEffect(() => {
        fetch("http://localhost:8080/api/attraktionen")
            .then(response => response.json())
            .then(data => setAttractions(data))
            .catch(error => console.error("Error fetching attractions:", error));
    }, []);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const filteredAttractions = attractions.filter(attr =>
        selectedTags.every(tag => attr.tags.includes(tag))
    );

    const allTags = Array.from(new Set(attractions.flatMap(attr => attr.tags)));

    // Edit handlers
    const handleEdit = (attraction) => {
        setEditRowId(attraction.id);
        // Convert tags array to a comma-separated string for easier editing
        setEditData({ ...attraction, tags: attraction.tags.join(", ") });
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
        // Convert tags from comma-separated string back to array
        const updatedAttraction = {
            ...editData,
            tags: editData.tags.split(",").map(t => t.trim())
        };
        fetch(`http://localhost:8080/api/attraktionen/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAttraction)
        })
            .then(response => response.json())
            .then(data => {
                setAttractions(attractions.map(attr => attr.id === id ? data : attr));
                setEditRowId(null);
                setNotification({ open: true, message: "Attraction updated successfully", severity: "success" });
            })
            .catch(error => {
                console.error("Error updating attraction:", error);
                setNotification({ open: true, message: "Error updating attraction", severity: "error" });
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/attraktionen/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setAttractions(attractions.filter(attr => attr.id !== id));
                setNotification({ open: true, message: "Attraction deleted successfully", severity: "success" });
            })
            .catch(error => {
                console.error("Error deleting attraction:", error);
                setNotification({ open: true, message: "Error deleting attraction", severity: "error" });
            });
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>Attraktionen</Typography>
            <Typography variant="h6">Filter nach Tags:</Typography>
            <Grid container spacing={1} style={{ marginBottom: '20px' }}>
                {allTags.map((tag, index) => (
                    <Grid item key={index}>
                        <Chip
                            label={tag}
                            color={selectedTags.includes(tag) ? "primary" : "default"}
                            onClick={() => toggleTag(tag)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell>Beschreibung</TableCell>
                        <TableCell>Aktionen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAttractions.map(attraction => (
                        <TableRow key={attraction.id}>
                            <TableCell>
                                <img src={attraction.logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                            </TableCell>
                            <TableCell>
                                {editRowId === attraction.id ? (
                                    <TextField name="name" value={editData.name || ''} onChange={handleEditChange} />
                                ) : (
                                    attraction.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === attraction.id ? (
                                    <TextField name="tags" value={editData.tags || ''} onChange={handleEditChange} />
                                ) : (
                                    attraction.tags.join(", ")
                                )}
                            </TableCell>
                            <TableCell>
                                {editRowId === attraction.id ? (
                                    <TextField name="beschreibung" value={editData.beschreibung || ''} onChange={handleEditChange} fullWidth />
                                ) : (
                                    attraction.beschreibung
                                )}
                            </TableCell>
                            <TableCell>
                                {isDirector ? (
                                    editRowId === attraction.id ? (
                                        <>
                                            <Button variant="contained" color="primary" onClick={() => handleSaveEdit(attraction.id)}>Speichern</Button>
                                            <Button variant="outlined" onClick={handleCancelEdit} style={{ marginLeft: '5px' }}>Abbrechen</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outlined" size="small" onClick={() => handleEdit(attraction)} style={{ marginRight: '5px' }}>Bearbeiten</Button>
                                            <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(attraction.id)}>Löschen</Button>
                                        </>
                                    )
                                ) : null}
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

export default Attraktionen;
