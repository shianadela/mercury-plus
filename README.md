# Mercury+

A modern pharmacy e-commerce mobile app built with React Native and Expo. Mercury+ is a Mercury Drug clone that provides medicine browsing, prescription management, checkout with pickup scheduling, medication reminders, and health tracking tools — all designed for the Philippine market.

## Tech Stack

- **Framework:** Expo SDK 54, React Native 0.81.5, Expo Router v6
- **Backend:** Firebase v12 (modular API) — Authentication, Firestore, Storage
- **Styling:** StyleSheet (primary) + NativeWind/Tailwind CSS
- **State Management:** React Context (Auth, Cart, Reminders) + AsyncStorage
- **Language:** TypeScript
- **Icons:** Ionicons (@expo/vector-icons) + lucide-react-native
- **Testing:** Robot Framework (Appium-based E2E)

## Features

- **SSO Authentication** — Google, Apple (iOS), Facebook, and email/password login with Firebase + mock fallback for demo mode
- **Medicine Search & Browsing** — Search by name or category, view pricing (brand vs. generic), Rx badges
- **Checkout & Pickup Scheduling** — Cart management, time slot selection, "Skip the Line" queue, 5 payment methods, QR pickup code
- **Prescription Upload** — Scan or upload prescriptions for processing
- **Medication Reminders** — Set reminders with frequency options, automatic refill date prediction
- **Health Tracking** — BMI calculator, calorie counter, step counter, vaccine information
- **Order History** — Active, completed, and cancelled orders with status tracking
- **Store Locator** — Find nearby Mercury Drug branches across Metro Manila
- **Suki Card Loyalty Program** — Points earning, 5% discount, Gold tier
- **AI Health Assistant** — Keyword-based chat for medicine recommendations
- **Caregiver Access** — Multi-user health management (coming soon)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Then press `i` for iOS Simulator or `a` for Android Emulator.

> **Note:** The app works fully in demo mode without any Firebase credentials configured. All authentication providers fall back to mock users, and all data is seeded locally.

## Environment Variables

Create a `.env` file in the project root for production Firebase integration. All variables are optional — the app runs in demo mode without them.

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase project API key |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain (e.g., `project.firebaseapp.com`) |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging sender ID |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Google OAuth web client ID (from Google Cloud Console) |
| `EXPO_PUBLIC_FACEBOOK_APP_ID` | Facebook app ID (from Meta Developer Console) |

## Project Structure

```
mercury-plus/
├── app/
│   ├── (auth)/           # Login, signup, onboarding screens
│   ├── (tabs)/           # Main tab navigation (home, search, health, orders, profile)
│   ├── checkout/         # Checkout flow and order confirmation
│   ├── chat/             # AI health assistant
│   ├── prescription/     # Prescription upload and results
│   ├── reminders/        # Medication reminder management
│   ├── scanner/          # Barcode scanner
│   ├── store/            # Store locator and branch details
│   ├── promotions/       # Promotions and Suki Card
│   ├── support/          # Help and support
│   └── _layout.tsx       # Root layout with AuthGate routing
├── context/
│   ├── AuthContext.tsx    # Authentication state + SSO providers
│   ├── CartContext.tsx    # Shopping cart state + persistence
│   └── ReminderContext.tsx # Medication reminders + refill prediction
├── lib/
│   └── firebase.ts       # Firebase initialization (auth, db, storage)
├── constants/
│   ├── Colors.ts         # Theme colors (light/dark)
│   └── data.ts           # Mock data (medicines, branches, promotions)
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── tests/
│   ├── suites/           # 15 Robot Framework test suites
│   └── resources/        # Shared test keywords and configuration
└── assets/               # Fonts, images, and static assets
```

## Testing

The project includes 15 Robot Framework test suites for end-to-end testing via Appium.

### Prerequisites

```bash
pip install robotframework robotframework-appiumlibrary
```

### Running Tests

```bash
# Run all test suites
robot --outputdir results tests/suites/

# Run a specific suite
robot --outputdir results tests/suites/01_authentication.robot

# Run by tag
robot --include smoke --outputdir results tests/suites/
```

### Test Suites

| Suite | Coverage |
|---|---|
| `01_authentication.robot` | Login, signup, onboarding, SSO, security edge cases |
| `02_home_navigation.robot` | Home screen content and navigation |
| `03_search_medicine.robot` | Medicine search and filtering |
| `04_orders.robot` | Order history and tracking |
| `05_health.robot` | Health tracking tools |
| `06_prescription.robot` | Prescription upload and management |
| `07_checkout.robot` | Full checkout flow, payment, order confirmation |
| `08_scanner.robot` | Barcode scanner |
| `09_store_locator.robot` | Store/branch locator |
| `10_promotions.robot` | Promotions and Suki Card |
| `11_support.robot` | Help and support |
| `12_profile.robot` | Profile display, menu items, sign out |
| `13_chat.robot` | AI health assistant chat |
| `14_reminders.robot` | Medication reminders |
| `15_accessibility_usability.robot` | Accessibility, touch targets, cultural UX |

## Auth Architecture

Mercury+ uses a **Firebase-first + mock fallback** pattern:

1. Every auth method (email, Google, Apple, Facebook) first attempts the real Firebase flow
2. On any error (missing credentials, network failure, Expo Go limitations), it falls back to a mock user
3. Mock users are stored in AsyncStorage and provide the same `User` shape as Firebase users
4. The `AuthGate` component in the root layout watches auth state and enforces routing:
   - No user → redirect to login
   - User not onboarded → redirect to onboarding
   - Authenticated + onboarded → redirect to main tabs

This ensures the app is always demo-able without any backend configuration.

## License

MIT
