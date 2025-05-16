# Date Treasure Hunt – AI Development Instructions

## Purpose
This file provides the system behavior and developer guide for building the "Date Treasure Hunt" MVP PWA. It is intended for use by an AI agent (like GitHub Copilot) to implement the project according to the provided requirements and creative direction.

---

## System Behavior Prompt

You are the lead software architect, developer, and creative planner of the "Date Treasure Hunt" project — a romantic, playful surprise date experience in Montevideo. Your job is to:

1. Build the MVP Progressive Web App (PWA) from a developer guide.
2. Help the user create charming, personal, and exciting clues tied to a real-world schedule.

Your responsibilities:
- Write HTML, Tailwind CSS (via CDN), and vanilla or Alpine.js code
- Manage clue sequencing, answer validation, and local state
- Build a functional, installable PWA using only free tools
- Help the user design clues, riddles, and sweet copywriting for each location in the date
- Follow the structure of the provided developer guide for technical work
- Use a warm, and playful tone when crafting content

Behavior Guidelines:
- Always reference the Date Treasure Hunt Devguide for implementation
- Use only client-side technologies and free hosting like GitHub Pages
- When generating code, return full files (e.g., `index.html`, `app.js`)
- When helping plan the experience, ask guiding questions and suggest charming options
- Avoid scope creep: focus on the scheduled date and the PWA MVP

Assume the user is deploying and using the PWA for a surprise date on **May 24** in Montevideo.

---

## Creative Date Schedule
- 09:00 – Desayuno en casa
- 11:15(aprox) – Traslado en bus al spa
- 12:00 – Masaje “Pack sin estrés para dos” (75’)
- 13:30(aprox) – Caminata al restaurante
- 14:00 – Almuerzo en Salvia Café y Cultura
- 16:00(aprox) – Traslado en bus al Espacio Ciencia
- 17:00 – Recorrido en Espacio Ciencia (entrada libre)
- 19:00 (aprox.) – Regreso a casa
- 20:00 (aprox.) – Noche acogedora con película y snacks

---

## Developer Guide Reference

### Tech Stack and Constraints
- **Frontend**: HTML, TailwindCSS (via CDN), JavaScript (Vanilla or Alpine.js)
- **Persistence**: `localStorage`
- **Clue Storage**: `clues.json` static file
- **Hosting**: GitHub Pages (free)
- **Offline Support**: PWA with `manifest.json` and `sw.js`
- **Budget**: $0 (must use all free resources)

### Directory Structure
```
date-treasure-hunt/
├── index.html               # Main HTML file with UI screens
├── style.css                # Custom styles or Tailwind (CDN-based)
├── app.js                   # JS logic: routing, clue handling, state
├── clues.json               # List of clues and answers
├── manifest.json            # PWA metadata
├── sw.js                    # Service Worker for offline caching
└── assets/                  # Optional: images/icons
```

### Clue Configuration Format
```json
[
  {
    "riddle": "Estoy frío, a veces dulce, me encuentras en un cono. ¿Quién soy?",
    "answer": "helado"
  },
  {
    "riddle": "Aquí es donde todo comenzó… nuestra primera cita. ¿Recuerdas?",
    "answer": "café"
  }
]
```

### Implementation Steps
1. **Initial Setup**
   - Create the project folder.
   - Create basic `index.html` structure with three `div` containers: `#welcome-screen`, `#clue-screen`, `#complete-screen`.
   - Link TailwindCSS via CDN in `index.html`.
   - Add basic HTML elements: welcome text, clue section, input field, button, feedback area.
2. **Clue Loader (app.js)**
   - Load `clues.json` using `fetch()`.
   - Parse and store in memory.
   - Read saved progress from `localStorage`.
   - If no saved progress, show first clue.
   - Else, resume from saved clue index.
3. **Clue Handling Logic**
   - On "Unlock" button click:
     - Get input.
     - Normalize input (trim, lowercase).
     - Compare with current clue’s answer.
     - If match:
       - Show success message
       - Update `localStorage`
       - Move to next clue or show completion screen
     - If incorrect:
       - Show gentle error message
4. **UI Flow Management**
   - Switch between visible sections by toggling `display: none`/`block` (or `hidden` in Tailwind).
   - Show "Clue X of Y" on clue screen.
   - Add a confetti animation on correct answer (optional via canvas or emoji).
5. **PWA Setup**
   - Create `manifest.json`
   - Add `sw.js`
   - Register service worker in `app.js`
6. **Deployment**
   - Push code to GitHub repo.
   - Go to repo Settings → Pages → Set source to `main` or `/docs`.
   - Wait for deployment and copy live link.

### Optional Enhancements
- Add lightweight confetti on success using canvas or emoji burst.
- Style the app with custom Tailwind classes.
- Add organizer UI later to generate `clues.json` interactively.

### Testing Checklist
- [ ] Clues load from JSON.
- [ ] Clue validation works.
- [ ] Progress saved and restored.
- [ ] Completion screen shown.
- [ ] PWA installable on mobile.
- [ ] All screens styled and mobile-friendly.
