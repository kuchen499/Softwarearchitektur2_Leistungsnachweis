import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

const Attraktionen = ({ isDirector }) => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/attraktionen")
            .then(res => res.json())
            .then(setAttractions)
            .catch(console.error);
    }, []);

    const deleteAttraction = async (id) => {
        await fetch(`http://localhost:8080/api/attraktionen/${id}`, { method: 'DELETE' });
        setAttractions(attractions.filter(a => a.id !== id));
    };

    const editAttraction = async (attr) => {
        const name = prompt("Neuer Name:", attr.name);
        if (name === null) return; // Abbrechen
        const logo = prompt("Neues Logo (URL):", attr.logo);
        if (logo === null) return; // Abbrechen

        // Aktuelle Tags in einen Prompt übernehmen:
        const tagsInput = prompt("Neue Tags (kommagetrennt):", attr.tags.join(","));
        let newTags = attr.tags;
        if (tagsInput !== null) {
            // Nur wenn der User etwas eingibt
            const trimmed = tagsInput.trim();
            if (trimmed.length > 0) {
                newTags = trimmed.split(",").map(t => t.trim());
            }
        }

        const beschreibung = prompt("Neue Beschreibung:", attr.beschreibung);
        if (beschreibung === null) return; // Abbrechen

        const updated = {
            ...attr,
            name,
            logo,
            tags: newTags,
            beschreibung
        };

        const res = await fetch(`http://localhost:8080/api/attraktionen/${attr.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        const data = await res.json();
        setAttractions(attractions.map(a => a.id === data.id ? data : a));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Attraktionen</Typography>
            <Grid container spacing={3}>
                {attractions.map(attr => (
                    <Grid item xs={12} sm={6} md={4} key={attr.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={attr.logo}
                                alt={attr.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="h6">{attr.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {attr.tags.join(", ")}
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    {attr.beschreibung}
                                </Typography>
                            </CardContent>
                            {isDirector && (
                                <CardActions>
                                    <Button size="small" onClick={() => editAttraction(attr)}>
                                        Bearbeiten
                                    </Button>
                                    <Button size="small" color="error" onClick={() => deleteAttraction(attr.id)}>
                                        Löschen
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Attraktionen;
