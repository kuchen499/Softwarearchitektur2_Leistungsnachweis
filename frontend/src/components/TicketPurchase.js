import React, { useState } from 'react';
import { Container, Button, Typography, Snackbar, Alert } from '@mui/material';
import TicketPurchaseDialog from './TicketPurchaseDialog';

const TicketPurchase = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handlePurchaseConfirm = (orderData) => {
        fetch("http://localhost:8080/api/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        })
            .then(response => response.json())
            .then(data => {
                setConfirmation(data);
                setDialogOpen(false);
                setNotification({ open: true, message: "Ticket Bestellung erfolgreich!", severity: "success" });
            })
            .catch(error => {
                console.error("Error purchasing tickets:", error);
                setNotification({ open: true, message: "Fehler beim Ticketkauf", severity: "error" });
            });
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>Tickets kaufen</Typography>
            <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Tickets kaufen
            </Button>
            <TicketPurchaseDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handlePurchaseConfirm}
            />
            {confirmation && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Bestellbestätigung</Typography>
                    <Typography>Bestell-ID: {confirmation.bookingId}</Typography>
                    <Typography>Gesamtpreis: {confirmation.totalPrice.toFixed(2)} €</Typography>
                    <Typography>Gebuchte Eintrittskarten: {confirmation.entranceTickets}</Typography>
                    <Typography>Gebuchte Touren: {confirmation.tourTickets}</Typography>
                </div>
            )}
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

export default TicketPurchase;
