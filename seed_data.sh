#!/bin/bash

echo "Inserting Attraktionen..."

# Attraktion 1: Achterbahn
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Achterbahn",
  "logo": "https://via.placeholder.com/50",
  "tags": ["Adrenalin", "Schnell"],
  "beschreibung": "Eine rasante Achterbahn."
}' http://localhost:8080/api/attraktionen
echo ""

# Attraktion 2: Riesenrad
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Riesenrad",
  "logo": "https://via.placeholder.com/50",
  "tags": ["Familie", "Gemütlich"],
  "beschreibung": "Ein klassisches Riesenrad mit toller Aussicht."
}' http://localhost:8080/api/attraktionen
echo ""

# Attraktion 3: Wildwasserbahn
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Wildwasserbahn",
  "logo": "https://via.placeholder.com/50",
  "tags": ["Wasser", "Abenteuer"],
  "beschreibung": "Eine spritzige Wildwasserbahn."
}' http://localhost:8080/api/attraktionen
echo ""

# Attraktion 4: Geisterbahn
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Geisterbahn",
  "logo": "https://via.placeholder.com/50",
  "tags": ["Gruselig", "Schnell"],
  "beschreibung": "Eine aufregende Fahrt durch Spukbereiche."
}' http://localhost:8080/api/attraktionen
echo ""

echo "Inserting Touren..."

# Tour 1: Abenteuer Tour
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Abenteuer Tour",
  "logo": "https://via.placeholder.com/50",
  "preis": "30€",
  "attraktionen": ["Achterbahn", "Wildwasserbahn"],
  "dauer": "90 Minuten",
  "startZeit": "10:00",
  "endZeit": "11:30",
  "beschreibung": "Erleben Sie den Nervenkitzel pur!"
}' http://localhost:8080/api/touren
echo ""

# Tour 2: Familien Tour
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Familien Tour",
  "logo": "https://via.placeholder.com/50",
  "preis": "25€",
  "attraktionen": ["Riesenrad", "Achterbahn"],
  "dauer": "75 Minuten",
  "startZeit": "11:00",
  "endZeit": "12:15",
  "beschreibung": "Spaß für die ganze Familie."
}' http://localhost:8080/api/touren
echo ""

# Tour 3: Erlebnis Tour
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Erlebnis Tour",
  "logo": "https://via.placeholder.com/50",
  "preis": "35€",
  "attraktionen": ["Wildwasserbahn", "Riesenrad"],
  "dauer": "80 Minuten",
  "startZeit": "12:00",
  "endZeit": "13:20",
  "beschreibung": "Ein abwechslungsreiches Erlebnis."
}' http://localhost:8080/api/touren
echo ""

# Tour 4: Grusel Tour
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Grusel Tour",
  "logo": "https://via.placeholder.com/50",
  "preis": "40€",
  "attraktionen": ["Geisterbahn", "Achterbahn"],
  "dauer": "70 Minuten",
  "startZeit": "13:00",
  "endZeit": "14:10",
  "beschreibung": "Für alle, die den Nervenkitzel lieben."
}' http://localhost:8080/api/touren
echo ""

echo "Seed data inserted!"
