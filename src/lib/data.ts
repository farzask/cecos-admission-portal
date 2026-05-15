// Static data for the CECOS Admission Portal landing page.
// All English-only for now; bilingual labels are wired via i18n where it matters
// (section copy). Program/scholarship names stay in English (they're proper nouns).

// ─── Fee structure types ─────────────────────────────────────────────────────
export type FeeRow = {
  program: string;
  admissionFee: number;
  firstSemesterFee: number;
  onwardSemesterFee: number;
  totalCourseFee: number;
  semesters: number;
  notes?: string;
};

export type FeeGroup = {
  id: string;
  groupNumber: number;
  title: string;
  level: 'UG' | 'PG';
  feeRange: string;      // human-readable range shown in collapsed row
  rows: FeeRow[];
};

export type DisciplineGroup = {
  number: number;
  name: string;
  examples: string[];
  test: 'ETEA required' | 'CECOS / NTS / ETEA test';
};

export const disciplineGroups: DisciplineGroup[] = [
  {
    number: 1,
    name: 'Engineering',
    examples: [
      'B.Sc Civil Engineering',
      'B.Sc Electrical Engineering',
      'B.Sc Mechanical Engineering'
    ],
    test: 'ETEA required'
  },
  {
    number: 2,
    name: 'Arts and Humanities',
    examples: [
      'Bachelor of Architecture',
      'BS English',
      'BS Psychology',
      'BS Mathematics'
    ],
    test: 'CECOS / NTS / ETEA test'
  },
  {
    number: 3,
    name: 'Management and Computer Sciences',
    examples: [
      'BS Computer Science',
      'BS Software Engineering',
      'BS Artificial Intelligence',
      'BS Computer Engineering',
      'BS Business Administration',
      'BS Accounting and Finance'
    ],
    test: 'CECOS / NTS / ETEA test'
  },
  {
    number: 4,
    name: 'Technologies',
    examples: [
      'B.Sc Civil Technology',
      'B.Sc Electrical Technology',
      'B.Sc Mechanical Technology'
    ],
    test: 'CECOS / NTS / ETEA test'
  },
  {
    number: 5,
    name: 'Medical Sciences',
    examples: [
      'Doctor of Physiotherapy',
      'Doctor of Pharmacy',
      'Medical Lab Technologies',
      'BS Dental',
      'BS Radiology',
      'BS Nursing'
    ],
    test: 'CECOS / NTS / ETEA test'
  },
  {
    number: 6,
    name: 'MS Programs',
    examples: [
      'MS (Civil - Structural Engineering)',
      'MS (Civil - Water resources & Environmental Engineering)',
      'MS (Civil - Construction Engineering Management)',
      'MS (Civil - Geo-Tech)',
      'MS (Elect - Communication)',
      'MS (Elect - Power & Control Engineering)',
      'MS Engineering Management',
      'MS Mechanical Engineering',
      'Master in Architecture',
      'MBA(Business)',
      'MS Management Science (Finance, Marketing HRM)',
      'MBA(Non-Business)',
      'MS Project Management',
      'MS Applied Mathematics',
      'MS Computer Science',
      'MS Software Engineering',
      'MS Biotechnology',
      'MS Pharmacy-Pharmaceutics',
      'MS Pharmacy-Pharmacology',
      'MS Pharmacy-Pharmacy Practice'
    ],
    test: 'CECOS / NTS / ETEA test'
  }];


export type Program = {
  id: string;
  name: string;
  group: number;
  minPercent: number;
  duration: string;
  test: string;
  // tags align with quiz Step 3 categories
  interests: string[];
  // backgrounds eligible (Step 1)
  backgrounds: string[];
  level: 'UG' | 'PG';
};

export const programs: Program[] = [
  // Group 1 — Engineering (ETEA required, Pre-Eng + A-Levels)
  {
    id: 'bsc-civil',
    name: 'BSc Civil Engineering',
    group: 1,
    minPercent: 60,
    duration: '4 years',
    test: 'ETEA',
    interests: ['Engineering'],
    backgrounds: ['Pre-Engineering', 'A-Levels', 'Diploma of Associate Engineer'],
    level: 'UG'
  },
  {
    id: 'bsc-electrical',
    name: 'BSc Electrical Engineering',
    group: 1,
    minPercent: 60,
    duration: '4 years',
    test: 'ETEA',
    interests: ['Engineering', 'AI / Robotics'],
    backgrounds: ['Pre-Engineering', 'A-Levels', 'Diploma of Associate Engineer'],
    level: 'UG'
  },
  {
    id: 'bsc-mechanical',
    name: 'BSc Mechanical Engineering',
    group: 1,
    minPercent: 60,
    duration: '4 years',
    test: 'ETEA',
    interests: ['Engineering'],
    backgrounds: ['Pre-Engineering', 'A-Levels', 'Diploma of Associate Engineer'],
    level: 'UG'
  },

  // Group 2 — Arts & Humanities
  {
    id: 'architecture',
    name: 'BSc Architecture',
    group: 2,
    minPercent: 50,
    duration: '5 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Architecture', 'Arts & Psychology'],
    backgrounds: [
      'Pre-Engineering',
      'Pre-Medical',
      'ICS',
      'FA / Arts & Humanities',
      'A-Levels'],

    level: 'UG'
  },
  {
    id: 'bs-english',
    name: 'BS English',
    group: 2,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Arts & Psychology'],
    backgrounds: [
      'Pre-Engineering',
      'Pre-Medical',
      'ICS',
      'FA / Arts & Humanities',
      'A-Levels'],

    level: 'UG'
  },
  {
    id: 'bs-psychology',
    name: 'BS Psychology',
    group: 2,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Arts & Psychology'],
    backgrounds: [
      'Pre-Engineering',
      'Pre-Medical',
      'ICS',
      'FA / Arts & Humanities',
      'A-Levels'],

    level: 'UG'
  },
  {
    id: 'bs-mathematics',
    name: 'BS Mathematics',
    group: 2,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Mathematics'],
    backgrounds: ['Pre-Engineering', 'Pre-Medical', 'ICS', 'A-Levels'],
    level: 'UG'
  },

  // Group 3 — Management & Computer Sciences
  {
    id: 'bs-cs',
    name: 'BS Computer Science',
    group: 3,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Computer Science', 'AI / Robotics'],
    backgrounds: ['Pre-Engineering', 'Pre-Medical', 'ICS', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-se',
    name: 'BS Software Engineering',
    group: 3,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Computer Science'],
    backgrounds: ['Pre-Engineering', 'ICS', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-ai',
    name: 'BS Artificial Intelligence',
    group: 3,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['AI / Robotics', 'Computer Science'],
    backgrounds: ['Pre-Engineering', 'ICS', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-ce',
    name: 'BS Computer Engineering',
    group: 3,
    minPercent: 55,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Engineering', 'Computer Science', 'AI / Robotics'],
    backgrounds: ['Pre-Engineering', 'A-Levels', 'Diploma of Associate Engineer'],
    level: 'UG'
  },
  {
    id: 'bba',
    name: 'BBA',
    group: 3,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Business'],
    backgrounds: [
      'Pre-Engineering',
      'Pre-Medical',
      'ICS',
      'FA / Arts & Humanities',
      'A-Levels'],

    level: 'UG'
  },
  {
    id: 'bs-af',
    name: 'BS Accounting & Finance',
    group: 3,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Business', 'Mathematics'],
    backgrounds: [
      'Pre-Engineering',
      'Pre-Medical',
      'ICS',
      'FA / Arts & Humanities',
      'A-Levels'],

    level: 'UG'
  },

  // Group 4 — Engineering Technologies
  {
    id: 'bs-civil-tech',
    name: 'BS Civil Technology',
    group: 4,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Engineering'],
    backgrounds: ['Pre-Engineering', 'Diploma of Associate Engineer', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-electrical-tech',
    name: 'BS Electrical Technology',
    group: 4,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Engineering'],
    backgrounds: ['Pre-Engineering', 'Diploma of Associate Engineer', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-mechanical-tech',
    name: 'BS Mechanical Technology',
    group: 4,
    minPercent: 45,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Engineering'],
    backgrounds: ['Pre-Engineering', 'Diploma of Associate Engineer', 'A-Levels'],
    level: 'UG'
  },

  // Group 5 — Medical Sciences
  {
    id: 'dpt',
    name: 'Doctor of Physical Therapy (DPT)',
    group: 5,
    minPercent: 60,
    duration: '5 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Pre-Medical', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'pharmd',
    name: 'PharmD',
    group: 5,
    minPercent: 60,
    duration: '5 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Pre-Medical', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-mlt',
    name: 'BS Medical Lab Technology',
    group: 5,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Pre-Medical', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-dental',
    name: 'BS Dental Technology',
    group: 5,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Pre-Medical', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-radiology',
    name: 'BS Radiology',
    group: 5,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Pre-Medical', 'A-Levels'],
    level: 'UG'
  },
  {
    id: 'bs-nursing',
    name: 'BS Nursing',
    group: 5,
    minPercent: 50,
    duration: '4 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Pre-Medical', 'A-Levels'],
    level: 'UG'
  },

  // Postgrad (Groups 6–9) — only show to PG background
  {
    id: 'ms-civil',
    name: 'MS Civil Engineering',
    group: 6,
    minPercent: 60,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Engineering'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'ms-electrical',
    name: 'MS Electrical Engineering',
    group: 6,
    minPercent: 60,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Engineering'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'mba',
    name: 'MBA',
    group: 7,
    minPercent: 50,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Business'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'ms-arch',
    name: 'MS Architecture',
    group: 7,
    minPercent: 50,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Architecture'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'ms-cs',
    name: 'MS Computer Science',
    group: 8,
    minPercent: 50,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Computer Science', 'AI / Robotics'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'ms-se',
    name: 'MS Software Engineering',
    group: 8,
    minPercent: 50,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Computer Science'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'ms-pharm',
    name: 'MS Pharmacy',
    group: 9,
    minPercent: 50,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Medical & Health'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  },
  {
    id: 'ms-math',
    name: 'MS Mathematics',
    group: 9,
    minPercent: 50,
    duration: '2 years',
    test: 'CECOS / NTS / ETEA',
    interests: ['Mathematics'],
    backgrounds: ['Postgraduate'],
    level: 'PG'
  }];


// ─── Fee groups data (replace placeholder fees once document is provided) ────
export const feeGroups: FeeGroup[] = [
  {
    id: 'engineering',
    groupNumber: 1,
    title: 'Engineering',
    level: 'UG',
    feeRange: 'PKR 110,000 – 190,000 / 1st semester',
    rows: [
      { program: 'BSc Civil Engineering', admissionFee: 30000, firstSemesterFee: 190000, onwardSemesterFee: 180000, totalCourseFee: 1450000, semesters: 8, notes: 'Survey Camp Rs. 35,000' },
      { program: 'BSc Electrical Engineering', admissionFee: 30000, firstSemesterFee: 130000, onwardSemesterFee: 110000, totalCourseFee: 900000, semesters: 8 },
      { program: 'BSc Mechanical Engineering', admissionFee: 30000, firstSemesterFee: 130000, onwardSemesterFee: 110000, totalCourseFee: 900000, semesters: 8 },
    ],
  },
  {
    id: 'arts-humanities',
    groupNumber: 2,
    title: 'Arts & Humanities',
    level: 'UG',
    feeRange: 'PKR 80,000 – 185,000 / 1st semester',
    rows: [
      { program: 'BSc Architecture', admissionFee: 30000, firstSemesterFee: 185000, onwardSemesterFee: 155000, totalCourseFee: 1580000, semesters: 10 },
      { program: 'BS English', admissionFee: 30000, firstSemesterFee: 90000, onwardSemesterFee: 60000, totalCourseFee: 510000, semesters: 8 },
      { program: 'BS Psychology', admissionFee: 30000, firstSemesterFee: 80000, onwardSemesterFee: 50000, totalCourseFee: 430000, semesters: 8 },
      { program: 'BS Mathematics', admissionFee: 30000, firstSemesterFee: 80000, onwardSemesterFee: 50000, totalCourseFee: 430000, semesters: 8 },
    ],
  },
  {
    id: 'management-cs',
    groupNumber: 3,
    title: 'Management & Computer Sciences',
    level: 'UG',
    feeRange: 'PKR 110,000 – 140,000 / 1st semester',
    rows: [
      { program: 'BS Computer Science', admissionFee: 30000, firstSemesterFee: 140000, onwardSemesterFee: 110000, totalCourseFee: 910000, semesters: 8 },
      { program: 'BS Software Engineering', admissionFee: 30000, firstSemesterFee: 140000, onwardSemesterFee: 110000, totalCourseFee: 910000, semesters: 8 },
      { program: 'BS Artificial Intelligence', admissionFee: 30000, firstSemesterFee: 140000, onwardSemesterFee: 110000, totalCourseFee: 910000, semesters: 8 },
      { program: 'BS Computer Engineering', admissionFee: 30000, firstSemesterFee: 140000, onwardSemesterFee: 110000, totalCourseFee: 910000, semesters: 8 },
      { program: 'BS Robotics and AI', admissionFee: 30000, firstSemesterFee: 140000, onwardSemesterFee: 110000, totalCourseFee: 910000, semesters: 8 },
      { program: 'BBA', admissionFee: 30000, firstSemesterFee: 110000, onwardSemesterFee: 80000, totalCourseFee: 670000, semesters: 8 },
      { program: 'BS Accounting & Finance', admissionFee: 30000, firstSemesterFee: 110000, onwardSemesterFee: 80000, totalCourseFee: 670000, semesters: 8 },
      { program: 'BS Business Analytics', admissionFee: 30000, firstSemesterFee: 110000, onwardSemesterFee: 80000, totalCourseFee: 670000, semesters: 8 },
    ],
  },
  {
    id: 'engineering-tech',
    groupNumber: 4,
    title: 'Engineering Technologies',
    level: 'UG',
    feeRange: 'PKR 70,000 / 1st semester',
    rows: [
      { program: 'BS Civil Technology', admissionFee: 20000, firstSemesterFee: 70000, onwardSemesterFee: 50000, totalCourseFee: 420000, semesters: 8 },
      { program: 'BS Electrical Technology', admissionFee: 20000, firstSemesterFee: 70000, onwardSemesterFee: 50000, totalCourseFee: 420000, semesters: 8 },
      { program: 'BS Mechanical Technology', admissionFee: 20000, firstSemesterFee: 70000, onwardSemesterFee: 50000, totalCourseFee: 420000, semesters: 8 },
    ],
  },
  {
    id: 'medical',
    groupNumber: 5,
    title: 'Medical Sciences',
    level: 'UG',
    feeRange: 'PKR 100,000 – 195,000 / 1st semester',
    rows: [
      { program: 'PharmD', admissionFee: 30000, firstSemesterFee: 195000, onwardSemesterFee: 165000, totalCourseFee: 1680000, semesters: 10, notes: 'Clinical Rotation actual' },
      { program: 'Doctor of Physical Therapy (DPT)', admissionFee: 30000, firstSemesterFee: 120000, onwardSemesterFee: 90000, totalCourseFee: 930000, semesters: 10, notes: 'Clinical Rotation actual' },
      { program: 'Bachelor of Nursing (BSN)', admissionFee: 30000, firstSemesterFee: 190000, onwardSemesterFee: 160000, totalCourseFee: 1310000, semesters: 8, notes: 'Clinical Rotation actual' },
      { program: 'BS Medical Lab Technology', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 590000, semesters: 8, notes: 'Clinical Rotation actual' },
      { program: 'BS Radiology Technology', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 590000, semesters: 8, notes: 'Clinical Rotation actual' },
      { program: 'BS Anesthesia Technology', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 590000, semesters: 8, notes: 'Clinical Rotation actual' },
      { program: 'BS Dental Technology', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 590000, semesters: 8, notes: 'Clinical Rotation actual' },
    ],
  },
  {
    id: 'ms-eng-arch',
    groupNumber: 6,
    title: 'MS — Engineering & Architecture',
    level: 'PG',
    feeRange: 'PKR 95,000 – 110,000 / 1st semester',
    rows: [
      { program: 'MS Civil Engineering', admissionFee: 30000, firstSemesterFee: 95000, onwardSemesterFee: 65000, totalCourseFee: 290000, semesters: 4 },
      { program: 'MS Electrical Engineering', admissionFee: 30000, firstSemesterFee: 110000, onwardSemesterFee: 80000, totalCourseFee: 350000, semesters: 4 },
      { program: 'MS Architecture', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 310000, semesters: 4 },
    ],
  },
  {
    id: 'ms-business',
    groupNumber: 7,
    title: 'MS — Architecture, Business & Management',
    level: 'PG',
    feeRange: 'PKR 90,000 – 105,000 / 1st semester',
    rows: [
      { program: 'MBA', admissionFee: 30000, firstSemesterFee: 105000, onwardSemesterFee: 75000, totalCourseFee: 330000, semesters: 4 },
      { program: 'MS Management', admissionFee: 30000, firstSemesterFee: 90000, onwardSemesterFee: 60000, totalCourseFee: 270000, semesters: 4 },
    ],
  },
  {
    id: 'ms-cs',
    groupNumber: 8,
    title: 'MS — Computer Science & Software Engineering',
    level: 'PG',
    feeRange: 'PKR 95,000 – 105,000 / 1st semester',
    rows: [
      { program: 'MS Computer Science', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 310000, semesters: 4 },
      { program: 'MS Software Engineering', admissionFee: 30000, firstSemesterFee: 95000, onwardSemesterFee: 65000, totalCourseFee: 290000, semesters: 4 },
      { program: 'MS Artificial Intelligence', admissionFee: 30000, firstSemesterFee: 105000, onwardSemesterFee: 75000, totalCourseFee: 330000, semesters: 4 },
    ],
  },
  {
    id: 'ms-science',
    groupNumber: 9,
    title: 'MS — Science & Pharmacy',
    level: 'PG',
    feeRange: 'PKR 90,000 – 100,000 / 1st semester',
    rows: [
      { program: 'MS Pharmacy', admissionFee: 30000, firstSemesterFee: 100000, onwardSemesterFee: 70000, totalCourseFee: 310000, semesters: 4 },
      { program: 'MS Mathematics', admissionFee: 30000, firstSemesterFee: 90000, onwardSemesterFee: 60000, totalCourseFee: 270000, semesters: 4 },
    ],
  }
];

export const backgroundOptions = [
  'Pre-Engineering',
  'Pre-Medical',
  'ICS',
  'FA / Arts & Humanities',
  'Diploma of Associate Engineer',
  'A-Levels'] as
  const;

export const interestOptions = [
  'Engineering',
  'Computer Science',
  'AI / Robotics',
  'Business',
  'Medical & Health',
  'Architecture',
  'Arts & Psychology',
  'Mathematics'] as
  const;

export type Scholarship = {
  name: string;
  reduction: string;
  description: string;
  tag: string;
  categories: ('merit' | 'female' | 'need' | 'regional' | 'family')[];
};

export const scholarships: Scholarship[] = [
  {
    name: 'Female Concession',
    reduction: '20%',
    description: '20% in tuition fee (For all female).',
    tag: 'Female Concession',
    categories: ['female']
  },
  {
    name: 'Kinship Concession',
    reduction: '20%',
    description: '20% in tuition fee.',
    tag: 'Family',
    categories: ['family']
  },
  {
    name: 'Armed Forces Concession',
    reduction: '15%',
    description: '15% in tuition fee.',
    tag: 'Family',
    categories: ['family']
  },
  {
    name: 'CECOS Employees Concession',
    reduction: '50%',
    description: '50% in tuition fee to the employees of CECOS University in course(s) offered on weekends.',
    tag: 'Family',
    categories: ['family']
  },
  {
    name: 'CECOS Employees Children Concession',
    reduction: '40%',
    description: '40% in tuition fee to sons / daughters of full time regular employees.',
    tag: 'Family',
    categories: ['family']
  },
  {
    name: 'Alumni Concessions (MS Students)',
    reduction: 'up to 50%',
    description: '50% in tuition fee (for Gold medalists) and 25% for others.',
    tag: 'Alumni',
    categories: ['merit', 'family']
  },
  {
    name: 'Merit Based Scholarships',
    reduction: 'up to 100%',
    description: '5 seats in each department allocated to the top-scoring students based on FSc results.',
    tag: 'Merit',
    categories: ['merit']
  },
  {
    name: 'Talent Hunt Scholarship',
    reduction: 'up to 100%',
    description: '15 seats awarded to the top candidates based on combined test and FSc scores.',
    tag: 'Merit',
    categories: ['merit']
  },
  {
    name: 'Position Holders',
    reduction: 'up to 50%',
    description: 'Up to 50% concession based on class positions in respective programs.',
    tag: 'Merit',
    categories: ['merit']
  },
  {
    name: 'Police Shuhuda Scholarship',
    reduction: '100%',
    description: '100% Tuition Fee. 18 seats are allocated for families of police martyrs.',
    tag: 'Family',
    categories: ['family', 'need']
  },
  {
    name: 'ROSE Scholarship',
    reduction: 'up to 80%',
    description: '11 Seats allocated for Chitral Students only.',
    tag: 'Regional',
    categories: ['regional', 'need']
  },
  {
    name: 'Malala Future Scholar Program',
    reduction: '40%',
    description: '40% concession in Tuition Fee. 5 Seats for Female only.',
    tag: 'Female Concession',
    categories: ['female', 'merit']
  },
  {
    name: 'PDA Scholarship',
    reduction: '50%',
    description: '50% concession in Fee.',
    tag: 'Need-based',
    categories: ['need']
  },
  {
    name: 'Need Based Scholarship',
    reduction: 'Case-by-case',
    description: 'Financial assistance will be offered in financial hardship cases.',
    tag: 'Need-based',
    categories: ['need']
  }];


export type Testimonial = {
  name: string;
  program: string;
  // role: string;
  quote: string;
  initials: string;
  accent: 'blue' | 'black';
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    // Image 1: Female student holding a CECOS University notebook on campus corridor
    name: 'Sonia Khan',
    program: 'BS Computer Science, Class of 2024',
    quote:
      "CECOS gave me the confidence to pursue technology. The campus environment is welcoming and the faculty genuinely cares about your growth.",
    initials: 'SK',
    accent: 'blue',
    image: '/assets/Student-Testimonial-1.jpg'
  },
  {
    // Image 2: Male student in white lab coat working in a laboratory setting
    name: 'Wajid Shah',
    program: 'PharmD, Class of 2023',
    quote:
      'The pharmacy labs at CECOS are world-class. Hands-on practical sessions from day one prepared me for real clinical environments far better than I expected.',
    initials: 'WS',
    accent: 'black',
    image: '/assets/Student-Testimonial-2.jpg'
  },
  {
    // Image 3: Male student with glasses studying in the CECOS library
    name: 'Muzamil Gillani',
    program: 'BS Software Engineering, Class of 2024',
    quote:
      'The library and academic resources at CECOS are excellent. I spent countless hours here working on projects — the depth of learning you get here is unmatched.',
    initials: 'MG',
    accent: 'blue',
    image: '/assets/Student-Testimonial-3.jpg'
  },
  {
    // Image 4: Female student standing in front of architectural blueprints holding a CECOS mug
    name: 'Sadia Karim',
    program: 'Bachelor of Architecture, Class of 2025',
    quote:
      'Architecture at CECOS is a journey of creativity and technical rigor. My design projects are pinned on these very walls — seeing them come to life is incredibly rewarding.',
    initials: 'SK',
    accent: 'black',
    image: '/assets/Student-Testimonial-4.jpg'
  },
  {
    // Image 5: Male student in hard hat and yellow high-vis jacket at a construction site
    name: 'Najam Saddan',
    program: 'BSc Civil Engineering, Class of 2022',
    quote:
      'The field exposure during my civil engineering degree was exceptional. I was on actual construction sites while still a student — that experience is what sets CECOS graduates apart.',
    initials: 'NS',
    accent: 'blue',
    image: '/assets/Student-Testimonial-5.jpg'
  }];


export type Faq = {
  q: { en: string; ur: string; };
  a: { en: string; ur: string; };
};

export const faqs: Faq[] = [
  {
    q: {
      en: 'How long does the application take?',
      ur: 'درخواست میں کتنا وقت لگتا ہے؟'
    },
    a: {
      en: 'About 4–5 minutes on a mobile phone. You can save and continue later if anything comes up.',
      ur: 'موبائل فون پر تقریباً 4–5 منٹ۔ اگر کچھ سامنے آئے تو آپ محفوظ کر کے بعد میں جاری رکھ سکتے ہیں۔'
    }
  },
  {
    q: {
      en: 'Can I apply from my phone?',
      ur: 'کیا میں اپنے فون سے درخواست دے سکتا ہوں؟'
    },
    a: {
      en: 'Yes. The whole form is mobile-first, including document upload via camera.',
      ur: 'جی ہاں۔ پورا فارم موبائل کے لیے بنا ہے، کیمرہ سے دستاویزات اپ لوڈ کرنا بھی شامل۔'
    }
  },
  {
    q: { en: "What's the application fee?", ur: 'درخواست فیس کیا ہے؟' },
    a: {
      en: 'PKR 1,500 for undergraduate, PKR 2,000 for postgraduate. If you already applied in an earlier phase this year, the fee drops to PKR 500.',
      ur: 'انڈرگریجویٹ کے لیے PKR 1,500، پوسٹ گریجویٹ کے لیے PKR 2,000۔ اگر آپ نے اسی سال پہلے درخواست دی ہے تو فیس PKR 500 رہ جاتی ہے۔'
    }
  },
  {
    q: { en: 'Is the fee refundable?', ur: 'کیا فیس واپس ہو سکتی ہے؟' },
    a: {
      en: 'No. The application fee is non-refundable.',
      ur: 'نہیں۔ درخواست فیس واپس نہیں ہوتی۔'
    }
  },
  {
    q: {
      en: 'What documents do I need to upload?',
      ur: 'مجھے کون سی دستاویزات اپ لوڈ کرنی ہیں؟'
    },
    a: {
      en: 'A recent passport-style photograph, your Matric (SSC) DMC, and your Intermediate DMC. If your Intermediate result is awaited, upload your 1st-year DMC.',
      ur: 'حالیہ پاسپورٹ سائز تصویر، آپ کا میٹرک (SSC) DMC، اور انٹرمیڈیٹ DMC۔ اگر انٹر کا رزلٹ نہیں آیا تو پہلے سال کا DMC اپ لوڈ کریں۔'
    }
  },
  {
    q: {
      en: 'Do I have to take the ETEA test?',
      ur: 'کیا مجھے ETEA ٹیسٹ دینا ہو گا؟'
    },
    a: {
      en: 'Only for BSc Engineering programs (Civil, Electrical, Mechanical). Other programs use the CECOS entrance test or accept NTS/ETEA scores.',
      ur: 'صرف BSc انجینئرنگ پروگرامز کے لیے (سول، الیکٹریکل، میکانیکل)۔ باقی پروگرامز CECOS داخلہ ٹیسٹ یا NTS/ETEA قبول کرتے ہیں۔'
    }
  },
  {
    q: {
      en: 'Can I apply in Urdu?',
      ur: 'کیا میں اردو میں درخواست دے سکتا ہوں؟'
    },
    a: {
      en: 'Yes. Toggle to اردو at the top of any page. Every field has tooltips in both languages.',
      ur: 'جی ہاں۔ صفحے کے اوپر اردو پر سوئچ کریں۔ ہر فیلڈ کے ٹول ٹپس دونوں زبانوں میں ہیں۔'
    }
  },
  {
    q: {
      en: 'Can I change my program choices after submitting?',
      ur: 'کیا میں جمع کرانے کے بعد پروگرام بدل سکتا ہوں؟'
    },
    a: {
      en: 'Not from your account. Only the Director of Admissions can change choices after admission. Choose carefully.',
      ur: 'اپنے اکاؤنٹ سے نہیں۔ صرف ڈائریکٹر داخلہ تبدیلی کر سکتے ہیں۔ سوچ کر منتخب کریں۔'
    }
  },
  {
    q: {
      en: "What if I can't apply online?",
      ur: 'اگر میں آن لائن درخواست نہ دے سکوں؟'
    },
    a: {
      en: 'Walk into the Hayatabad campus admissions office. Our team will fill the form with you and accept cash on the spot.',
      ur: 'حیات آباد کیمپس کے داخلہ دفتر آئیں۔ ہماری ٹیم آپ کے ساتھ فارم بھرے گی اور نقد قبول کرے گی۔'
    }
  },
  {
    q: { en: 'How will I get updates?', ur: 'مجھے اپڈیٹس کیسے ملیں گی؟' },
    a: {
      en: 'Email, WhatsApp, and SMS — for OTPs, fee receipts, and important deadline announcements.',
      ur: 'ای میل، واٹس ایپ اور SMS — OTP، فیس رسید، اور اہم تاریخوں کے لیے۔'
    }
  }];


// Wired deadline
export const phase1ClosesAt = (() => {
  // 21 days from "today" in UTC, anchored at midnight for predictable display.
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 21);
  d.setUTCHours(23, 59, 0, 0);
  return d;
})();

export const whatsappNumber = '92XXXXXXXXXX';