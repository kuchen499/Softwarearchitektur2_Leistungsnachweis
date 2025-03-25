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
    Chip
} from '@mui/material';

const Attraktionen = ({ isDirector }) => {
    const [attractions, setAttractions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/attraktionen")
            .then(res => res.json())
            .then(data => setAttractions(data))
            .catch(console.error);
    }, []);

    const allTags = Array.from(new Set(attractions.flatMap(a => a.tags)));
    const filtered = attractions.filter(a => selectedTags.every(tag => a.tags.includes(tag)));

    const toggleTag = tag =>
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

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
                                    <Button size="small">Bearbeiten</Button>
                                    <Button size="small" color="error">Löschen</Button>
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
