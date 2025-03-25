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
    ('Freizeitpark München', '/img_4.png', 'Theresienhöhe 15, 80339 München', '09:00-18:00', 'Erwachsene: 20€, Kinder: 10€', 'Ein spannender Freizeitpark mit Attraktionen für Groß und Klein.');

-- Daten in die Tabelle "attraktion" einfügen
INSERT INTO attraktion (name, logo, beschreibung)
VALUES
    ('Achterbahn', 'img.png', 'Eine rasante Achterbahn.'),
    ('Riesenrad', 'img_1.png', 'Ein klassisches Riesenrad mit toller Aussicht.'),
    ('Wildwasserbahn', 'img_2.png', 'Eine spritzige Wildwasserbahn.'),
    ('Geisterbahn', 'img_3.png', 'Eine aufregende Fahrt durch Spukbereiche.'),
    ('Karussell', 'img_5.png', 'Ein klassisches Karussell für die ganze Familie.'),
    ('Kletterpark', 'img_6.png', 'Herausfordernder Hochseilgarten im Wald.'),
    ('Minigolf', 'img_7.png', 'Spaßige Minigolfanlage mit 18 Bahnen.'),
    ('Eislaufbahn', 'img_8.png', 'Überdachte Eisfläche zum Schlittschuhlaufen.'),
    ('Wildwasserbahn Extreme', 'img_9.png', 'Extrem spritzige Wildwasserfahrt mit Looping.');

-- Daten in die Join-Tabelle "attraktion_tags" einfügen
INSERT INTO attraktion_tags (attraktion_id, tags)
VALUES
    (1, 'Adrenalin'),
    (1, 'Schnell'),
    (2, 'Familie'),
    (2, 'Gemütlich'),
    (3, 'Wasser'),
    (3, 'Abenteuer'),
    (4, 'Gruselig'),
    (4, 'Schnell'),
    (5, 'Familie'),
    (5, 'Gemütlich'),
    (6, 'Abenteuer'),
    (6, 'Outdoor'),
    (7, 'Familie'),
    (7, 'Spiel'),
    (8, 'Sport'),
    (8, 'Winter'),
    (9, 'Adrenalin'),
    (9, 'Wasser');

-- Daten in die Tabelle "tour" einfügen
INSERT INTO tour (name, logo, preis, dauer, start_zeit, end_zeit, beschreibung)
VALUES
    ('Abenteuer Tour', 'img_10.png', '30€', '90 Minuten', '10:00', '11:30', 'Erleben Sie den Nervenkitzel pur!'),
    ('Familien Tour', 'img_11.png', '25€', '75 Minuten', '11:00', '12:15', 'Spaß für die ganze Familie.'),
    ('Erlebnis Tour', 'img_12.png', '35€', '80 Minuten', '12:00', '13:20', 'Ein abwechslungsreiches Erlebnis.'),
    ('Grusel Tour', 'img_13.png', '40€', '70 Minuten', '13:00', '14:10', 'Für alle, die den Nervenkitzel lieben.'),
    ('Familien Spaß Tour', 'img_14.png', '20€', '60 Minuten', '10:30', '11:30', 'Entdecken Sie die besten Attraktionen für die ganze Familie.'),
    ('Thrill Seeker Tour', 'img_15.png', '45€', '100 Minuten', '12:00', '13:40', 'Adrenalin pur auf den aufregendsten Fahrgeschäften.'),
    ('Wasser Abenteuer Tour', 'img_16.png', '30€', '75 Minuten', '13:00', '14:15', 'Erleben Sie die spritzigsten Wasserattraktionen.'),
    ('Outdoor Explorer Tour', 'img_17.png', '25€', '90 Minuten', '14:30', '16:00', 'Aktive Tour durch unsere Outdoor-Angebote.');

-- Daten in die Join-Tabelle "tour_attraktionen" einfügen
INSERT INTO tour_attraktionen (tour_id, attraktionen)
VALUES
    (1, 'Achterbahn'),
    (1, 'Wildwasserbahn'),
    (2, 'Riesenrad'),
    (2, 'Achterbahn'),
    (3, 'Wildwasserbahn'),
    (3, 'Riesenrad'),
    (4, 'Geisterbahn'),
    (4, 'Achterbahn'),
    (5, 'Riesenrad'),
    (5, 'Karussell'),
    (5, 'Minigolf'),
    (6, 'Achterbahn'),
    (6, 'Wildwasserbahn'),
    (6, 'Geisterbahn'),
    (6, 'Wildwasserbahn Extreme'),
    (7, 'Wildwasserbahn'),
    (7, 'Wildwasserbahn Extreme'),
    (8, 'Kletterpark'),
    (8, 'Eislaufbahn');

-- Optional: Daten in die Tabelle "ticket_order" einfügen
INSERT INTO ticket_order (booking_id, entrance_tickets, tour_tickets, total_price, order_date)
VALUES
    ('sample-booking-001', 2, 1, 50.0, '2025-03-24 18:00:00');
