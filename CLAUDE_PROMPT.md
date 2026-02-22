# Claude Prompt — Mercury+ Feature Restoration & Polish

Use this prompt to verify and finalize all features in the Mercury+ Expo app. The codebase is an Expo SDK 54 / React Native 0.81.5 / Expo Router v6 project using Firebase v12 (modular API) with mock fallbacks for demo/dev.

---

## Context

This is a pharmacy e-commerce mobile app (Mercury Drug clone). The main branch contains all code — there are no other branches. Your job is to verify the features below are working correctly, fix any issues, and add what's missing.

**Tech stack:** Expo SDK 54, React Native 0.81.5, Expo Router v6, Firebase v12 (modular API), NativeWind/Tailwind + StyleSheet, AsyncStorage, lucide-react-native + Ionicons.

**Key directories:**
- `app/(auth)/` — Login, signup, onboarding screens
- `app/(tabs)/` — Main tab navigation (home, search, health, orders, profile)
- `app/checkout/` — Checkout flow (cart → success)
- `context/` — AuthContext, CartContext, ReminderContext
- `lib/firebase.ts` — Firebase initialization
- `tests/suites/` — 15 Robot Framework QA test suites
- `constants/data.ts` — Mock data

---

## Task 1: Login SSO with Mock Flow

**Files:** `context/AuthContext.tsx`, `app/(auth)/login.tsx`, `app/(auth)/signup.tsx`, `app/(auth)/onboarding.tsx`, `lib/firebase.ts`

Verify and ensure the following works:

1. **Email/password login** — validates fields, attempts Firebase `signInWithEmailAndPassword`, falls back to mock user on any error
2. **Google SSO** — uses `@react-native-google-signin/google-signin`, gets Firebase credential via `GoogleAuthProvider.credential(idToken)`, falls back to mock Google user
3. **Apple SSO** — iOS only, uses `expo-apple-authentication` with nonce from `expo-crypto`, uses `OAuthProvider('apple.com')` credential, falls back to mock Apple user
4. **Facebook SSO** — uses `expo-auth-session` + `expo-web-browser` OAuth flow, exchanges token for Firebase credential, falls back to mock Facebook user
5. **Mock fallback pattern** — every provider wraps Firebase calls in try/catch; on failure, creates a mock user object `{ uid, email, displayName, photoURL, provider }` and stores in AsyncStorage
6. **AuthGate routing** in `app/_layout.tsx`:
   - No user → redirect to `/(auth)/login`
   - User exists but `!onboarded` → redirect to `/(auth)/onboarding`
   - User onboarded + currently in auth group → redirect to `/(tabs)`
7. **Signup flow** — email/password registration with role selection (Patient/Caregiver), leads to onboarding
8. **Onboarding** — 3 steps: health conditions multi-select, branch selection, notification preferences

**Important:** The login should not require real Firebase credentials to work. The mock fallback must always succeed so the app is demo-able without any env vars configured. Do NOT expect fully functional Firebase — just ensure the flow redirects properly and mock users work.

---

## Task 2: Checkout Process

**Files:** `app/checkout/index.tsx`, `app/checkout/success.tsx`, `context/CartContext.tsx`

Verify and ensure the checkout flow works end-to-end:

1. **Cart display** — shows items with name, dosage, form, quantity, unit price, line total
2. **Quantity controls** — increment/decrement buttons, remove item (trash icon)
3. **Pickup branch** — shows selected branch name with "Change" button (can be UI-only)
4. **Time slot picker** — "ASAP" default + scheduled time options, "Skip the Line" badge
5. **Order summary** — subtotal, service fee (₱15), Suki Card discount (5%), total, Suki Points earned
6. **Payment methods** — radio selection: GCash, Maya, Credit/Debit Card, Suki Card Wallet, Insurance/HMO
7. **Place Order** — sticky bottom button showing total, triggers loading state → navigates to success
8. **Success screen** — order confirmation with:
   - Order ID display
   - Pickup details (branch, estimated time)
   - Ordered items list
   - QR code placeholder for pickup
   - "Track Order" and "Back to Home" action buttons
9. **CartContext** — provides `items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `total`, `itemCount`, `selectedBranch`, `pickupTime` with AsyncStorage persistence

**Note:** Cart items can be hardcoded/seeded for demo. No real backend integration needed.

---

## Task 3: Sign Out → Redirect to Login

**Files:** `app/(tabs)/profile.tsx`, `context/AuthContext.tsx`, `app/_layout.tsx`

Ensure sign out works correctly:

1. Profile screen's "Sign Out" button shows a confirmation Alert dialog
2. On confirm, calls `signOut()` from AuthContext which:
   - Calls Firebase `signOut(auth)` (wrapped in try/catch)
   - Clears AsyncStorage user data
   - Sets user state to `null`
3. AuthGate in `_layout.tsx` detects `user === null` and redirects to `/(auth)/login`
4. The profile screen should display the **actual logged-in user's data** (name, email, initials, role) — not hardcoded values

---

## Task 4: QA Test Files (Robot Framework)

**Directory:** `tests/suites/`, `tests/resources/`

Verify all 15 Robot Framework test suites exist and are comprehensive:

1. `01_authentication.robot` — Login (email, Google, Facebook, Apple), signup, onboarding, validation, security edge cases (SQL injection, XSS)
2. `02_home_navigation.robot` — Home tab content and navigation
3. `03_search_medicine.robot` — Medicine search functionality
4. `04_orders.robot` — Order history and tracking
5. `05_health.robot` — Health tracking features
6. `06_prescription.robot` — Prescription upload/management
7. `07_checkout.robot` — Full checkout flow (cart, quantities, time slots, payment, order summary, success screen, QR code)
8. `08_scanner.robot` — Barcode scanner
9. `09_store_locator.robot` — Store/branch locator
10. `10_promotions.robot` — Promotions and Suki Card
11. `11_support.robot` — Help and support
12. `12_profile.robot` — Profile display, menu items, sign out flow
13. `13_chat.robot` — Chat/messaging feature
14. `14_reminders.robot` — Medication reminders
15. `15_accessibility_usability.robot` — Accessibility and UX tests

Also ensure `tests/resources/common.resource` has shared keywords for app setup/teardown.

If any test suite is missing test cases for the features above (especially checkout, auth, and sign out redirect), add them.

---

## Task 5: README File

Create a `README.md` in the project root with:

1. **Project title & description** — Mercury+ pharmacy app (React Native/Expo)
2. **Tech stack** — Expo SDK 54, React Native 0.81.5, Expo Router v6, Firebase v12, NativeWind, TypeScript
3. **Features list:**
   - SSO Authentication (Google, Apple, Facebook, Email) with mock fallback
   - Medicine search and browsing
   - Checkout with pickup scheduling, payment selection, QR pickup code
   - Prescription upload and management
   - Medication reminders
   - Health tracking
   - Order history
   - Store locator
   - Suki Card loyalty program
   - Caregiver access (coming soon)
4. **Getting started:**
   - Prerequisites (Node.js, Expo CLI, iOS Simulator / Android Emulator)
   - `npm install`
   - `npx expo start`
   - Note: App works in demo mode without Firebase credentials
5. **Environment variables** — list all `EXPO_PUBLIC_*` vars with descriptions:
   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `EXPO_PUBLIC_FIREBASE_APP_ID`
   - `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
   - `EXPO_PUBLIC_FACEBOOK_APP_ID`
6. **Project structure** — brief directory overview
7. **Testing** — Robot Framework setup and how to run `tests/suites/*.robot`
8. **Auth architecture** — brief explanation of Firebase-first + mock fallback pattern
9. **License** — MIT (or leave as placeholder)

---

## General Rules

- Do NOT break existing functionality while fixing/adding features
- Use StyleSheet for styling (primary), NativeWind/Tailwind is secondary
- Use `Ionicons` or `lucide-react-native` for icons (both are installed)
- Follow existing code patterns and conventions in the codebase
- Colors are in `constants/Colors.ts` — use `Colors.light.tint` (#00A86B green) as primary
- Philippine Peso (₱) for currency
- All mock/demo data should feel realistic for a Philippine pharmacy app
- TypeScript throughout — no `any` types unless absolutely necessary
