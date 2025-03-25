import React, { useContext, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, List, ListItem, ListItemText, Divider
} from '@mui/material';
import { CartContext } from './CartContext';

export default function ShoppingCart({ open, onClose }) {
    const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
    const [confirmation, setConfirmation] = useState(null);

    // Summen berechnen
    const entranceItems = cartItems.filter(item => item.type === 'entrance');
    const totalAdults = entranceItems.reduce((sum, i) => sum + (i.details.adultTickets || 0), 0);
    const totalChildren = entranceItems.reduce((sum, i) => sum + (i.details.childTickets || 0), 0);
    const tourItems = cartItems.filter(item => item.type === 'tour');
    const totalTours = tourItems.reduce((sum, i) => sum + (i.quantity || 0), 0);

    const handleCheckout = async () => {
        const payload = {
            entranceTickets: totalAdults,
            childTickets: totalChildren,
            tourTickets: totalTours,
            totalPrice: getTotalPrice()
        };

        const response = await fetch('http://localhost:8080/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const order = await response.json();
        setConfirmation(order);
        clearCart();
    };



    if (confirmation) {
        return (
            <Dialog open onClose={() => { setConfirmation(null); onClose(); }}>
                <DialogTitle>Bestellbestätigung</DialogTitle>
                <DialogContent>
                    <Typography><strong>Buchungs‑ID:</strong> {confirmation.bookingId}</Typography>
                    <Typography><strong>Erwachsenen‑Tickets:</strong> {confirmation.entranceTickets}</Typography>
                    <Typography><strong>Kindertickets:</strong> {confirmation.childTickets}</Typography>
                    <Typography><strong>Tour‑Tickets:</strong> {confirmation.tourTickets}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Gesamtpreis: {confirmation.totalPrice.toFixed(2)} €
                    </Typography>
                    <Typography variant="caption">
                        Bestelldatum: {new Date(confirmation.orderDate).toLocaleString()}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setConfirmation(null); onClose(); }}>Schließen</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Ihr Einkaufswagen</DialogTitle>
            <DialogContent>
                {cartItems.length === 0 ? (
                    <Typography>Ihr Einkaufswagen ist leer.</Typography>
                ) : (
                    <List>
                        {entranceItems.length > 0 && (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary="Eintrittstickets"
                                        secondary={`Erwachsene: ${totalAdults} | Kinder: ${totalChildren}`}
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        )}
                        {tourItems.map((item, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={`Tour: ${item.details?.tourName}`}
                                    secondary={`Menge: ${item.quantity || 1} — ${(item.price * (item.quantity || 1)).toFixed(2)} €`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Gesamtpreis: {getTotalPrice().toFixed(2)} €
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Schließen</Button>
                {cartItems.length > 0 && (
                    <Button variant="contained" onClick={handleCheckout}>
                        Jetzt bezahlen
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
