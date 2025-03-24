-- Attraktionen
INSERT INTO attraktionen (name, logo, tags, beschreibung)
VALUES
    ('Achterbahn', 'https://via.placeholder.com/50', ARRAY['Adrenalin', 'Schnell'], 'Eine rasante Achterbahn.'),
    ('Riesenrad', 'https://via.placeholder.com/50', ARRAY['Familie', 'Gemütlich'], 'Ein klassisches Riesenrad mit toller Aussicht.'),
    ('Wildwasserbahn', 'https://via.placeholder.com/50', ARRAY['Wasser', 'Abenteuer'], 'Eine spritzige Wildwasserbahn.'),
    ('Geisterbahn', 'https://via.placeholder.com/50', ARRAY['Gruselig', 'Schnell'], 'Eine aufregende Fahrt durch Spukbereiche.');

-- Touren
INSERT INTO touren (name, logo, preis, attraktionen, dauer, start_zeit, end_zeit, beschreibung)
VALUES
    ('Abenteuer Tour', 'https://via.placeholder.com/50', '30€', ARRAY['Achterbahn', 'Wildwasserbahn'], '90 Minuten', '10:00', '11:30', 'Erleben Sie den Nervenkitzel pur!'),
    ('Familien Tour', 'https://via.placeholder.com/50', '25€', ARRAY['Riesenrad', 'Achterbahn'], '75 Minuten', '11:00', '12:15', 'Spaß für die ganze Familie.'),
    ('Erlebnis Tour', 'https://via.placeholder.com/50', '35€', ARRAY['Wildwasserbahn', 'Riesenrad'], '80 Minuten', '12:00', '13:20', 'Ein abwechslungsreiches Erlebnis.'),
    ('Grusel Tour', 'https://via.placeholder.com/50', '40€', ARRAY['Geisterbahn', 'Achterbahn'], '70 Minuten', '13:00', '14:10', 'Für alle, die den Nervenkitzel lieben.');