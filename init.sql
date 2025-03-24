-- Tabelle für Freizeitpark (Freizeitpark-Entität)
CREATE TABLE IF NOT EXISTS freizeitpark (
                                            id BIGSERIAL PRIMARY KEY,
                                            name VARCHAR(255),
    logo VARCHAR(255),
    adresse VARCHAR(255),
    oeffnungszeiten VARCHAR(255),
    eintrittspreise VARCHAR(255),
    beschreibung TEXT
    );

-- Tabelle für Attraktion (Attraktion-Entität)
CREATE TABLE IF NOT EXISTS attraktion (
                                          id BIGSERIAL PRIMARY KEY,
                                          name VARCHAR(255),
    logo VARCHAR(255),
    beschreibung TEXT
    );

-- Join-Tabelle für die ElementCollection "tags" in Attraktion
CREATE TABLE IF NOT EXISTS attraktion_tags (
                                               attraktion_id BIGINT NOT NULL,
                                               tags TEXT NOT NULL,
                                               PRIMARY KEY (attraktion_id, tags),
    FOREIGN KEY (attraktion_id) REFERENCES attraktion(id) ON DELETE CASCADE
    );

-- Tabelle für Tour (Tour-Entität)
CREATE TABLE IF NOT EXISTS tour (
                                    id BIGSERIAL PRIMARY KEY,
                                    name VARCHAR(255),
    logo VARCHAR(255),
    preis VARCHAR(50),
    dauer VARCHAR(50),
    start_zeit VARCHAR(50),
    end_zeit VARCHAR(50),
    beschreibung TEXT
    );

-- Join-Tabelle für die ElementCollection "attraktionen" in Tour
CREATE TABLE IF NOT EXISTS tour_attraktionen (
                                                 tour_id BIGINT NOT NULL,
                                                 attraktionen TEXT NOT NULL,
                                                 PRIMARY KEY (tour_id, attraktionen),
    FOREIGN KEY (tour_id) REFERENCES tour(id) ON DELETE CASCADE
    );

-- Tabelle für TicketOrder (TicketOrder-Entität)
CREATE TABLE IF NOT EXISTS ticket_order (
                                            id BIGSERIAL PRIMARY KEY,
                                            booking_id VARCHAR(255),
    entrance_tickets INTEGER,
    tour_tickets INTEGER,
    total_price DOUBLE PRECISION,
    order_date TIMESTAMP
    );

-- Daten in die Tabelle "freizeitpark" einfügen
INSERT INTO freizeitpark (name, logo, adresse, oeffnungszeiten, eintrittspreise, beschreibung)
VALUES
    ('Freizeitpark Beispiel', 'https://via.placeholder.com/100', 'Musterstraße 1', '09:00-18:00', '20€', 'Ein toller Freizeitpark mit vielen Attraktionen.');

-- Daten in die Tabelle "attraktion" einfügen
INSERT INTO attraktion (name, logo, beschreibung)
VALUES
    ('Achterbahn', 'https://via.placeholder.com/50', 'Eine rasante Achterbahn.'),
    ('Riesenrad', 'https://via.placeholder.com/50', 'Ein klassisches Riesenrad mit toller Aussicht.'),
    ('Wildwasserbahn', 'https://via.placeholder.com/50', 'Eine spritzige Wildwasserbahn.'),
    ('Geisterbahn', 'https://via.placeholder.com/50', 'Eine aufregende Fahrt durch Spukbereiche.');

-- Daten in die Join-Tabelle "attraktion_tags" einfügen
-- (Es wird angenommen, dass die IDs der Attraktionen 1, 2, 3 und 4 sind)
INSERT INTO attraktion_tags (attraktion_id, tags)
VALUES
    (1, 'Adrenalin'),
    (1, 'Schnell'),
    (2, 'Familie'),
    (2, 'Gemütlich'),
    (3, 'Wasser'),
    (3, 'Abenteuer'),
    (4, 'Gruselig'),
    (4, 'Schnell');

-- Daten in die Tabelle "tour" einfügen
INSERT INTO tour (name, logo, preis, dauer, start_zeit, end_zeit, beschreibung)
VALUES
    ('Abenteuer Tour', 'https://via.placeholder.com/50', '30€', '90 Minuten', '10:00', '11:30', 'Erleben Sie den Nervenkitzel pur!'),
    ('Familien Tour', 'https://via.placeholder.com/50', '25€', '75 Minuten', '11:00', '12:15', 'Spaß für die ganze Familie.'),
    ('Erlebnis Tour', 'https://via.placeholder.com/50', '35€', '80 Minuten', '12:00', '13:20', 'Ein abwechslungsreiches Erlebnis.'),
    ('Grusel Tour', 'https://via.placeholder.com/50', '40€', '70 Minuten', '13:00', '14:10', 'Für alle, die den Nervenkitzel lieben.');

-- Daten in die Join-Tabelle "tour_attraktionen" einfügen
-- (Es wird angenommen, dass die Tour-IDs 1, 2, 3 und 4 sind)
INSERT INTO tour_attraktionen (tour_id, attraktionen)
VALUES
    (1, 'Achterbahn'),
    (1, 'Wildwasserbahn'),
    (2, 'Riesenrad'),
    (2, 'Achterbahn'),
    (3, 'Wildwasserbahn'),
    (3, 'Riesenrad'),
    (4, 'Geisterbahn'),
    (4, 'Achterbahn');

-- Optional: Daten in die Tabelle "ticket_order" einfügen
INSERT INTO ticket_order (booking_id, entrance_tickets, tour_tickets, total_price, order_date)
VALUES
    ('sample-booking-001', 2, 1, 50.0, '2025-03-24 18:00:00');
