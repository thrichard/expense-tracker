#  Kiadáskövető

Webalkalmazás, amivel nyomon követheted a bevételeidet és kiadásaidat.

## Mit tud?

- Regisztráció és bejelentkezés – mindenki csak a saját adatait látja
- Tranzakciók rögzítése (név, összeg, típus, dátum)
- Bevételek és kiadások külön megjelenítve
- Egyenleg számítás automatikusan
- Kördiagram az összesítőről
- Szűrés hónap szerint
- Törlés

## Technológiák

**Frontend:** React, Vite, Tailwind CSS, Recharts  
**Backend:** Node.js, Express  
**Adatbázis:** SQLite (better-sqlite3)  
**Auth:** JWT, bcrypt  
**Deploy:** Netlify

## ai help
Ötletelés
Téma választás

Frontend felépítése
    Props és useState bevezetése hogy az adatok egy helyről jöjjenek

Backend felépítése
    SQLite adatbázis better-sqlite3-mal

Hibakeresés
    SQLite felhasznalo_id oszlop hiba javítása (régi db törlése)
    Netlify build

Design
    Mobilos reszponzív layout

Deploy

Netlify deploy és build settings konfigurálása


## Indítás

A projekt futtatásához két terminál kell.

**Backend:**
```bash
cd server
node index.js
```

**Frontend:**
```bash
cd client
npm run dev
```

Az app ezután elérhető: http://localhost:5173

## Élő verzió

https://lighthearted-bombolone-f5d6a2.netlify.app