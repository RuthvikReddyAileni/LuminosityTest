# Time Traveler's Gift Shop — Developer Practical (Vue 3 + TypeScript + Firestore)

Hi Aterra Designs Hiring Team,

This repository contains my submission for the Developer Practical. The app is a clean MVP that demonstrates a product **catalog** with **category filtering** and an **order form** with a live summary. Product data is loaded from **Firebase Firestore**, and the catalog **seeds itself on first run**.

I focused on:

- A straightforward, responsive UI with semantic HTML and accessibility touches.
- Clear application state management (Pinia) and a small Firestore data layer.
- Interview-friendly code comments and a concise structure.

---

## Tech Stack

- **Vue 3 + TypeScript** (Vite)
- **Pinia** — application state (products, filters, cart, UI flags)
- **Firebase Firestore** — product data storage
- **Vanilla CSS** — responsive layout + a11y-friendly styles

---

## Prerequisites

- **Node.js 18+** (`node -v`)
- **npm** (bundled with Node)
- **Git** (for cloning; optional if you download a zip)

> The app uses Firestore only; no Firebase Authentication or Storage is required.

---

## Quick Start (from zero to running)

### 1) Clone the repository

```bash
git clone <REPO_URL> luminosity-giftshop
cd luminosity-giftshop
```
### 2) Install dependencies bash
```
npm install 

```

### 3) Create a Firebase project & enable Firestore Go
to Firebase Console → Create project (Analytics not required).

In Build → Firestore Database, click Create database (test mode is fine
for this demo).

In Project settings → General → Your apps, add a Web App and copy the
web config values.

### 4) Configure environment variables Create a file named .env in the
project root with your Firebase keys:

.env file:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID \# Optional (not used by the app): \#
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX Note: .env is git-ignored by
default. Please don't commit real keys.
```

### 5) Place product images (exact filenames) Put the following PNG files
in public/ (served from the root path). Filenames must match exactly
(case/spaces/apostrophe):

Time Traveler's Gift Shop Logo.png

Roman Gladiator Selfie Stick.png

Dinosaur Repellent Spray.png

Victorian Era VR Goggles.png

Medieval Chainmail Pajamas.png

1960s Moon Landing Popcorn.png

Steampunk Picket Drone.png

placeholder.png (any small placeholder image)

If an image is missing, the app falls back to placeholder.png.

### 6) Run the app (dev) bash npm run dev Open the printed URL
(usually http://localhost:5173).

How to use:

Filter products with category chips at the top.

Set quantities per item (validated to 0..stock).

Click Cart to toggle the Order Summary panel (70/30 layout on desktop).

Clear resets the cart and all quantity inputs back to 0.

Submit Order outputs the order JSON to the console and displays it on
the page (per requirements).

### 7) (Optional) Build & preview production bash npm run build
npm run preview Reseeding Firestore (if paths change) The app seeds
Firestore on first load. If you change image paths or want a clean
slate:

In Firestore Console, delete the products collection (or all docs inside
it).

Refresh the app --- the seeding helper will repopulate products
automatically.

## Project Structure (High Level)

```txt
src/
  components/        # CategoryFilter, ProductCard, OrderSummary
  data/              # seed.ts (initial product data for Firestore)
  pages/             # CatalogPage (composes the page)
  services/          # productService (Firestore + seed helper)
  stores/            # useCatalogStore (Pinia: products, filters, cart, UI)
  types.ts           # shared TypeScript types
  firebase.ts        # Firebase initialization
  styles.css         # responsive + accessibility-conscious styles
```

### Key Decisions
Centralized State: Pinia handles product, filter, and cart state. Quantity inputs are store-driven, ensuring Clear resets all quantities to 0.
Seeding on First Run: Automatically seeds Firestore to minimize setup — no extra scripts needed.
No Router: Kept scope small for MVP and review focus.

### Accessibility & UX Features
Semantic HTML regions (<main>, <section>, headings) for better screen reader support.
Keyboard-accessible category chips and buttons.
Visible focus states; no visual “blackout” during active states.
Sticky, non-overlapping Order Summary panel on desktop, toggled via Cart button.
Image fallback handling and input clamping (0..stock).

### Assumptions & Trade-offs
Images are served directly from public/ — Firebase Storage not required.
Orders are not persisted to Firestore (per requirements, output shown on screen/console).
Seeding check is a simple existence probe; sufficient for demo without extra indexes.

### Possible Improvements
Persist orders to Firestore with server timestamps.
Add product search, sorting, and richer empty/error states.
Use a form validation library with live region announcements for accessibility.
Add unit tests (store logic) and end-to-end accessibility tests (Playwright).

### Troubleshooting
Images not showing: Check filenames and case; ensure paths are root-relative (e.g., /Roman Gladiator Selfie Stick.png). Try a hard refresh (Ctrl/Cmd + Shift + R).
Incorrect catalog paths: Delete the products collection in Firestore and reload to trigger reseeding.
Alias import errors (@/...): Make sure vite.config.ts includes alias: { '@': path.resolve(__dirname, './src') }, or use relative paths.
Clear not resetting quantities: Ensure ProductCard binds quantity to a computed property from the store, not a local ref.

*Author*: Submission by Ruthvik Reddy for Aterra Designs.