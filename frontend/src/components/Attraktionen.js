import React, { useState, useEffect } from 'react';
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

const Attraktionen = ({ isDirector }) => {
    const [attractions, setAttractions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editingAttractionId, setEditingAttractionId] = useState(null);
    const [editedAttraction, setEditedAttraction] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/api/attraktionen")
            .then(res => res.json())
            .then(data => setAttractions(data))
            .catch(console.error);
    }, []);

    const allTags = Array.from(new Set(attractions.flatMap(a => a.tags)));
    const filtered = attractions.filter(a => selectedTags.every(tag => a.tags.includes(tag)));

    const toggleTag = tag =>
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );

    const handleDeleteAttraction = (id) => {
        fetch(`http://localhost:8080/api/attraktionen/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    setAttractions(prev => prev.filter(attr => attr.id !== id));
                } else {
                    console.error("Löschen fehlgeschlagen");
                }
            })
            .catch(console.error);
    };

    const handleEditClick = (attraction) => {
        setEditingAttractionId(attraction.id);
        setEditedAttraction(attraction);
    };

    const handleSaveEdit = () => {
        fetch(`http://localhost:8080/api/attraktionen/${editingAttractionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedAttraction)
        })
            .then(res => res.json())
            .then(updatedAttraction => {
                setAttractions(prev =>
                    prev.map(attr => attr.id === editingAttractionId ? updatedAttraction : attr)
                );
                setEditingAttractionId(null);
            })
            .catch(console.error);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Attraktionen</Typography>
            <Grid container spacing={1} mb={3}>
                {allTags.map(tag => (
                    <Grid item key={tag}>
                        <Chip
                            label={tag}
                            variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                            color={selectedTags.includes(tag) ? "primary" : "default"}
                            onClick={() => toggleTag(tag)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={3}>
                {filtered.map(attr => (
                    <Grid item xs={12} sm={6} md={4} key={attr.id}>
                        <Card>
                            {editingAttractionId === attr.id ? (
                                <>
                                    <CardContent>
                                        <TextField
                                            label="Name"
                                            value={editedAttraction.name}
                                            onChange={(e) =>
                                                setEditedAttraction({ ...editedAttraction, name: e.target.value })
                                            }
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Logo URL"
                                            value={editedAttraction.logo}
                                            onChange={(e) =>
                                                setEditedAttraction({ ...editedAttraction, logo: e.target.value })
                                            }
                                            fullWidth
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Beschreibung"
                                            value={editedAttraction.beschreibung}
                                            onChange={(e) =>
                                                setEditedAttraction({ ...editedAttraction, beschreibung: e.target.value })
                                            }
                                            fullWidth
                                            multiline
                                            margin="dense"
                                        />
                                        {/* Optional: Tags bearbeiten */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={handleSaveEdit}>Speichern</Button>
                                        <Button size="small" onClick={() => setEditingAttractionId(null)}>Abbrechen</Button>
                                    </CardActions>
                                </>
                            ) : (
                                <>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={attr.logo}
                                        alt={attr.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{attr.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{attr.tags.join(', ')}</Typography>
                                        <Typography variant="body2" mt={1}>{attr.beschreibung}</Typography>
                                    </CardContent>
                                    {isDirector && (
                                        <CardActions>
                                            <Button size="small" onClick={() => handleEditClick(attr)}>Bearbeiten</Button>
                                            <Button size="small" color="error" onClick={() => handleDeleteAttraction(attr.id)}>Löschen</Button>
                                        </CardActions>
                                    )}
                                </>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Attraktionen;
