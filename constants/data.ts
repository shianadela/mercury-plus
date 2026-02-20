// =============================================================================
// Mercury+ App — Dummy / Seed Data
// =============================================================================

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

export interface Branch {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  openTime: string;
  closeTime: string;
  is24Hours: boolean;
  services: string[];
  isOpen: boolean;
  distance: string;
}

export type MedicineForm =
  | 'tablet'
  | 'capsule'
  | 'syrup'
  | 'drops'
  | 'cream'
  | 'ointment'
  | 'injection'
  | 'inhaler'
  | 'suppository'
  | 'powder';

export type MedicineCategory =
  | 'Pain Relief'
  | 'Antibiotics'
  | 'Vitamins'
  | 'Cardiovascular'
  | 'Diabetes'
  | 'Respiratory'
  | 'Gastrointestinal'
  | 'Dermatology'
  | 'Mental Health'
  | "Women's Health";

export interface Medicine {
  id: string;
  brandName: string;
  genericName: string;
  category: MedicineCategory;
  dosage: string;
  form: MedicineForm;
  price: number;
  genericPrice: number;
  requiresPrescription: boolean;
  description: string;
  sideEffects: string[];
  stock: Record<string, number>;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  imageUrl: string;
  category: string;
  featured: boolean;
}

export interface PrescriptionItem {
  medicineName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
}

export interface SamplePrescription {
  id: string;
  doctorName: string;
  patientName: string;
  date: string;
  hospital: string;
  items: PrescriptionItem[];
}

export interface Vaccine {
  id: string;
  name: string;
  description: string;
  price: number;
  ageGroup: string;
  doses: number;
  availability: string[];
}

export interface ChatResponse {
  message: string;
  suggestedMedicines?: string[];
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// 1. Branches (18 Metro Manila Mercury Drug branches)
// ---------------------------------------------------------------------------

export const branches: Branch[] = [
  {
    id: 'br-001',
    name: 'Mercury Drug Makati Cinema Square',
    address: '2130 Chino Roces Ave, Makati City',
    latitude: 14.5547,
    longitude: 121.0144,
    phone: '(02) 8896-1234',
    openTime: '07:00',
    closeTime: '22:00',
    is24Hours: false,
    services: ['Free Clinic', 'Lab Tests', 'Vaccine Center'],
    isOpen: true,
    distance: '0.8 km',
  },
  {
    id: 'br-002',
    name: 'Mercury Drug BGC High Street',
    address: '7th Ave cor. 28th St, BGC, Taguig City',
    latitude: 14.5507,
    longitude: 121.0508,
    phone: '(02) 8555-7890',
    openTime: '00:00',
    closeTime: '23:59',
    is24Hours: true,
    services: ['Vaccine Center', 'Free Clinic', 'Lab Tests', '24/7 Delivery'],
    isOpen: true,
    distance: '1.2 km',
  },
  {
    id: 'br-003',
    name: 'Mercury Drug SM Megamall',
    address: 'EDSA cor. Julia Vargas Ave, Mandaluyong City',
    latitude: 14.5846,
    longitude: 121.0566,
    phone: '(02) 8631-0011',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests'],
    isOpen: true,
    distance: '2.5 km',
  },
  {
    id: 'br-004',
    name: 'Mercury Drug Quezon Ave',
    address: '900 Quezon Ave, Quezon City',
    latitude: 14.6337,
    longitude: 121.0018,
    phone: '(02) 8712-3456',
    openTime: '00:00',
    closeTime: '23:59',
    is24Hours: true,
    services: ['Free Clinic', '24/7 Delivery', 'Lab Tests'],
    isOpen: true,
    distance: '5.1 km',
  },
  {
    id: 'br-005',
    name: 'Mercury Drug Robinsons Galleria',
    address: 'EDSA cor. Ortigas Ave, Quezon City',
    latitude: 14.5879,
    longitude: 121.0594,
    phone: '(02) 8631-5678',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests'],
    isOpen: true,
    distance: '2.9 km',
  },
  {
    id: 'br-006',
    name: 'Mercury Drug SM North EDSA',
    address: 'North Ave cor. EDSA, Quezon City',
    latitude: 14.6564,
    longitude: 121.0305,
    phone: '(02) 8374-9012',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Free Clinic'],
    isOpen: true,
    distance: '7.3 km',
  },
  {
    id: 'br-007',
    name: 'Mercury Drug Pasig Kapitolyo',
    address: '36 East Capitol Dr, Pasig City',
    latitude: 14.5726,
    longitude: 121.0615,
    phone: '(02) 8641-2233',
    openTime: '07:00',
    closeTime: '22:00',
    is24Hours: false,
    services: ['Free Clinic', 'Lab Tests'],
    isOpen: true,
    distance: '3.4 km',
  },
  {
    id: 'br-008',
    name: 'Mercury Drug Ermita Manila',
    address: '1000 TM Kalaw St, Ermita, Manila',
    latitude: 14.5764,
    longitude: 120.9830,
    phone: '(02) 8523-4567',
    openTime: '00:00',
    closeTime: '23:59',
    is24Hours: true,
    services: ['24/7 Delivery', 'Lab Tests', 'Free Clinic'],
    isOpen: true,
    distance: '4.6 km',
  },
  {
    id: 'br-009',
    name: 'Mercury Drug Ayala Malls Manila Bay',
    address: 'Diosdado Macapagal Blvd, Paranaque City',
    latitude: 14.5232,
    longitude: 120.9867,
    phone: '(02) 8801-3344',
    openTime: '10:00',
    closeTime: '22:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests'],
    isOpen: true,
    distance: '6.0 km',
  },
  {
    id: 'br-010',
    name: 'Mercury Drug Greenhills',
    address: 'Ortigas Ave, San Juan City',
    latitude: 14.6010,
    longitude: 121.0515,
    phone: '(02) 8724-5566',
    openTime: '08:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Free Clinic', 'Lab Tests'],
    isOpen: true,
    distance: '3.1 km',
  },
  {
    id: 'br-011',
    name: 'Mercury Drug Alabang Town Center',
    address: 'Alabang-Zapote Rd, Muntinlupa City',
    latitude: 14.4199,
    longitude: 121.0437,
    phone: '(02) 8842-7788',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests', 'Free Clinic'],
    isOpen: true,
    distance: '12.4 km',
  },
  {
    id: 'br-012',
    name: 'Mercury Drug Eastwood City',
    address: 'Eastwood Ave, Libis, Quezon City',
    latitude: 14.6088,
    longitude: 121.0806,
    phone: '(02) 8655-9900',
    openTime: '00:00',
    closeTime: '23:59',
    is24Hours: true,
    services: ['24/7 Delivery', 'Vaccine Center', 'Free Clinic', 'Lab Tests'],
    isOpen: true,
    distance: '4.2 km',
  },
  {
    id: 'br-013',
    name: 'Mercury Drug Trinoma',
    address: 'North Ave, Quezon City',
    latitude: 14.6531,
    longitude: 121.0365,
    phone: '(02) 8376-1122',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests'],
    isOpen: true,
    distance: '7.0 km',
  },
  {
    id: 'br-014',
    name: 'Mercury Drug Glorietta Makati',
    address: 'Ayala Center, Makati City',
    latitude: 14.5510,
    longitude: 121.0254,
    phone: '(02) 8893-3344',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Lab Tests', 'Free Clinic'],
    isOpen: true,
    distance: '1.0 km',
  },
  {
    id: 'br-015',
    name: 'Mercury Drug Gateway Cubao',
    address: 'Gen. Roxas Ave, Araneta Center, Cubao, Quezon City',
    latitude: 14.6208,
    longitude: 121.0530,
    phone: '(02) 8421-5566',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests'],
    isOpen: true,
    distance: '5.8 km',
  },
  {
    id: 'br-016',
    name: 'Mercury Drug Taft Ave Manila',
    address: '2345 Taft Ave, Malate, Manila',
    latitude: 14.5636,
    longitude: 120.9945,
    phone: '(02) 8526-7788',
    openTime: '07:00',
    closeTime: '23:00',
    is24Hours: false,
    services: ['Free Clinic', '24/7 Delivery'],
    isOpen: true,
    distance: '4.0 km',
  },
  {
    id: 'br-017',
    name: 'Mercury Drug Festival Mall Alabang',
    address: 'Filinvest Corporate City, Muntinlupa City',
    latitude: 14.4172,
    longitude: 121.0393,
    phone: '(02) 8850-9900',
    openTime: '10:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Vaccine Center', 'Lab Tests', 'Free Clinic'],
    isOpen: false,
    distance: '12.8 km',
  },
  {
    id: 'br-018',
    name: 'Mercury Drug Marikina Riverbanks',
    address: 'A. Bonifacio Ave, Marikina City',
    latitude: 14.6316,
    longitude: 121.0978,
    phone: '(02) 8681-2233',
    openTime: '08:00',
    closeTime: '21:00',
    is24Hours: false,
    services: ['Free Clinic', 'Lab Tests'],
    isOpen: true,
    distance: '8.5 km',
  },
];

// ---------------------------------------------------------------------------
// 2. Medicines (55 items across 10 categories)
// ---------------------------------------------------------------------------

export const medicines: Medicine[] = [
  // ── Pain Relief ──────────────────────────────────────────────────────────
  {
    id: 'med-001',
    brandName: 'Biogesic',
    genericName: 'Paracetamol',
    category: 'Pain Relief',
    dosage: '500mg',
    form: 'tablet',
    price: 5.75,
    genericPrice: 2.0,
    requiresPrescription: false,
    description:
      'For the relief of mild to moderate pain and fever. Biogesic is the trusted paracetamol brand of Filipino families.',
    sideEffects: ['Nausea', 'Allergic skin reactions (rare)'],
    stock: {
      'br-001': 250,
      'br-002': 180,
      'br-003': 300,
      'br-004': 200,
      'br-005': 160,
      'br-006': 220,
      'br-007': 140,
      'br-008': 190,
      'br-012': 210,
    },
  },
  {
    id: 'med-002',
    brandName: 'Dolfenal',
    genericName: 'Mefenamic Acid',
    category: 'Pain Relief',
    dosage: '500mg',
    form: 'capsule',
    price: 9.5,
    genericPrice: 4.5,
    requiresPrescription: false,
    description:
      'Non-steroidal anti-inflammatory drug for relief of mild to moderate pain including dysmenorrhea, headaches, and toothaches.',
    sideEffects: ['Stomach pain', 'Diarrhea', 'Nausea', 'Dizziness'],
    stock: {
      'br-001': 180,
      'br-002': 120,
      'br-003': 200,
      'br-004': 160,
      'br-005': 90,
      'br-008': 150,
      'br-010': 110,
      'br-012': 170,
    },
  },
  {
    id: 'med-003',
    brandName: 'Advil',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    dosage: '200mg',
    form: 'tablet',
    price: 12.0,
    genericPrice: 3.5,
    requiresPrescription: false,
    description:
      'Relieves minor aches and pains due to headache, toothache, backache, muscle ache, menstrual cramps, and the common cold.',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness', 'Heartburn'],
    stock: {
      'br-001': 150,
      'br-002': 100,
      'br-003': 180,
      'br-005': 120,
      'br-008': 130,
      'br-012': 90,
    },
  },
  {
    id: 'med-004',
    brandName: 'Flanax',
    genericName: 'Naproxen Sodium',
    category: 'Pain Relief',
    dosage: '275mg',
    form: 'tablet',
    price: 14.25,
    genericPrice: 6.0,
    requiresPrescription: false,
    description:
      'For temporary relief of minor aches and pains associated with arthritis, backache, headache, and muscle pain.',
    sideEffects: ['Stomach pain', 'Heartburn', 'Drowsiness', 'Headache'],
    stock: {
      'br-001': 100,
      'br-002': 80,
      'br-004': 120,
      'br-006': 90,
      'br-010': 70,
    },
  },
  {
    id: 'med-005',
    brandName: 'Medicol Advance',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    dosage: '400mg',
    form: 'capsule',
    price: 10.0,
    genericPrice: 5.0,
    requiresPrescription: false,
    description:
      'Fast-acting pain reliever for headache, toothache, dysmenorrhea, muscle pain, and backache.',
    sideEffects: ['Stomach pain', 'Nausea', 'Dizziness'],
    stock: {
      'br-001': 200,
      'br-002': 170,
      'br-003': 230,
      'br-004': 190,
      'br-007': 110,
      'br-009': 140,
      'br-012': 160,
    },
  },

  // ── Antibiotics ──────────────────────────────────────────────────────────
  {
    id: 'med-006',
    brandName: 'Amoxil',
    genericName: 'Amoxicillin',
    category: 'Antibiotics',
    dosage: '500mg',
    form: 'capsule',
    price: 18.0,
    genericPrice: 7.5,
    requiresPrescription: true,
    description:
      'A penicillin-type antibiotic used to treat a wide variety of bacterial infections including ear, nose, throat, urinary tract, and skin infections.',
    sideEffects: ['Diarrhea', 'Stomach upset', 'Rash', 'Nausea'],
    stock: {
      'br-001': 120,
      'br-002': 90,
      'br-003': 150,
      'br-004': 110,
      'br-005': 80,
      'br-008': 100,
      'br-012': 130,
    },
  },
  {
    id: 'med-007',
    brandName: 'Augmentin',
    genericName: 'Amoxicillin + Clavulanic Acid',
    category: 'Antibiotics',
    dosage: '625mg',
    form: 'tablet',
    price: 52.0,
    genericPrice: 28.0,
    requiresPrescription: true,
    description:
      'Combination antibiotic for treating infections resistant to amoxicillin alone, including sinusitis, pneumonia, and urinary tract infections.',
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Vomiting'],
    stock: {
      'br-001': 60,
      'br-002': 50,
      'br-003': 80,
      'br-004': 55,
      'br-008': 40,
      'br-012': 70,
    },
  },
  {
    id: 'med-008',
    brandName: 'Klaricid',
    genericName: 'Clarithromycin',
    category: 'Antibiotics',
    dosage: '500mg',
    form: 'tablet',
    price: 45.0,
    genericPrice: 22.0,
    requiresPrescription: true,
    description:
      'Macrolide antibiotic used to treat respiratory tract, skin, and soft tissue infections. Also used in H. pylori eradication.',
    sideEffects: ['Diarrhea', 'Nausea', 'Abnormal taste', 'Abdominal pain'],
    stock: {
      'br-001': 40,
      'br-002': 35,
      'br-003': 50,
      'br-004': 45,
      'br-010': 30,
    },
  },
  {
    id: 'med-009',
    brandName: 'Doxycap',
    genericName: 'Doxycycline',
    category: 'Antibiotics',
    dosage: '100mg',
    form: 'capsule',
    price: 12.0,
    genericPrice: 5.0,
    requiresPrescription: true,
    description:
      'Broad-spectrum tetracycline antibiotic used for respiratory, urinary, and sexually transmitted infections.',
    sideEffects: ['Photosensitivity', 'Nausea', 'Diarrhea', 'Esophageal irritation'],
    stock: {
      'br-001': 90,
      'br-002': 70,
      'br-004': 100,
      'br-008': 60,
      'br-012': 80,
    },
  },
  {
    id: 'med-010',
    brandName: 'Cefalin',
    genericName: 'Cefalexin',
    category: 'Antibiotics',
    dosage: '500mg',
    form: 'capsule',
    price: 22.0,
    genericPrice: 10.0,
    requiresPrescription: true,
    description:
      'First-generation cephalosporin antibiotic for skin, bone, ear, urinary tract, and respiratory infections.',
    sideEffects: ['Diarrhea', 'Nausea', 'Stomach pain', 'Dizziness'],
    stock: {
      'br-001': 80,
      'br-003': 100,
      'br-004': 70,
      'br-006': 60,
      'br-012': 90,
    },
  },

  // ── Vitamins ─────────────────────────────────────────────────────────────
  {
    id: 'med-011',
    brandName: 'Enervon',
    genericName: 'Multivitamins + Iron',
    category: 'Vitamins',
    dosage: '',
    form: 'tablet',
    price: 8.5,
    genericPrice: 4.0,
    requiresPrescription: false,
    description:
      'Daily multivitamin with B-complex, Vitamin C, and Iron to help boost energy and immunity.',
    sideEffects: ['Dark-colored stools (due to iron)', 'Mild stomach upset'],
    stock: {
      'br-001': 400,
      'br-002': 350,
      'br-003': 500,
      'br-004': 380,
      'br-005': 300,
      'br-006': 280,
      'br-007': 200,
      'br-008': 350,
      'br-009': 250,
      'br-010': 320,
      'br-012': 400,
    },
  },
  {
    id: 'med-012',
    brandName: 'Centrum Silver',
    genericName: 'Multivitamins + Minerals (Senior)',
    category: 'Vitamins',
    dosage: '',
    form: 'tablet',
    price: 25.0,
    genericPrice: 12.0,
    requiresPrescription: false,
    description:
      'Specially formulated for adults 50+ with key nutrients to support heart, brain, and eye health.',
    sideEffects: ['Mild stomach upset', 'Constipation (rare)'],
    stock: {
      'br-001': 150,
      'br-002': 120,
      'br-003': 180,
      'br-004': 130,
      'br-008': 100,
      'br-011': 90,
      'br-012': 140,
    },
  },
  {
    id: 'med-013',
    brandName: 'Berocca',
    genericName: 'B-Vitamins + Vitamin C + Zinc',
    category: 'Vitamins',
    dosage: '',
    form: 'tablet',
    price: 22.0,
    genericPrice: 10.0,
    requiresPrescription: false,
    description:
      'Effervescent vitamin supplement to help support mental sharpness, physical energy, and immunity.',
    sideEffects: ['Bright yellow urine (harmless)', 'Mild nausea'],
    stock: {
      'br-001': 200,
      'br-002': 170,
      'br-003': 220,
      'br-005': 140,
      'br-008': 160,
      'br-012': 190,
    },
  },
  {
    id: 'med-014',
    brandName: 'Immunpro',
    genericName: 'Sodium Ascorbate + Zinc',
    category: 'Vitamins',
    dosage: '500mg',
    form: 'tablet',
    price: 12.0,
    genericPrice: 5.5,
    requiresPrescription: false,
    description:
      'Non-acidic Vitamin C with Zinc to help strengthen immune system. Gentle on the stomach.',
    sideEffects: ['Mild stomach upset (rare)'],
    stock: {
      'br-001': 350,
      'br-002': 280,
      'br-003': 400,
      'br-004': 300,
      'br-005': 250,
      'br-006': 220,
      'br-008': 310,
      'br-012': 330,
    },
  },
  {
    id: 'med-015',
    brandName: 'Sangobion',
    genericName: 'Iron + Folic Acid + Vitamin B12',
    category: 'Vitamins',
    dosage: '',
    form: 'capsule',
    price: 15.0,
    genericPrice: 7.0,
    requiresPrescription: false,
    description:
      'Iron supplement for the prevention and treatment of iron deficiency anemia.',
    sideEffects: ['Dark stools', 'Constipation', 'Mild stomach pain'],
    stock: {
      'br-001': 180,
      'br-002': 150,
      'br-003': 200,
      'br-004': 170,
      'br-008': 130,
      'br-012': 160,
    },
  },

  // ── Cardiovascular ───────────────────────────────────────────────────────
  {
    id: 'med-016',
    brandName: 'Cozaar',
    genericName: 'Losartan',
    category: 'Cardiovascular',
    dosage: '50mg',
    form: 'tablet',
    price: 28.0,
    genericPrice: 8.0,
    requiresPrescription: true,
    description:
      'Angiotensin II receptor blocker (ARB) for the treatment of high blood pressure and to protect kidneys in diabetic patients.',
    sideEffects: ['Dizziness', 'Fatigue', 'Hyperkalemia', 'Back pain'],
    stock: {
      'br-001': 100,
      'br-002': 80,
      'br-003': 120,
      'br-004': 90,
      'br-008': 70,
      'br-011': 85,
      'br-012': 110,
    },
  },
  {
    id: 'med-017',
    brandName: 'Norvasc',
    genericName: 'Amlodipine',
    category: 'Cardiovascular',
    dosage: '5mg',
    form: 'tablet',
    price: 32.0,
    genericPrice: 5.5,
    requiresPrescription: true,
    description:
      'Calcium channel blocker used to treat high blood pressure and angina (chest pain).',
    sideEffects: ['Swelling of ankles', 'Flushing', 'Headache', 'Dizziness'],
    stock: {
      'br-001': 110,
      'br-002': 85,
      'br-003': 130,
      'br-004': 100,
      'br-008': 75,
      'br-011': 90,
      'br-012': 105,
    },
  },
  {
    id: 'med-018',
    brandName: 'Lipitor',
    genericName: 'Atorvastatin',
    category: 'Cardiovascular',
    dosage: '20mg',
    form: 'tablet',
    price: 42.0,
    genericPrice: 12.0,
    requiresPrescription: true,
    description:
      'Statin used to lower cholesterol and triglyceride levels and reduce the risk of cardiovascular disease.',
    sideEffects: ['Muscle pain', 'Joint pain', 'Diarrhea', 'Nausea'],
    stock: {
      'br-001': 70,
      'br-002': 55,
      'br-003': 90,
      'br-004': 65,
      'br-008': 50,
      'br-011': 60,
      'br-012': 80,
    },
  },
  {
    id: 'med-019',
    brandName: 'Concor',
    genericName: 'Bisoprolol',
    category: 'Cardiovascular',
    dosage: '5mg',
    form: 'tablet',
    price: 25.0,
    genericPrice: 9.0,
    requiresPrescription: true,
    description:
      'Beta-blocker for managing high blood pressure, heart failure, and certain heart rhythm disorders.',
    sideEffects: ['Fatigue', 'Cold extremities', 'Dizziness', 'Bradycardia'],
    stock: {
      'br-001': 60,
      'br-002': 50,
      'br-004': 70,
      'br-008': 45,
      'br-012': 55,
    },
  },
  {
    id: 'med-020',
    brandName: 'Aspirin Protect',
    genericName: 'Aspirin',
    category: 'Cardiovascular',
    dosage: '100mg',
    form: 'tablet',
    price: 8.0,
    genericPrice: 2.5,
    requiresPrescription: false,
    description:
      'Low-dose enteric-coated aspirin for prevention of cardiovascular events such as heart attack and stroke.',
    sideEffects: ['Stomach upset', 'Easy bruising', 'Heartburn'],
    stock: {
      'br-001': 200,
      'br-002': 160,
      'br-003': 250,
      'br-004': 180,
      'br-005': 130,
      'br-008': 170,
      'br-012': 210,
    },
  },

  // ── Diabetes ─────────────────────────────────────────────────────────────
  {
    id: 'med-021',
    brandName: 'Glucophage',
    genericName: 'Metformin',
    category: 'Diabetes',
    dosage: '500mg',
    form: 'tablet',
    price: 15.0,
    genericPrice: 4.0,
    requiresPrescription: true,
    description:
      'First-line oral medication for type 2 diabetes. Helps control blood sugar levels by decreasing glucose production in the liver.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach pain', 'Metallic taste'],
    stock: {
      'br-001': 150,
      'br-002': 120,
      'br-003': 180,
      'br-004': 140,
      'br-008': 100,
      'br-011': 110,
      'br-012': 160,
    },
  },
  {
    id: 'med-022',
    brandName: 'Diamicron MR',
    genericName: 'Gliclazide',
    category: 'Diabetes',
    dosage: '60mg',
    form: 'tablet',
    price: 30.0,
    genericPrice: 14.0,
    requiresPrescription: true,
    description:
      'Sulfonylurea that stimulates the pancreas to produce more insulin. Used for type 2 diabetes.',
    sideEffects: ['Hypoglycemia', 'Nausea', 'Weight gain', 'Headache'],
    stock: {
      'br-001': 80,
      'br-002': 60,
      'br-003': 100,
      'br-004': 70,
      'br-008': 55,
      'br-012': 90,
    },
  },
  {
    id: 'med-023',
    brandName: 'Januvia',
    genericName: 'Sitagliptin',
    category: 'Diabetes',
    dosage: '100mg',
    form: 'tablet',
    price: 75.0,
    genericPrice: 45.0,
    requiresPrescription: true,
    description:
      'DPP-4 inhibitor that increases insulin production and decreases glucose production when blood sugar is high.',
    sideEffects: ['Upper respiratory infection', 'Headache', 'Stomach pain'],
    stock: {
      'br-001': 40,
      'br-002': 30,
      'br-003': 50,
      'br-004': 35,
      'br-012': 45,
    },
  },
  {
    id: 'med-024',
    brandName: 'Jardiance',
    genericName: 'Empagliflozin',
    category: 'Diabetes',
    dosage: '10mg',
    form: 'tablet',
    price: 85.0,
    genericPrice: 60.0,
    requiresPrescription: true,
    description:
      'SGLT2 inhibitor for type 2 diabetes. Helps kidneys remove glucose through urine. Also shown to benefit heart health.',
    sideEffects: ['Urinary tract infections', 'Genital yeast infections', 'Dehydration'],
    stock: {
      'br-001': 30,
      'br-002': 25,
      'br-003': 40,
      'br-004': 28,
      'br-012': 35,
    },
  },
  {
    id: 'med-025',
    brandName: 'Galvus',
    genericName: 'Vildagliptin',
    category: 'Diabetes',
    dosage: '50mg',
    form: 'tablet',
    price: 55.0,
    genericPrice: 35.0,
    requiresPrescription: true,
    description:
      'DPP-4 inhibitor used with diet and exercise to improve blood sugar control in adults with type 2 diabetes.',
    sideEffects: ['Headache', 'Dizziness', 'Tremor', 'Nausea'],
    stock: {
      'br-001': 35,
      'br-003': 45,
      'br-004': 30,
      'br-012': 40,
    },
  },

  // ── Respiratory ──────────────────────────────────────────────────────────
  {
    id: 'med-026',
    brandName: 'Neozep Forte',
    genericName: 'Phenylpropanolamine + Chlorphenamine + Paracetamol',
    category: 'Respiratory',
    dosage: '',
    form: 'tablet',
    price: 7.0,
    genericPrice: 3.5,
    requiresPrescription: false,
    description:
      'Multi-symptom cold medicine for nasal congestion, runny nose, headache, body pain, and fever.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness', 'Insomnia'],
    stock: {
      'br-001': 300,
      'br-002': 250,
      'br-003': 350,
      'br-004': 280,
      'br-005': 220,
      'br-006': 260,
      'br-007': 190,
      'br-008': 270,
      'br-012': 310,
    },
  },
  {
    id: 'med-027',
    brandName: 'Solmux',
    genericName: 'Carbocisteine',
    category: 'Respiratory',
    dosage: '500mg',
    form: 'capsule',
    price: 10.5,
    genericPrice: 5.0,
    requiresPrescription: false,
    description:
      'Mucolytic agent that thins and loosens phlegm in the airways, making it easier to cough out.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach discomfort', 'Headache'],
    stock: {
      'br-001': 280,
      'br-002': 230,
      'br-003': 320,
      'br-004': 260,
      'br-005': 200,
      'br-006': 240,
      'br-008': 250,
      'br-012': 290,
    },
  },
  {
    id: 'med-028',
    brandName: 'Robitussin DM',
    genericName: 'Dextromethorphan + Guaifenesin',
    category: 'Respiratory',
    dosage: '10mg/5ml',
    form: 'syrup',
    price: 145.0,
    genericPrice: 80.0,
    requiresPrescription: false,
    description:
      'Cough suppressant with expectorant for relief of dry and productive cough associated with colds and flu.',
    sideEffects: ['Drowsiness', 'Nausea', 'Dizziness'],
    stock: {
      'br-001': 60,
      'br-002': 45,
      'br-003': 70,
      'br-004': 55,
      'br-008': 40,
      'br-012': 65,
    },
  },
  {
    id: 'med-029',
    brandName: 'Ventolin',
    genericName: 'Salbutamol',
    category: 'Respiratory',
    dosage: '100mcg/dose',
    form: 'inhaler',
    price: 420.0,
    genericPrice: 250.0,
    requiresPrescription: true,
    description:
      'Quick-relief bronchodilator for asthma and COPD. Relaxes airway muscles for easier breathing.',
    sideEffects: ['Tremor', 'Headache', 'Rapid heartbeat', 'Nervousness'],
    stock: {
      'br-001': 30,
      'br-002': 25,
      'br-003': 40,
      'br-004': 28,
      'br-008': 20,
      'br-012': 35,
    },
  },
  {
    id: 'med-030',
    brandName: 'Decolgen',
    genericName: 'Phenylpropanolamine + Chlorphenamine + Paracetamol',
    category: 'Respiratory',
    dosage: '',
    form: 'tablet',
    price: 6.5,
    genericPrice: 3.0,
    requiresPrescription: false,
    description:
      'For relief of clogged nose, runny nose, sneezing, headache, body aches, and fever associated with flu and colds.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness'],
    stock: {
      'br-001': 280,
      'br-002': 220,
      'br-003': 300,
      'br-004': 250,
      'br-005': 180,
      'br-008': 230,
      'br-012': 270,
    },
  },
  {
    id: 'med-031',
    brandName: 'Lagundi 600',
    genericName: 'Vitex negundo L. (Lagundi) Leaf Extract',
    category: 'Respiratory',
    dosage: '600mg',
    form: 'tablet',
    price: 8.0,
    genericPrice: 5.0,
    requiresPrescription: false,
    description:
      'Herbal medicine for the relief of cough and asthma. DOH-approved herbal remedy.',
    sideEffects: ['Mild stomach upset (rare)'],
    stock: {
      'br-001': 200,
      'br-002': 170,
      'br-003': 220,
      'br-004': 190,
      'br-008': 150,
      'br-012': 180,
    },
  },

  // ── Gastrointestinal ─────────────────────────────────────────────────────
  {
    id: 'med-032',
    brandName: 'Kremil-S',
    genericName: 'Aluminum Hydroxide + Magnesium Hydroxide + Simethicone',
    category: 'Gastrointestinal',
    dosage: '',
    form: 'tablet',
    price: 7.5,
    genericPrice: 3.5,
    requiresPrescription: false,
    description:
      'Antacid for relief of hyperacidity, heartburn, acid indigestion, and gas pains.',
    sideEffects: ['Constipation', 'Diarrhea', 'Nausea'],
    stock: {
      'br-001': 250,
      'br-002': 200,
      'br-003': 280,
      'br-004': 230,
      'br-005': 180,
      'br-008': 210,
      'br-012': 260,
    },
  },
  {
    id: 'med-033',
    brandName: 'Diatabs',
    genericName: 'Loperamide',
    category: 'Gastrointestinal',
    dosage: '2mg',
    form: 'capsule',
    price: 8.0,
    genericPrice: 3.0,
    requiresPrescription: false,
    description:
      'Anti-diarrheal that slows down intestinal movement to reduce stool frequency and improve consistency.',
    sideEffects: ['Constipation', 'Abdominal pain', 'Nausea', 'Dizziness'],
    stock: {
      'br-001': 200,
      'br-002': 160,
      'br-003': 220,
      'br-004': 180,
      'br-008': 140,
      'br-012': 190,
    },
  },
  {
    id: 'med-034',
    brandName: 'Nexium',
    genericName: 'Esomeprazole',
    category: 'Gastrointestinal',
    dosage: '40mg',
    form: 'capsule',
    price: 48.0,
    genericPrice: 18.0,
    requiresPrescription: true,
    description:
      'Proton pump inhibitor for GERD, peptic ulcer, and erosive esophagitis. Reduces stomach acid production.',
    sideEffects: ['Headache', 'Nausea', 'Flatulence', 'Abdominal pain'],
    stock: {
      'br-001': 70,
      'br-002': 55,
      'br-003': 85,
      'br-004': 60,
      'br-008': 45,
      'br-012': 75,
    },
  },
  {
    id: 'med-035',
    brandName: 'Buscopan',
    genericName: 'Hyoscine Butylbromide',
    category: 'Gastrointestinal',
    dosage: '10mg',
    form: 'tablet',
    price: 15.0,
    genericPrice: 7.0,
    requiresPrescription: false,
    description:
      'Antispasmodic for abdominal cramps, stomach pain, and menstrual cramps by relaxing smooth muscles.',
    sideEffects: ['Dry mouth', 'Blurred vision', 'Drowsiness', 'Constipation'],
    stock: {
      'br-001': 120,
      'br-002': 90,
      'br-003': 140,
      'br-004': 110,
      'br-008': 80,
      'br-012': 130,
    },
  },
  {
    id: 'med-036',
    brandName: 'Erceflora',
    genericName: 'Bacillus clausii',
    category: 'Gastrointestinal',
    dosage: '2 billion spores/5ml',
    form: 'syrup',
    price: 38.0,
    genericPrice: 20.0,
    requiresPrescription: false,
    description:
      'Probiotic supplement for restoring and maintaining gut flora, especially during or after antibiotic treatment.',
    sideEffects: ['Mild bloating (rare)', 'Flatulence'],
    stock: {
      'br-001': 80,
      'br-002': 60,
      'br-003': 100,
      'br-004': 75,
      'br-008': 50,
      'br-012': 85,
    },
  },

  // ── Dermatology ──────────────────────────────────────────────────────────
  {
    id: 'med-037',
    brandName: 'Betadine',
    genericName: 'Povidone-Iodine',
    category: 'Dermatology',
    dosage: '10%',
    form: 'ointment',
    price: 85.0,
    genericPrice: 45.0,
    requiresPrescription: false,
    description:
      'Antiseptic for the prevention and treatment of skin infections in minor cuts, wounds, and burns.',
    sideEffects: ['Skin irritation', 'Allergic reaction (rare)', 'Staining'],
    stock: {
      'br-001': 100,
      'br-002': 80,
      'br-003': 120,
      'br-004': 90,
      'br-008': 70,
      'br-012': 110,
    },
  },
  {
    id: 'med-038',
    brandName: 'Canesten',
    genericName: 'Clotrimazole',
    category: 'Dermatology',
    dosage: '1%',
    form: 'cream',
    price: 180.0,
    genericPrice: 90.0,
    requiresPrescription: false,
    description:
      'Antifungal cream for the treatment of athlete\'s foot, jock itch, ringworm, and other fungal skin infections.',
    sideEffects: ['Skin irritation', 'Burning sensation', 'Redness'],
    stock: {
      'br-001': 60,
      'br-002': 45,
      'br-003': 70,
      'br-004': 55,
      'br-008': 40,
      'br-012': 65,
    },
  },
  {
    id: 'med-039',
    brandName: 'Dermovate',
    genericName: 'Clobetasol Propionate',
    category: 'Dermatology',
    dosage: '0.05%',
    form: 'cream',
    price: 320.0,
    genericPrice: 160.0,
    requiresPrescription: true,
    description:
      'Potent topical corticosteroid for severe skin conditions such as eczema, psoriasis, and dermatitis.',
    sideEffects: ['Skin thinning', 'Burning', 'Stretch marks', 'Skin discoloration'],
    stock: {
      'br-001': 25,
      'br-002': 20,
      'br-003': 30,
      'br-008': 18,
      'br-012': 28,
    },
  },
  {
    id: 'med-040',
    brandName: 'Bactroban',
    genericName: 'Mupirocin',
    category: 'Dermatology',
    dosage: '2%',
    form: 'ointment',
    price: 290.0,
    genericPrice: 140.0,
    requiresPrescription: true,
    description:
      'Topical antibiotic for treating impetigo and other bacterial skin infections.',
    sideEffects: ['Burning', 'Stinging', 'Itching'],
    stock: {
      'br-001': 35,
      'br-002': 28,
      'br-003': 40,
      'br-004': 30,
      'br-012': 38,
    },
  },
  {
    id: 'med-041',
    brandName: 'Hydrocortisone Ointment',
    genericName: 'Hydrocortisone',
    category: 'Dermatology',
    dosage: '1%',
    form: 'ointment',
    price: 65.0,
    genericPrice: 30.0,
    requiresPrescription: false,
    description:
      'Mild corticosteroid for itch relief from insect bites, eczema, dermatitis, and other minor skin irritations.',
    sideEffects: ['Skin thinning (prolonged use)', 'Burning', 'Dryness'],
    stock: {
      'br-001': 90,
      'br-002': 70,
      'br-003': 100,
      'br-004': 80,
      'br-008': 60,
      'br-012': 95,
    },
  },

  // ── Mental Health ────────────────────────────────────────────────────────
  {
    id: 'med-042',
    brandName: 'Lexapro',
    genericName: 'Escitalopram',
    category: 'Mental Health',
    dosage: '10mg',
    form: 'tablet',
    price: 55.0,
    genericPrice: 22.0,
    requiresPrescription: true,
    description:
      'SSRI antidepressant for the treatment of major depressive disorder and generalized anxiety disorder.',
    sideEffects: ['Nausea', 'Insomnia', 'Drowsiness', 'Sexual dysfunction', 'Dry mouth'],
    stock: {
      'br-001': 40,
      'br-002': 30,
      'br-003': 50,
      'br-004': 35,
      'br-008': 25,
      'br-012': 45,
    },
  },
  {
    id: 'med-043',
    brandName: 'Xanax',
    genericName: 'Alprazolam',
    category: 'Mental Health',
    dosage: '0.5mg',
    form: 'tablet',
    price: 18.0,
    genericPrice: 8.0,
    requiresPrescription: true,
    description:
      'Benzodiazepine for the management of anxiety disorders and panic attacks. For short-term use only.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Memory impairment', 'Dependence risk'],
    stock: {
      'br-001': 20,
      'br-002': 15,
      'br-003': 25,
      'br-008': 12,
      'br-012': 22,
    },
  },
  {
    id: 'med-044',
    brandName: 'Rivotril',
    genericName: 'Clonazepam',
    category: 'Mental Health',
    dosage: '0.5mg',
    form: 'tablet',
    price: 16.0,
    genericPrice: 7.0,
    requiresPrescription: true,
    description:
      'Benzodiazepine anticonvulsant for epilepsy, panic disorder, and certain movement disorders.',
    sideEffects: ['Drowsiness', 'Coordination problems', 'Depression', 'Dependence risk'],
    stock: {
      'br-001': 25,
      'br-002': 18,
      'br-003': 30,
      'br-008': 15,
      'br-012': 28,
    },
  },
  {
    id: 'med-045',
    brandName: 'Zyprexa',
    genericName: 'Olanzapine',
    category: 'Mental Health',
    dosage: '5mg',
    form: 'tablet',
    price: 62.0,
    genericPrice: 28.0,
    requiresPrescription: true,
    description:
      'Atypical antipsychotic for schizophrenia and bipolar disorder.',
    sideEffects: ['Weight gain', 'Drowsiness', 'Dizziness', 'Increased appetite'],
    stock: {
      'br-001': 15,
      'br-002': 10,
      'br-003': 20,
      'br-008': 8,
      'br-012': 18,
    },
  },
  {
    id: 'med-046',
    brandName: 'Stilnox',
    genericName: 'Zolpidem',
    category: 'Mental Health',
    dosage: '10mg',
    form: 'tablet',
    price: 45.0,
    genericPrice: 20.0,
    requiresPrescription: true,
    description:
      'Sedative-hypnotic for short-term treatment of insomnia. Helps initiate and maintain sleep.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Headache', 'Abnormal dreams'],
    stock: {
      'br-001': 18,
      'br-002': 12,
      'br-003': 22,
      'br-008': 10,
      'br-012': 20,
    },
  },

  // ── Women's Health ───────────────────────────────────────────────────────
  {
    id: 'med-047',
    brandName: 'Althea',
    genericName: 'Cyproterone Acetate + Ethinylestradiol',
    category: "Women's Health",
    dosage: '2mg/35mcg',
    form: 'tablet',
    price: 380.0,
    genericPrice: 180.0,
    requiresPrescription: true,
    description:
      'Oral contraceptive pill also used for the treatment of acne and hirsutism in women.',
    sideEffects: ['Nausea', 'Breast tenderness', 'Headache', 'Mood changes', 'Weight gain'],
    stock: {
      'br-001': 50,
      'br-002': 40,
      'br-003': 60,
      'br-004': 45,
      'br-008': 35,
      'br-012': 55,
    },
  },
  {
    id: 'med-048',
    brandName: 'Trust Pills',
    genericName: 'Levonorgestrel + Ethinylestradiol',
    category: "Women's Health",
    dosage: '0.15mg/0.03mg',
    form: 'tablet',
    price: 45.0,
    genericPrice: 25.0,
    requiresPrescription: true,
    description:
      'Oral contraceptive pill for pregnancy prevention. Must be taken daily at the same time.',
    sideEffects: ['Nausea', 'Headache', 'Breast tenderness', 'Irregular bleeding'],
    stock: {
      'br-001': 80,
      'br-002': 65,
      'br-003': 100,
      'br-004': 75,
      'br-008': 55,
      'br-012': 85,
    },
  },
  {
    id: 'med-049',
    brandName: 'Duphaston',
    genericName: 'Dydrogesterone',
    category: "Women's Health",
    dosage: '10mg',
    form: 'tablet',
    price: 52.0,
    genericPrice: 30.0,
    requiresPrescription: true,
    description:
      'Progesterone supplement for menstrual disorders, endometriosis, infertility, and pregnancy support.',
    sideEffects: ['Nausea', 'Headache', 'Breast tenderness', 'Bloating'],
    stock: {
      'br-001': 45,
      'br-002': 35,
      'br-003': 55,
      'br-004': 40,
      'br-008': 30,
      'br-012': 50,
    },
  },
  {
    id: 'med-050',
    brandName: 'Ponstan',
    genericName: 'Mefenamic Acid',
    category: "Women's Health",
    dosage: '250mg',
    form: 'capsule',
    price: 8.0,
    genericPrice: 3.5,
    requiresPrescription: false,
    description:
      'NSAID primarily used for menstrual pain (dysmenorrhea) and mild to moderate pain relief.',
    sideEffects: ['Stomach pain', 'Nausea', 'Diarrhea', 'Dizziness'],
    stock: {
      'br-001': 200,
      'br-002': 160,
      'br-003': 230,
      'br-004': 180,
      'br-005': 130,
      'br-008': 170,
      'br-012': 210,
    },
  },
  {
    id: 'med-051',
    brandName: 'Obimin',
    genericName: 'Prenatal Vitamins + DHA',
    category: "Women's Health",
    dosage: '',
    form: 'capsule',
    price: 30.0,
    genericPrice: 18.0,
    requiresPrescription: false,
    description:
      'Prenatal multivitamin with DHA for pregnant and lactating women to support fetal development.',
    sideEffects: ['Nausea', 'Constipation', 'Dark stools'],
    stock: {
      'br-001': 70,
      'br-002': 55,
      'br-003': 80,
      'br-004': 60,
      'br-008': 45,
      'br-012': 75,
    },
  },

  // ── Additional common items ──────────────────────────────────────────────
  {
    id: 'med-052',
    brandName: 'Cetirizine (Zyrtec)',
    genericName: 'Cetirizine',
    category: 'Respiratory',
    dosage: '10mg',
    form: 'tablet',
    price: 10.0,
    genericPrice: 3.0,
    requiresPrescription: false,
    description:
      'Non-drowsy antihistamine for the relief of allergic rhinitis, sneezing, itchy eyes, and hives.',
    sideEffects: ['Drowsiness (mild)', 'Dry mouth', 'Fatigue'],
    stock: {
      'br-001': 250,
      'br-002': 200,
      'br-003': 280,
      'br-004': 220,
      'br-005': 180,
      'br-008': 210,
      'br-012': 260,
    },
  },
  {
    id: 'med-053',
    brandName: 'Strepsils',
    genericName: 'Dichlorobenzyl Alcohol + Amylmetacresol',
    category: 'Respiratory',
    dosage: '',
    form: 'tablet',
    price: 8.0,
    genericPrice: 4.0,
    requiresPrescription: false,
    description:
      'Medicated lozenges for sore throat relief. Provides antibacterial action and soothes throat irritation.',
    sideEffects: ['Mild mouth irritation (rare)'],
    stock: {
      'br-001': 300,
      'br-002': 250,
      'br-003': 330,
      'br-004': 270,
      'br-005': 210,
      'br-008': 240,
      'br-012': 290,
    },
  },
  {
    id: 'med-054',
    brandName: 'Alaxan FR',
    genericName: 'Ibuprofen + Paracetamol',
    category: 'Pain Relief',
    dosage: '200mg/325mg',
    form: 'capsule',
    price: 10.0,
    genericPrice: 5.0,
    requiresPrescription: false,
    description:
      'Double-action pain reliever combining Ibuprofen and Paracetamol for headache, muscle pain, and body aches.',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness'],
    stock: {
      'br-001': 220,
      'br-002': 180,
      'br-003': 250,
      'br-004': 200,
      'br-005': 150,
      'br-008': 190,
      'br-012': 230,
    },
  },
  {
    id: 'med-055',
    brandName: 'Benadryl',
    genericName: 'Diphenhydramine',
    category: 'Respiratory',
    dosage: '25mg',
    form: 'capsule',
    price: 9.0,
    genericPrice: 4.0,
    requiresPrescription: false,
    description:
      'Antihistamine for allergy relief, hay fever symptoms, and as a sleep aid. Also relieves itching and hives.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision', 'Constipation'],
    stock: {
      'br-001': 180,
      'br-002': 140,
      'br-003': 200,
      'br-004': 160,
      'br-008': 130,
      'br-012': 170,
    },
  },
];

// ---------------------------------------------------------------------------
// 3. Promotions (10 items)
// ---------------------------------------------------------------------------

export const promotions: Promotion[] = [
  {
    id: 'promo-001',
    title: 'Generics Month Sale',
    description:
      'Save big on generic medicines! Get up to 20% off on all generic alternatives this February. Same quality, lower prices.',
    discount: '20% OFF',
    validUntil: '2026-02-28',
    imageUrl: 'https://placehold.co/600x300/00A86B/FFFFFF?text=Generics+Month',
    category: 'General',
    featured: true,
  },
  {
    id: 'promo-002',
    title: 'Senior Citizen Discount',
    description:
      'Senior citizens and PWDs enjoy an additional 20% discount on all prescription medicines and 5% on non-prescription items.',
    discount: '20% OFF',
    validUntil: '2026-12-31',
    imageUrl: 'https://placehold.co/600x300/3B82F6/FFFFFF?text=Senior+Discount',
    category: 'Senior',
    featured: false,
  },
  {
    id: 'promo-003',
    title: 'Free Blood Pressure Check',
    description:
      'Get a free blood pressure and blood sugar screening at participating Mercury Drug branches every Saturday.',
    discount: 'FREE',
    validUntil: '2026-06-30',
    imageUrl: 'https://placehold.co/600x300/EF4444/FFFFFF?text=Free+BP+Check',
    category: 'Health Services',
    featured: true,
  },
  {
    id: 'promo-004',
    title: 'Vitamin C Bundle Deal',
    description:
      'Buy any 2 Vitamin C products and get 15% off on the second item. Boost your immunity for less!',
    discount: '15% OFF',
    validUntil: '2026-03-31',
    imageUrl: 'https://placehold.co/600x300/F59E0B/FFFFFF?text=Vitamin+C+Bundle',
    category: 'Vitamins',
    featured: true,
  },
  {
    id: 'promo-005',
    title: 'Free Delivery Weekends',
    description:
      'Enjoy free delivery on orders over P500 every Saturday and Sunday at 24/7 branches. Use code FREEDEL.',
    discount: 'FREE DELIVERY',
    validUntil: '2026-04-30',
    imageUrl: 'https://placehold.co/600x300/8B5CF6/FFFFFF?text=Free+Delivery',
    category: 'Delivery',
    featured: false,
  },
  {
    id: 'promo-006',
    title: 'Baby Care Essentials',
    description:
      'Up to 30% off on selected baby care products including diapers, formula milk, and baby vitamins.',
    discount: '30% OFF',
    validUntil: '2026-03-15',
    imageUrl: 'https://placehold.co/600x300/EC4899/FFFFFF?text=Baby+Care+Sale',
    category: 'Baby Care',
    featured: false,
  },
  {
    id: 'promo-007',
    title: 'Diabetes Care Package',
    description:
      'Get 10% off when you purchase any 3 diabetes management products together. Includes glucometers, test strips, and medications.',
    discount: '10% OFF',
    validUntil: '2026-05-31',
    imageUrl: 'https://placehold.co/600x300/10B981/FFFFFF?text=Diabetes+Care',
    category: 'Diabetes',
    featured: true,
  },
  {
    id: 'promo-008',
    title: 'Flu Season Combo',
    description:
      'Neozep + Biogesic + Solmux combo pack at a special price. Be prepared for the rainy season.',
    discount: 'P25 OFF',
    validUntil: '2026-03-31',
    imageUrl: 'https://placehold.co/600x300/6366F1/FFFFFF?text=Flu+Season+Combo',
    category: 'Respiratory',
    featured: false,
  },
  {
    id: 'promo-009',
    title: 'Heart Health Month',
    description:
      'February is Heart Health Month. Get free cardiac risk assessment and 15% off on selected cardiovascular medicines.',
    discount: '15% OFF',
    validUntil: '2026-02-28',
    imageUrl: 'https://placehold.co/600x300/EF4444/FFFFFF?text=Heart+Health',
    category: 'Cardiovascular',
    featured: true,
  },
  {
    id: 'promo-010',
    title: 'Mercury Drug Suki Card',
    description:
      'Sign up for the Suki Card and earn points on every purchase. Redeem points for discounts on your next visit!',
    discount: 'EARN POINTS',
    validUntil: '2026-12-31',
    imageUrl: 'https://placehold.co/600x300/F97316/FFFFFF?text=Suki+Card',
    category: 'Loyalty',
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// 4. Sample Prescriptions (3 items)
// ---------------------------------------------------------------------------

export const samplePrescriptions: SamplePrescription[] = [
  {
    id: 'rx-001',
    doctorName: 'Dr. Maria Santos, M.D.',
    patientName: 'Juan Dela Cruz',
    date: '2026-02-15',
    hospital: 'Makati Medical Center',
    items: [
      {
        medicineName: 'Amoxil',
        genericName: 'Amoxicillin',
        dosage: '500mg',
        frequency: '3 times a day',
        duration: '7 days',
        quantity: 21,
      },
      {
        medicineName: 'Biogesic',
        genericName: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Every 4-6 hours as needed for fever',
        duration: '5 days',
        quantity: 20,
      },
      {
        medicineName: 'Solmux',
        genericName: 'Carbocisteine',
        dosage: '500mg',
        frequency: '3 times a day',
        duration: '5 days',
        quantity: 15,
      },
    ],
  },
  {
    id: 'rx-002',
    doctorName: 'Dr. Roberto Garcia, M.D., FPCP',
    patientName: 'Elena Reyes',
    date: '2026-02-10',
    hospital: 'St. Lukes Medical Center BGC',
    items: [
      {
        medicineName: 'Glucophage',
        genericName: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice a day with meals',
        duration: '30 days',
        quantity: 60,
      },
      {
        medicineName: 'Cozaar',
        genericName: 'Losartan',
        dosage: '50mg',
        frequency: 'Once daily in the morning',
        duration: '30 days',
        quantity: 30,
      },
      {
        medicineName: 'Lipitor',
        genericName: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily at bedtime',
        duration: '30 days',
        quantity: 30,
      },
      {
        medicineName: 'Aspirin Protect',
        genericName: 'Aspirin',
        dosage: '100mg',
        frequency: 'Once daily after lunch',
        duration: '30 days',
        quantity: 30,
      },
    ],
  },
  {
    id: 'rx-003',
    doctorName: 'Dr. Angela Lim, M.D., FPOGS',
    patientName: 'Patricia Mendoza',
    date: '2026-02-18',
    hospital: 'The Medical City Ortigas',
    items: [
      {
        medicineName: 'Duphaston',
        genericName: 'Dydrogesterone',
        dosage: '10mg',
        frequency: 'Twice a day',
        duration: '14 days',
        quantity: 28,
      },
      {
        medicineName: 'Obimin',
        genericName: 'Prenatal Vitamins + DHA',
        dosage: '1 capsule',
        frequency: 'Once daily',
        duration: '30 days',
        quantity: 30,
      },
      {
        medicineName: 'Sangobion',
        genericName: 'Iron + Folic Acid + Vitamin B12',
        dosage: '1 capsule',
        frequency: 'Once daily',
        duration: '30 days',
        quantity: 30,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. Vaccines (10 items)
// ---------------------------------------------------------------------------

export const vaccines: Vaccine[] = [
  {
    id: 'vax-001',
    name: 'Flu Vaccine (Influenza)',
    description:
      'Annual influenza vaccine to protect against common seasonal flu strains. Recommended before rainy season.',
    price: 1500.0,
    ageGroup: '6 months and above',
    doses: 1,
    availability: ['br-001', 'br-002', 'br-003', 'br-006', 'br-009', 'br-011', 'br-012', 'br-013'],
  },
  {
    id: 'vax-002',
    name: 'Pneumococcal Vaccine (Pneumonia)',
    description:
      'Protects against pneumococcal bacteria that can cause pneumonia, meningitis, and bloodstream infections.',
    price: 4500.0,
    ageGroup: '2 months and above; adults 65+',
    doses: 1,
    availability: ['br-002', 'br-003', 'br-006', 'br-011', 'br-012'],
  },
  {
    id: 'vax-003',
    name: 'Hepatitis B Vaccine',
    description:
      'Protects against Hepatitis B virus infection which can cause chronic liver disease and liver cancer.',
    price: 800.0,
    ageGroup: 'All ages',
    doses: 3,
    availability: ['br-001', 'br-002', 'br-003', 'br-005', 'br-009', 'br-012', 'br-015'],
  },
  {
    id: 'vax-004',
    name: 'HPV Vaccine (Gardasil 9)',
    description:
      'Protects against human papillomavirus (HPV) types that cause cervical cancer, genital warts, and other cancers.',
    price: 8000.0,
    ageGroup: '9-45 years old',
    doses: 3,
    availability: ['br-002', 'br-003', 'br-011', 'br-012'],
  },
  {
    id: 'vax-005',
    name: 'Tetanus Toxoid (TT)',
    description:
      'Protects against tetanus (lockjaw), a serious bacterial infection. Essential for wound prevention.',
    price: 350.0,
    ageGroup: 'All ages',
    doses: 2,
    availability: ['br-001', 'br-002', 'br-003', 'br-004', 'br-006', 'br-008', 'br-012', 'br-015'],
  },
  {
    id: 'vax-006',
    name: 'COVID-19 Booster (Bivalent)',
    description:
      'Updated COVID-19 booster vaccine targeting both original and Omicron variants. For previously vaccinated individuals.',
    price: 0.0,
    ageGroup: '12 years and above',
    doses: 1,
    availability: ['br-002', 'br-003', 'br-006', 'br-012', 'br-013'],
  },
  {
    id: 'vax-007',
    name: 'Chickenpox Vaccine (Varicella)',
    description:
      'Protects against varicella-zoster virus which causes chickenpox. Highly recommended for children.',
    price: 2500.0,
    ageGroup: '12 months and above',
    doses: 2,
    availability: ['br-001', 'br-002', 'br-003', 'br-009', 'br-011', 'br-012'],
  },
  {
    id: 'vax-008',
    name: 'Measles-Mumps-Rubella (MMR)',
    description:
      'Combined vaccine for three viral diseases. Part of the standard childhood immunization schedule.',
    price: 1200.0,
    ageGroup: '12 months and above',
    doses: 2,
    availability: ['br-001', 'br-002', 'br-003', 'br-005', 'br-006', 'br-012', 'br-013', 'br-015'],
  },
  {
    id: 'vax-009',
    name: 'Typhoid Vaccine',
    description:
      'Protects against Salmonella typhi, the bacteria that causes typhoid fever. Recommended for travelers and food handlers.',
    price: 1800.0,
    ageGroup: '2 years and above',
    doses: 1,
    availability: ['br-002', 'br-003', 'br-006', 'br-012'],
  },
  {
    id: 'vax-010',
    name: 'Shingles Vaccine (Shingrix)',
    description:
      'Prevents shingles (herpes zoster) and its complications. Highly recommended for adults over 50.',
    price: 10000.0,
    ageGroup: '50 years and above',
    doses: 2,
    availability: ['br-002', 'br-003', 'br-012'],
  },
];

// ---------------------------------------------------------------------------
// 6. Chat Responses (keyword → response map)
// ---------------------------------------------------------------------------

export const chatResponses: Record<string, ChatResponse> = {
  headache: {
    message:
      'For headaches, over-the-counter pain relievers are usually effective. Paracetamol (Biogesic) is the safest first choice. If it persists or is accompanied by fever, Ibuprofen (Advil, Medicol) may help. Stay hydrated and rest. If headaches are frequent or severe, please consult a doctor.',
    suggestedMedicines: ['med-001', 'med-003', 'med-005', 'med-054'],
  },
  fever: {
    message:
      'For fever management, Paracetamol (Biogesic) 500mg every 4-6 hours is the first-line treatment. Drink plenty of fluids, rest, and use a cool compress. If fever exceeds 39C (102.2F) or lasts more than 3 days, please see a doctor immediately.',
    suggestedMedicines: ['med-001', 'med-003'],
  },
  cough: {
    message:
      'For cough relief, the treatment depends on the type. For productive cough with phlegm, Solmux (Carbocisteine) helps thin and expel mucus. For dry cough, Robitussin DM can help suppress the reflex. Lagundi is an effective herbal option. If cough persists for more than a week, consult a doctor.',
    suggestedMedicines: ['med-027', 'med-028', 'med-031'],
  },
  cold: {
    message:
      'For colds and flu, a multi-symptom reliever like Neozep or Decolgen can address congestion, runny nose, and body aches. Pair it with Vitamin C (Immunpro) for immune support. Stay hydrated and get plenty of rest. See a doctor if symptoms worsen after 3-5 days.',
    suggestedMedicines: ['med-026', 'med-030', 'med-014', 'med-053'],
  },
  allergy: {
    message:
      'For allergic reactions like sneezing, runny nose, and itchy eyes, Cetirizine (Zyrtec) is an effective non-drowsy antihistamine. Benadryl (Diphenhydramine) is stronger but may cause drowsiness. For skin allergies, Hydrocortisone cream can help. If you experience difficulty breathing or swelling, seek emergency care immediately.',
    suggestedMedicines: ['med-052', 'med-055', 'med-041'],
  },
  pain: {
    message:
      'For general pain relief, Paracetamol (Biogesic) is safest for mild pain. For moderate pain with inflammation, Ibuprofen (Advil/Medicol) or Mefenamic Acid (Dolfenal) may be more effective. Alaxan FR combines both for stronger relief. Avoid taking NSAIDs on an empty stomach. See a doctor if pain is severe or persists.',
    suggestedMedicines: ['med-001', 'med-002', 'med-003', 'med-005', 'med-054'],
  },
  vitamin: {
    message:
      'Staying on top of your vitamins is great! Enervon is a popular daily multivitamin with iron. Immunpro provides Vitamin C and Zinc for immune support. Berocca is great for energy and mental alertness. For seniors, Centrum Silver is specially formulated. For pregnant women, Obimin provides essential prenatal nutrients.',
    suggestedMedicines: ['med-011', 'med-012', 'med-013', 'med-014', 'med-051'],
  },
  pregnant: {
    message:
      'Congratulations! During pregnancy, prenatal vitamins like Obimin are essential for fetal development. Sangobion helps prevent iron-deficiency anemia. Always consult your OB-GYN before taking any medication. Avoid self-medication — many common medicines are NOT safe during pregnancy. Regular prenatal check-ups are very important.',
    suggestedMedicines: ['med-051', 'med-015'],
  },
  generic: {
    message:
      'Generic medicines contain the same active ingredients as branded ones and are equally effective — they just cost less! At Mercury Drug, we carry a wide range of affordable generics. Ask our pharmacist about generic alternatives for your prescription. You can save 40-70% by switching to generics.',
  },
  'side effects': {
    message:
      'Side effects vary by medication. Common mild side effects include nausea, headache, and drowsiness — these often go away as your body adjusts. Always read the patient information leaflet. If you experience severe side effects like difficulty breathing, swelling, or severe rash, stop the medication and seek medical attention immediately.',
  },
  dosage: {
    message:
      'Always follow the dosage instructions on the label or as prescribed by your doctor. Never exceed the recommended dose. Take medications at the same time each day for best results. If you miss a dose, take it as soon as you remember — but skip it if it is almost time for your next dose. Never double up.',
  },
  stomach: {
    message:
      'For stomach issues: Kremil-S helps with hyperacidity and heartburn. Diatabs can manage diarrhea. Buscopan relieves abdominal cramps. Erceflora is a probiotic that restores gut balance. Avoid spicy and acidic food. If symptoms persist for more than 2 days or include blood in stool, see a doctor.',
    suggestedMedicines: ['med-032', 'med-033', 'med-035', 'med-036'],
  },
  diabetes: {
    message:
      'For diabetes management, Metformin (Glucophage) is the most common first-line medication. Regular blood sugar monitoring is crucial. Maintain a balanced diet, exercise regularly, and take your medications as prescribed. Mercury Drug offers glucometers and test strips. Always consult your endocrinologist for medication adjustments.',
    suggestedMedicines: ['med-021', 'med-022'],
  },
  'blood pressure': {
    message:
      'For high blood pressure, common medications include Losartan (Cozaar), Amlodipine (Norvasc), and Bisoprolol (Concor). These are prescription medicines — please see your doctor first. Lifestyle changes like reducing salt, regular exercise, and maintaining a healthy weight also help. Mercury Drug offers free BP checks on weekends!',
    suggestedMedicines: ['med-016', 'med-017', 'med-019'],
  },
  anxiety: {
    message:
      'For anxiety concerns, please consult a psychiatrist or mental health professional for proper assessment. Prescription options like Escitalopram (Lexapro) may be recommended. In the meantime, practice deep breathing exercises, limit caffeine, and maintain regular sleep. Mercury Drug pharmacists can help you with your prescribed mental health medications.',
    suggestedMedicines: ['med-042'],
  },
  skin: {
    message:
      'For skin concerns: Betadine treats minor wounds and infections. Canesten cream handles fungal infections like athlete\'s foot. Hydrocortisone ointment relieves itching from insect bites or mild eczema. For more severe conditions, a dermatologist may prescribe stronger options like Dermovate or Bactroban.',
    suggestedMedicines: ['med-037', 'med-038', 'med-041'],
  },
  hello: {
    message:
      'Hello! Welcome to Mercury+ AI Health Assistant. I can help you with medicine information, symptom relief suggestions, and pharmacy services. Try asking me about headache, fever, cough, vitamins, or any health concern. Remember — for serious symptoms, always consult a doctor!',
  },
  help: {
    message:
      'I can assist you with:\n- Symptom-based medicine suggestions (headache, fever, cough, etc.)\n- Medicine information and side effects\n- Generic medicine alternatives\n- Dosage guidance\n- Vitamin recommendations\n- Locating nearby branches\n\nJust type your question or symptom and I will do my best to help!',
  },
};

// ---------------------------------------------------------------------------
// 7. Health Tips (6 items)
// ---------------------------------------------------------------------------

export const healthTips: HealthTip[] = [
  {
    id: 'tip-001',
    title: 'Stay Hydrated',
    description:
      'Drink at least 8 glasses of water daily. Proper hydration supports digestion, circulation, and body temperature regulation.',
    icon: 'water-outline',
  },
  {
    id: 'tip-002',
    title: 'Take Your Vitamins',
    description:
      'A daily multivitamin helps fill nutritional gaps. Vitamin C and Zinc are especially important for immune health during rainy season.',
    icon: 'medkit-outline',
  },
  {
    id: 'tip-003',
    title: 'Move Your Body',
    description:
      'Aim for at least 30 minutes of moderate exercise daily. Walking, jogging, or dancing can reduce the risk of heart disease and diabetes.',
    icon: 'fitness-outline',
  },
  {
    id: 'tip-004',
    title: 'Get Enough Sleep',
    description:
      'Adults need 7-9 hours of quality sleep. Poor sleep weakens your immune system and increases the risk of chronic diseases.',
    icon: 'moon-outline',
  },
  {
    id: 'tip-005',
    title: 'Wash Hands Frequently',
    description:
      'Regular handwashing with soap for at least 20 seconds prevents the spread of infections and respiratory diseases.',
    icon: 'hand-left-outline',
  },
  {
    id: 'tip-006',
    title: 'Schedule Regular Check-Ups',
    description:
      'Visit your doctor at least once a year for preventive health screening. Early detection is key to managing chronic conditions.',
    icon: 'calendar-outline',
  },
];

// ---------------------------------------------------------------------------
// 8. FAQ Items (10 items)
// ---------------------------------------------------------------------------

export const faqItems: FAQItem[] = [
  {
    question: 'How do I order medicines for delivery?',
    answer:
      'You can order through the Mercury+ app by browsing our medicine catalog, adding items to your cart, and selecting delivery at checkout. Delivery is available from branches with the "24/7 Delivery" service. Orders over P500 qualify for free delivery on weekends.',
  },
  {
    question: 'Can I buy prescription medicines without a prescription?',
    answer:
      'No. Prescription medicines (marked with an Rx symbol) require a valid prescription from a licensed physician. You can upload a photo of your prescription through the app, and our pharmacist will verify it before dispensing.',
  },
  {
    question: 'How does the prescription scanner work?',
    answer:
      'Simply take a clear photo of your prescription using the app. Our AI-powered scanner reads the medicine names, dosages, and quantities. It then matches them to available products and suggests generic alternatives to help you save money.',
  },
  {
    question: 'What are generic medicines and are they safe?',
    answer:
      'Generic medicines contain the same active ingredients, dosage, and quality as their branded counterparts. They are approved by the Philippine FDA and are equally safe and effective. The main difference is the price — generics can cost 40-70% less.',
  },
  {
    question: 'What is the Senior Citizen / PWD discount?',
    answer:
      'Senior citizens (60 years and above) and persons with disabilities are entitled to 20% discount on prescription medicines and 5% discount on non-prescription items, plus VAT exemption. Present a valid Senior Citizen ID or PWD ID at the counter.',
  },
  {
    question: 'How do I find the nearest Mercury Drug branch?',
    answer:
      'Use the Branch Locator in the app. It uses your GPS location to find the nearest branches, shows their operating hours, available services, and lets you check if specific medicines are in stock.',
  },
  {
    question: 'Can I reserve medicines for pick-up?',
    answer:
      'Yes! You can reserve medicines through the app and pick them up at your preferred branch. Reservations are held for 24 hours. This is especially useful for prescription medicines to ensure availability.',
  },
  {
    question: 'What vaccines are available at Mercury Drug?',
    answer:
      'We offer a variety of vaccines including Flu, Pneumonia, Hepatitis B, HPV, Tetanus, COVID-19 boosters, Chickenpox, MMR, and more. Availability varies by branch. Check the Vaccines section in the app for schedules and to book your appointment.',
  },
  {
    question: 'How does the Suki Card loyalty program work?',
    answer:
      'The Suki Card lets you earn points on every purchase. Accumulate points to enjoy discounts on future transactions. Sign up for free at any Mercury Drug branch or through the app. You earn 1 point for every P200 spent.',
  },
  {
    question: 'What should I do if I experience side effects?',
    answer:
      'If you experience mild side effects, they often subside as your body adjusts. However, if you experience severe reactions such as difficulty breathing, severe rash, swelling, or chest pain, stop the medication immediately and seek emergency medical care. You can also report adverse drug reactions to the FDA Philippines.',
  },
];
