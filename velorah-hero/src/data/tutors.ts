export interface TutorReview {
  name: string;
  school: string;
  quote: string;
}

export interface TutorRecord {
  id: string;
  name: string;
  role: string;
  headline: string;
  quote: string;
  subjects: string[];
  expertise: string[];
  university: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  availability: 'Today' | 'This Week' | 'Limited';
  responseTime: string;
  formats: string[];
  languages: string[];
  matchNote: string;
  intro: string;
  achievements: string[];
  teachingStyle: string[];
  outcomes: string[];
  nextSlots: string[];
  weeklyAvailability: Array<{
    day: string;
    slots: string[];
  }>;
  reviewsPreview: TutorReview[];
}

export const tutorAvatars: Record<string, string> = {
  '11': 'https://i.pravatar.cc/800?img=11',
  '12': 'https://i.pravatar.cc/800?img=12',
  '13': 'https://i.pravatar.cc/800?img=13',
  '14': 'https://i.pravatar.cc/800?img=14',
  '15': 'https://i.pravatar.cc/800?img=15',
  '16': 'https://i.pravatar.cc/800?img=16',
  '17': 'https://i.pravatar.cc/800?img=17',
  '18': 'https://i.pravatar.cc/800?img=18',
  '19': 'https://i.pravatar.cc/800?img=19',
  '20': 'https://i.pravatar.cc/800?img=20',
  '21': 'https://i.pravatar.cc/800?img=21',
  '22': 'https://i.pravatar.cc/800?img=22',
  '23': 'https://i.pravatar.cc/800?img=23',
  '24': 'https://i.pravatar.cc/800?img=24',
  '25': 'https://i.pravatar.cc/800?img=25',
  '26': 'https://i.pravatar.cc/800?img=26',
  '27': 'https://i.pravatar.cc/800?img=27',
  '28': 'https://i.pravatar.cc/800?img=28',
  '29': 'https://i.pravatar.cc/800?img=29',
  '30': 'https://i.pravatar.cc/800?img=30',
  '31': 'https://i.pravatar.cc/800?img=31',
  '32': 'https://i.pravatar.cc/800?img=32',
  '33': 'https://i.pravatar.cc/800?img=33',
  '34': 'https://i.pravatar.cc/800?img=34',
  '35': 'https://i.pravatar.cc/800?img=35',
  '36': 'https://i.pravatar.cc/800?img=36',
  '37': 'https://i.pravatar.cc/800?img=37',
  '38': 'https://i.pravatar.cc/800?img=38',
  '39': 'https://i.pravatar.cc/800?img=39',
  '40': 'https://i.pravatar.cc/800?img=40',
  '41': 'https://i.pravatar.cc/800?img=41',
  '42': 'https://i.pravatar.cc/800?img=42',
  '43': 'https://i.pravatar.cc/800?img=43',
  '44': 'https://i.pravatar.cc/800?img=44',
  '45': 'https://i.pravatar.cc/800?img=45',
  '46': 'https://i.pravatar.cc/800?img=46',
  '47': 'https://i.pravatar.cc/800?img=47',
  '48': 'https://i.pravatar.cc/800?img=48',
  '49': 'https://i.pravatar.cc/800?img=49',
  '50': 'https://i.pravatar.cc/800?img=50',
  '51': 'https://i.pravatar.cc/800?img=51',
  '52': 'https://i.pravatar.cc/800?img=52',
  '53': 'https://i.pravatar.cc/800?img=53',
  '54': 'https://i.pravatar.cc/800?img=54',
  '55': 'https://i.pravatar.cc/800?img=55',
  '56': 'https://i.pravatar.cc/800?img=56',
  '57': 'https://i.pravatar.cc/800?img=57',
  '58': 'https://i.pravatar.cc/800?img=58',
  '59': 'https://i.pravatar.cc/800?img=59',
  '60': 'https://i.pravatar.cc/800?img=60',

  '1': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop&q=80',
  '2': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&fit=crop&q=80',
  '3': 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&fit=crop&q=80',
  '4': 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=800&fit=crop&q=80',
  '5': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&fit=crop&q=80',
  '6': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop&q=80',
  '7': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&fit=crop&q=80',
  '8': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&fit=crop&q=80',
  '9': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&fit=crop&q=80',
  '10': 'https://images.unsplash.com/photo-1542204625-de293a042b9d?w=800&fit=crop&q=80',
};

export const tutorCovers: Record<string, string> = {
  '11': 'https://picsum.photos/seed/cover11/1600/800',
  '12': 'https://picsum.photos/seed/cover12/1600/800',
  '13': 'https://picsum.photos/seed/cover13/1600/800',
  '14': 'https://picsum.photos/seed/cover14/1600/800',
  '15': 'https://picsum.photos/seed/cover15/1600/800',
  '16': 'https://picsum.photos/seed/cover16/1600/800',
  '17': 'https://picsum.photos/seed/cover17/1600/800',
  '18': 'https://picsum.photos/seed/cover18/1600/800',
  '19': 'https://picsum.photos/seed/cover19/1600/800',
  '20': 'https://picsum.photos/seed/cover20/1600/800',
  '21': 'https://picsum.photos/seed/cover21/1600/800',
  '22': 'https://picsum.photos/seed/cover22/1600/800',
  '23': 'https://picsum.photos/seed/cover23/1600/800',
  '24': 'https://picsum.photos/seed/cover24/1600/800',
  '25': 'https://picsum.photos/seed/cover25/1600/800',
  '26': 'https://picsum.photos/seed/cover26/1600/800',
  '27': 'https://picsum.photos/seed/cover27/1600/800',
  '28': 'https://picsum.photos/seed/cover28/1600/800',
  '29': 'https://picsum.photos/seed/cover29/1600/800',
  '30': 'https://picsum.photos/seed/cover30/1600/800',
  '31': 'https://picsum.photos/seed/cover31/1600/800',
  '32': 'https://picsum.photos/seed/cover32/1600/800',
  '33': 'https://picsum.photos/seed/cover33/1600/800',
  '34': 'https://picsum.photos/seed/cover34/1600/800',
  '35': 'https://picsum.photos/seed/cover35/1600/800',
  '36': 'https://picsum.photos/seed/cover36/1600/800',
  '37': 'https://picsum.photos/seed/cover37/1600/800',
  '38': 'https://picsum.photos/seed/cover38/1600/800',
  '39': 'https://picsum.photos/seed/cover39/1600/800',
  '40': 'https://picsum.photos/seed/cover40/1600/800',
  '41': 'https://picsum.photos/seed/cover41/1600/800',
  '42': 'https://picsum.photos/seed/cover42/1600/800',
  '43': 'https://picsum.photos/seed/cover43/1600/800',
  '44': 'https://picsum.photos/seed/cover44/1600/800',
  '45': 'https://picsum.photos/seed/cover45/1600/800',
  '46': 'https://picsum.photos/seed/cover46/1600/800',
  '47': 'https://picsum.photos/seed/cover47/1600/800',
  '48': 'https://picsum.photos/seed/cover48/1600/800',
  '49': 'https://picsum.photos/seed/cover49/1600/800',
  '50': 'https://picsum.photos/seed/cover50/1600/800',
  '51': 'https://picsum.photos/seed/cover51/1600/800',
  '52': 'https://picsum.photos/seed/cover52/1600/800',
  '53': 'https://picsum.photos/seed/cover53/1600/800',
  '54': 'https://picsum.photos/seed/cover54/1600/800',
  '55': 'https://picsum.photos/seed/cover55/1600/800',
  '56': 'https://picsum.photos/seed/cover56/1600/800',
  '57': 'https://picsum.photos/seed/cover57/1600/800',
  '58': 'https://picsum.photos/seed/cover58/1600/800',
  '59': 'https://picsum.photos/seed/cover59/1600/800',
  '60': 'https://picsum.photos/seed/cover60/1600/800',

  '1': 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1600&fit=crop&q=80', // Math/Abstract
  '2': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&fit=crop&q=80', // Literature/Books
  '3': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&fit=crop&q=80', // Physics/Lab
  '4': 'https://images.unsplash.com/photo-1611974789855-9c2a0a223690?w=1600&fit=crop&q=80', // Economics/Graph
  '5': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&fit=crop&q=80', // Bio/Science
  '6': 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=1600&fit=crop&q=80', // CS/Code
  '7': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&fit=crop&q=80', // Speaking/Hall
  '8': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&fit=crop&q=80', // Product/Design
  '9': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&fit=crop&q=80', // Med/DNA
  '10': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&fit=crop&q=80', // Finance/Chart
};

export const tutors: TutorRecord[] = [
  {
    id: '11',
    name: 'Emma Farooq',
    role: 'Public Speaking',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "Speaking", "English"],
    expertise: ["TOEFL", "Speaking", "IELTS"],
    university: 'University of Oxford',
    rating: 4.76,
    reviews: 45,
    hourlyRate: 32,
    availability: 'This Week',
    responseTime: 'Replies within 46 minutes',
    formats: ["1:1 Live", "Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Harvard University',
      'Over 377 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '12',
    name: 'Emma Pham',
    role: 'TOEFL',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "English", "Public Speaking"],
    expertise: ["IELTS Prep", "Public Speaking", "TOEFL"],
    university: 'MIT',
    rating: 4.83,
    reviews: 142,
    hourlyRate: 38,
    availability: 'Limited',
    responseTime: 'Replies within 51 minutes',
    formats: ["Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of MIT',
      'Over 302 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '13',
    name: 'Khoa Tanaka',
    role: 'Calculus',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Stats", "Geometry"],
    expertise: ["Algebra", "Geometry", "Equations"],
    university: 'University of Toronto',
    rating: 4.96,
    reviews: 27,
    hourlyRate: 38,
    availability: 'Today',
    responseTime: 'Replies within 45 minutes',
    formats: ["Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 391 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '14',
    name: 'Jamal Silva',
    role: 'Medical Prep',
    headline: 'Structured support for advanced biomedical and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Biomedical", "Bio", "Biology"],
    expertise: ["Organic Chemistry", "Anatomy", "Human Physiology"],
    university: 'LSE',
    rating: 4.7,
    reviews: 120,
    hourlyRate: 41,
    availability: 'This Week',
    responseTime: 'Replies within 48 minutes',
    formats: ["Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Oxford',
      'Over 297 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '15',
    name: 'Elena Ivanova',
    role: 'Quantum Basics',
    headline: 'Structured support for advanced physics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Physics", "Energy", "Physics"],
    expertise: ["Forces", "Electromagnetism", "Quantum Basics"],
    university: 'UCL',
    rating: 4.57,
    reviews: 165,
    hourlyRate: 49,
    availability: 'This Week',
    responseTime: 'Replies within 30 minutes',
    formats: ["Project Review", "1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Oxford',
      'Over 340 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '16',
    name: 'Sarah Nguyen',
    role: 'Public Speaking',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "Public Speaking", "Speaking"],
    expertise: ["IELTS", "TOEFL", "IELTS Prep"],
    university: 'Stanford University',
    rating: 4.87,
    reviews: 83,
    hourlyRate: 38,
    availability: 'Today',
    responseTime: 'Replies within 53 minutes',
    formats: ["1:1 Live", "Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Tokyo',
      'Over 289 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '17',
    name: 'Khoa Dubois',
    role: 'Machine Learning Basics',
    headline: 'Structured support for advanced computer science and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Computer Science", "Python", "C++"],
    expertise: ["JavaScript", "Code", "Data Structures"],
    university: 'University of Tokyo',
    rating: 4.59,
    reviews: 125,
    hourlyRate: 30,
    availability: 'This Week',
    responseTime: 'Replies within 11 minutes',
    formats: ["Project Review", "1:1 Live"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Toronto',
      'Over 345 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '18',
    name: 'Oliver Tran',
    role: 'English Lit',
    headline: 'Structured support for advanced literature and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Literature", "Critical Analysis", "Essays"],
    expertise: ["Critical Analysis", "English Lit", "IELTS Writing"],
    university: 'Carnegie Mellon',
    rating: 4.68,
    reviews: 106,
    hourlyRate: 30,
    availability: 'Today',
    responseTime: 'Replies within 53 minutes',
    formats: ["Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 183 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '19',
    name: 'Vy Nguyen',
    role: 'Visual UI',
    headline: 'Structured support for advanced design and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Design", "UX Research", "Wireframing"],
    expertise: ["Portfolio", "Design", "Product Design"],
    university: 'NUS',
    rating: 4.77,
    reviews: 94,
    hourlyRate: 50,
    availability: 'This Week',
    responseTime: 'Replies within 43 minutes',
    formats: ["Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Oxford',
      'Over 262 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '20',
    name: 'Hiroshi Tran',
    role: 'TOEFL',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "IELTS", "English"],
    expertise: ["Public Speaking", "English", "IELTS"],
    university: 'MIT',
    rating: 4.68,
    reviews: 168,
    hourlyRate: 21,
    availability: 'This Week',
    responseTime: 'Replies within 23 minutes',
    formats: ["1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of LSE',
      'Over 330 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '21',
    name: 'Lucas Vu',
    role: 'TOEFL',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "IELTS", "English"],
    expertise: ["Speaking", "IELTS Prep", "TOEFL"],
    university: 'Harvard University',
    rating: 4.82,
    reviews: 143,
    hourlyRate: 32,
    availability: 'Limited',
    responseTime: 'Replies within 42 minutes',
    formats: ["Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of LSE',
      'Over 162 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '22',
    name: 'Sarah Silva',
    role: 'Electromagnetism',
    headline: 'Structured support for advanced physics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Physics", "Forces", "Thermodynamics"],
    expertise: ["Energy", "Electromagnetism", "Mechanics"],
    university: 'NUS',
    rating: 4.76,
    reviews: 30,
    hourlyRate: 22,
    availability: 'Limited',
    responseTime: 'Replies within 53 minutes',
    formats: ["1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 226 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '23',
    name: 'Priya Ivanova',
    role: 'Human Physiology',
    headline: 'Structured support for advanced biomedical and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Biomedical", "Biology", "Bio"],
    expertise: ["Organic Chemistry", "Chemistry", "Bio"],
    university: 'UCL',
    rating: 4.61,
    reviews: 161,
    hourlyRate: 44,
    availability: 'Limited',
    responseTime: 'Replies within 15 minutes',
    formats: ["1:1 Live"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Toronto',
      'Over 286 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '24',
    name: 'Jamal Vo',
    role: 'IELTS Prep',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "IELTS", "English"],
    expertise: ["Speaking", "IELTS Prep", "Public Speaking"],
    university: 'UCL',
    rating: 4.55,
    reviews: 88,
    hourlyRate: 47,
    availability: 'This Week',
    responseTime: 'Replies within 45 minutes',
    formats: ["Exam Sprint", "1:1 Live"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Tokyo',
      'Over 375 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '25',
    name: 'Hiroshi Farooq',
    role: 'Python Foundations',
    headline: 'Structured support for advanced computer science and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Computer Science", "JavaScript", "Code"],
    expertise: ["Machine Learning Basics", "Algorithms", "Data Structures"],
    university: 'Carnegie Mellon',
    rating: 4.75,
    reviews: 24,
    hourlyRate: 40,
    availability: 'This Week',
    responseTime: 'Replies within 31 minutes',
    formats: ["Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Harvard University',
      'Over 242 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '26',
    name: 'Emma Patel',
    role: 'Medical Prep',
    headline: 'Structured support for advanced biomedical and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Biomedical", "Anatomy", "Chemistry"],
    expertise: ["Medical Prep", "Chemistry", "Biology"],
    university: 'UCL',
    rating: 4.93,
    reviews: 44,
    hourlyRate: 27,
    availability: 'Today',
    responseTime: 'Replies within 31 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of NUS',
      'Over 392 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '27',
    name: 'Lucas Nguyen',
    role: 'TOEFL',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "IELTS", "Public Speaking"],
    expertise: ["TOEFL", "Public Speaking", "IELTS"],
    university: 'LSE',
    rating: 4.7,
    reviews: 75,
    hourlyRate: 34,
    availability: 'This Week',
    responseTime: 'Replies within 55 minutes',
    formats: ["Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Imperial College',
      'Over 163 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '28',
    name: 'Elena Vo',
    role: 'Macroeconomics',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Macro", "Markets"],
    expertise: ["Business Analytics", "Finance", "Macroeconomics"],
    university: 'Imperial College',
    rating: 4.94,
    reviews: 166,
    hourlyRate: 31,
    availability: 'This Week',
    responseTime: 'Replies within 50 minutes',
    formats: ["Project Review", "Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of NUS',
      'Over 174 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '29',
    name: 'David Collins',
    role: 'Human Physiology',
    headline: 'Structured support for advanced biomedical and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Biomedical", "Anatomy", "Chemistry"],
    expertise: ["Bio", "Medical Prep", "Human Physiology"],
    university: 'University of Toronto',
    rating: 4.7,
    reviews: 143,
    hourlyRate: 45,
    availability: 'Limited',
    responseTime: 'Replies within 41 minutes',
    formats: ["Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of ETH Zurich',
      'Over 196 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '30',
    name: 'Emma Silva',
    role: 'Product Design',
    headline: 'Structured support for advanced design and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Design", "Wireframing", "Portfolio"],
    expertise: ["Wireframing", "UX Research", "Product Design"],
    university: 'University of Oxford',
    rating: 4.85,
    reviews: 149,
    hourlyRate: 22,
    availability: 'Today',
    responseTime: 'Replies within 48 minutes',
    formats: ["Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Carnegie Mellon',
      'Over 378 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '31',
    name: 'David Patel',
    role: 'Statistics & Prob',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Equations", "Geometry"],
    expertise: ["Math", "Statistics & Prob", "Calculus"],
    university: 'UCL',
    rating: 4.62,
    reviews: 77,
    hourlyRate: 35,
    availability: 'Limited',
    responseTime: 'Replies within 31 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Tokyo',
      'Over 333 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '32',
    name: 'Linh Vu',
    role: 'IELTS Prep',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "Public Speaking", "Speaking"],
    expertise: ["TOEFL", "IELTS", "Speaking"],
    university: 'Imperial College',
    rating: 4.73,
    reviews: 144,
    hourlyRate: 36,
    availability: 'Today',
    responseTime: 'Replies within 57 minutes',
    formats: ["Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 217 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '33',
    name: 'Khoa Ivanova',
    role: 'Calculus',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Equations", "Math"],
    expertise: ["Statistics & Prob", "Geometry", "Algebra"],
    university: 'Harvard University',
    rating: 4.85,
    reviews: 65,
    hourlyRate: 30,
    availability: 'This Week',
    responseTime: 'Replies within 59 minutes',
    formats: ["Exam Sprint", "1:1 Live"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 187 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '34',
    name: 'Sarah Vo',
    role: 'Quantum Basics',
    headline: 'Structured support for advanced physics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Physics", "Thermodynamics", "Energy"],
    expertise: ["Electromagnetism", "Quantum Basics", "Energy"],
    university: 'University of Tokyo',
    rating: 4.98,
    reviews: 24,
    hourlyRate: 42,
    availability: 'Limited',
    responseTime: 'Replies within 36 minutes',
    formats: ["Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of LSE',
      'Over 132 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '35',
    name: 'Hiroshi Williams',
    role: 'Academic Writing',
    headline: 'Structured support for advanced literature and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Literature", "Critical Analysis", "IELTS Writing"],
    expertise: ["Poetry", "Critical Analysis", "Essays"],
    university: 'Imperial College',
    rating: 4.89,
    reviews: 150,
    hourlyRate: 48,
    availability: 'Today',
    responseTime: 'Replies within 17 minutes',
    formats: ["Project Review", "Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 307 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '36',
    name: 'Linh Vu',
    role: 'IELTS Prep',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "English", "IELTS"],
    expertise: ["Public Speaking", "English", "Public Speaking"],
    university: 'University of Oxford',
    rating: 4.87,
    reviews: 109,
    hourlyRate: 35,
    availability: 'This Week',
    responseTime: 'Replies within 15 minutes',
    formats: ["1:1 Live"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of MIT',
      'Over 387 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '37',
    name: 'Linh Williams',
    role: 'Academic Writing',
    headline: 'Structured support for advanced literature and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Literature", "IELTS Writing", "Poetry"],
    expertise: ["English Lit", "Critical Analysis", "Poetry"],
    university: 'University of Tokyo',
    rating: 4.66,
    reviews: 162,
    hourlyRate: 21,
    availability: 'Limited',
    responseTime: 'Replies within 39 minutes',
    formats: ["1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of MIT',
      'Over 212 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '38',
    name: 'Mai Tanaka',
    role: 'Product Design',
    headline: 'Structured support for advanced design and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Design", "Portfolio", "UX Research"],
    expertise: ["UX Research", "UX Research", "Portfolio"],
    university: 'ETH Zurich',
    rating: 4.83,
    reviews: 43,
    hourlyRate: 40,
    availability: 'This Week',
    responseTime: 'Replies within 59 minutes',
    formats: ["Project Review", "Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 388 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '39',
    name: 'Jamal Vo',
    role: 'Electromagnetism',
    headline: 'Structured support for advanced physics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Physics", "Physics", "Energy"],
    expertise: ["Forces", "Electromagnetism", "Quantum Basics"],
    university: 'NUS',
    rating: 4.56,
    reviews: 133,
    hourlyRate: 27,
    availability: 'Limited',
    responseTime: 'Replies within 51 minutes',
    formats: ["Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Carnegie Mellon',
      'Over 125 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '40',
    name: 'Sarah Silva',
    role: 'Statistics & Prob',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Equations", "Stats"],
    expertise: ["Stats", "Math", "Geometry"],
    university: 'University of Tokyo',
    rating: 4.89,
    reviews: 154,
    hourlyRate: 23,
    availability: 'Today',
    responseTime: 'Replies within 36 minutes',
    formats: ["1:1 Live"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Harvard University',
      'Over 132 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '41',
    name: 'Oliver Silva',
    role: 'Machine Learning Basics',
    headline: 'Structured support for advanced computer science and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Computer Science", "Python", "JavaScript"],
    expertise: ["Data Structures", "Code", "Python"],
    university: 'ETH Zurich',
    rating: 4.94,
    reviews: 91,
    hourlyRate: 30,
    availability: 'Today',
    responseTime: 'Replies within 21 minutes',
    formats: ["Exam Sprint", "1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 322 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '42',
    name: 'Anna Dubois',
    role: 'Business Analytics',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Econ", "Macro"],
    expertise: ["Accounting", "Macroeconomics", "Econ"],
    university: 'NUS',
    rating: 4.58,
    reviews: 138,
    hourlyRate: 44,
    availability: 'Limited',
    responseTime: 'Replies within 28 minutes',
    formats: ["Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Imperial College',
      'Over 225 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '43',
    name: 'David Collins',
    role: 'Algebra',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Equations", "Calculus"],
    expertise: ["Math", "Geometry", "Calculus"],
    university: 'UCL',
    rating: 4.66,
    reviews: 28,
    hourlyRate: 29,
    availability: 'This Week',
    responseTime: 'Replies within 45 minutes',
    formats: ["1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Harvard University',
      'Over 259 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '44',
    name: 'Mai Ivanova',
    role: 'Data Structures',
    headline: 'Structured support for advanced computer science and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Computer Science", "C++", "JavaScript"],
    expertise: ["Python Foundations", "Web Development", "Machine Learning Basics"],
    university: 'NUS',
    rating: 4.82,
    reviews: 103,
    hourlyRate: 50,
    availability: 'This Week',
    responseTime: 'Replies within 44 minutes',
    formats: ["Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Toronto',
      'Over 119 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '45',
    name: 'Linh Vu',
    role: 'Finance',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Accounting", "Micro"],
    expertise: ["Markets", "Business Analytics", "Finance"],
    university: 'MIT',
    rating: 4.6,
    reviews: 140,
    hourlyRate: 37,
    availability: 'Limited',
    responseTime: 'Replies within 59 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 358 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '46',
    name: 'Khoa Farooq',
    role: 'Statistics & Prob',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Calculus", "Equations"],
    expertise: ["Calculus", "Stats", "Algebra"],
    university: 'LSE',
    rating: 4.89,
    reviews: 91,
    hourlyRate: 42,
    availability: 'Today',
    responseTime: 'Replies within 19 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of MIT',
      'Over 374 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '47',
    name: 'Elena Tran',
    role: 'Product Design',
    headline: 'Structured support for advanced design and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Design", "Wireframing", "Design"],
    expertise: ["UX Research", "Product Design", "UX Research"],
    university: 'University of Toronto',
    rating: 4.6,
    reviews: 87,
    hourlyRate: 46,
    availability: 'This Week',
    responseTime: 'Replies within 17 minutes',
    formats: ["Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of LSE',
      'Over 387 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '48',
    name: 'Priya Le',
    role: 'Medical Prep',
    headline: 'Structured support for advanced biomedical and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Biomedical", "Bio", "Chemistry"],
    expertise: ["Organic Chemistry", "Biology", "Medical Prep"],
    university: 'University of Tokyo',
    rating: 4.98,
    reviews: 98,
    hourlyRate: 20,
    availability: 'Today',
    responseTime: 'Replies within 56 minutes',
    formats: ["1:1 Live", "Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of MIT',
      'Over 154 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '49',
    name: 'Hoang Kim',
    role: 'Product Design',
    headline: 'Structured support for advanced design and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Design", "Design", "Wireframing"],
    expertise: ["UX Research", "UX Research", "Portfolio"],
    university: 'UCL',
    rating: 4.67,
    reviews: 94,
    hourlyRate: 49,
    availability: 'This Week',
    responseTime: 'Replies within 59 minutes',
    formats: ["Project Review", "Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of NUS',
      'Over 212 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '50',
    name: 'Hoang Dubois',
    role: 'Calculus',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Equations", "Geometry"],
    expertise: ["Calculus", "Geometry", "Stats"],
    university: 'University of Tokyo',
    rating: 4.74,
    reviews: 73,
    hourlyRate: 29,
    availability: 'Limited',
    responseTime: 'Replies within 29 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 169 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '51',
    name: 'Anna Kim',
    role: 'English Lit',
    headline: 'Structured support for advanced literature and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Literature", "Poetry", "Essays"],
    expertise: ["Academic Writing", "English Lit", "Essays"],
    university: 'Stanford University',
    rating: 4.9,
    reviews: 59,
    hourlyRate: 45,
    availability: 'Limited',
    responseTime: 'Replies within 59 minutes',
    formats: ["Exam Sprint"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Imperial College',
      'Over 328 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '52',
    name: 'Hoang Vo',
    role: 'Organic Chemistry',
    headline: 'Structured support for advanced biomedical and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Biomedical", "Chemistry", "Bio"],
    expertise: ["Anatomy", "Chemistry", "Organic Chemistry"],
    university: 'ETH Zurich',
    rating: 4.67,
    reviews: 82,
    hourlyRate: 29,
    availability: 'Limited',
    responseTime: 'Replies within 48 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Imperial College',
      'Over 365 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '53',
    name: 'David Collins',
    role: 'Academic Writing',
    headline: 'Structured support for advanced literature and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Literature", "Essays", "Poetry"],
    expertise: ["Essays", "Academic Writing", "Poetry"],
    university: 'University of Toronto',
    rating: 4.65,
    reviews: 125,
    hourlyRate: 41,
    availability: 'This Week',
    responseTime: 'Replies within 41 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of NUS',
      'Over 188 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '54',
    name: 'Hiroshi Farooq',
    role: 'Finance',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Micro", "Macro"],
    expertise: ["Econ", "Macro", "Finance"],
    university: 'University of Toronto',
    rating: 4.81,
    reviews: 20,
    hourlyRate: 42,
    availability: 'Today',
    responseTime: 'Replies within 23 minutes',
    formats: ["Project Review", "Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of MIT',
      'Over 192 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '55',
    name: 'Vy Tanaka',
    role: 'Mechanics',
    headline: 'Structured support for advanced physics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Physics", "Physics", "Thermodynamics"],
    expertise: ["Energy", "Quantum Basics", "Thermodynamics"],
    university: 'LSE',
    rating: 4.63,
    reviews: 67,
    hourlyRate: 23,
    availability: 'Today',
    responseTime: 'Replies within 41 minutes',
    formats: ["1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of UCL',
      'Over 354 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '56',
    name: 'David Patel',
    role: 'Business Analytics',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Micro", "Econ"],
    expertise: ["Finance", "Macroeconomics", "Macro"],
    university: 'Imperial College',
    rating: 4.72,
    reviews: 120,
    hourlyRate: 40,
    availability: 'Limited',
    responseTime: 'Replies within 43 minutes',
    formats: ["1:1 Live", "Exam Sprint"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Oxford',
      'Over 204 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '57',
    name: 'Elena Tran',
    role: 'Business Analytics',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Macro", "Econ"],
    expertise: ["Markets", "Business Analytics", "Macro"],
    university: 'NUS',
    rating: 5.0,
    reviews: 35,
    hourlyRate: 34,
    availability: 'Today',
    responseTime: 'Replies within 14 minutes',
    formats: ["Exam Sprint", "Project Review"],
    languages: ["English", "Vietnamese"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of ETH Zurich',
      'Over 312 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '58',
    name: 'Anna Tanaka',
    role: 'Business Analytics',
    headline: 'Structured support for advanced business and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Business", "Accounting", "Econ"],
    expertise: ["Macro", "Micro", "Macroeconomics"],
    university: 'ETH Zurich',
    rating: 4.84,
    reviews: 102,
    hourlyRate: 27,
    availability: 'This Week',
    responseTime: 'Replies within 19 minutes',
    formats: ["1:1 Live", "Project Review"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of Stanford University',
      'Over 268 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '59',
    name: 'Hoang Williams',
    role: 'TOEFL',
    headline: 'Structured support for advanced language and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Language", "Speaking", "English"],
    expertise: ["English", "Public Speaking", "Speaking"],
    university: 'UCL',
    rating: 4.79,
    reviews: 106,
    hourlyRate: 31,
    availability: 'Limited',
    responseTime: 'Replies within 13 minutes',
    formats: ["Project Review", "1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of ETH Zurich',
      'Over 137 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },
  {
    id: '60',
    name: 'Elena Le',
    role: 'Algebra',
    headline: 'Structured support for advanced mathematics and academic mastery.',
    quote: 'True learning occurs when complex ideas are mapped into intuitive, repeatable frameworks.',
    subjects: ["Mathematics", "Calculus", "Math"],
    expertise: ["Algebra", "Calculus", "Math"],
    university: 'Stanford University',
    rating: 4.67,
    reviews: 149,
    hourlyRate: 24,
    availability: 'Today',
    responseTime: 'Replies within 31 minutes',
    formats: ["1:1 Live"],
    languages: ["English"],
    matchNote: 'Best for learners tackling complex academic hurdles looking for a structured, patient mentor.',
    intro: 'A highly experienced mentor helping students transition from overwhelming memorization to true academic intuition.',
    achievements: [
      'Alumni of University of Toronto',
      'Over 336 hours of verifiable teaching experience',
      'Focused strictly on measurable student progression'
    ],
    teachingStyle: [
      'Establishes a rigorous foundational baseline',
      'Integrates timed practice and immediate feedback loops',
      'Reviews milestone growth every secondary session'
    ],
    outcomes: [
      'Students report high confidence entering exams',
      'Strongly recommended by peer networks'
    ],
    nextSlots: ['Tomorrow • 18:00', 'Friday • 19:30'],
    weeklyAvailability: [
      { 'day': 'Wed', 'slots': ['18:00 - 20:00'] },
      { 'day': 'Sat', 'slots': ['09:00 - 11:00'] },
    ],
    reviewsPreview: [
      { 'name': 'Student A', 'school': 'International High', 'quote': 'Brilliant explanations and deep patience.' },
      { 'name': 'Student B', 'school': 'City University', 'quote': 'Transformed my approach to the entire subject.' }
    ],
  },

  {
    id: '1',
    name: 'Dr. Minh Anh Nguyen',
    role: 'Calculus & Quantitative Reasoning',
    headline: 'For students preparing for selective exams and high-pressure quantitative programs.',
    quote:
      'I build calm mathematical confidence by turning dense topics into repeatable thinking frameworks.',
    subjects: ['Mathematics', 'Calculus', 'Statistics'],
    expertise: ['AP Calculus', 'SAT Math', 'University Prep'],
    university: 'Stanford University',
    rating: 4.95,
    reviews: 184,
    hourlyRate: 32,
    availability: 'Today',
    responseTime: 'Replies within 20 minutes',
    formats: ['1:1 Live', 'Exam Sprint'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Best for students who want structure before exams.',
    intro:
      'Former research fellow in applied mathematics, now focused on helping ambitious students move from fragmented study habits to clear, measurable progress.',
    achievements: [
      'Ph.D. in Applied Mathematics, Stanford University',
      '12 peer-reviewed publications in predictive modeling',
      '184 verified student reviews with long-term exam prep focus',
    ],
    teachingStyle: [
      'Breaks abstract concepts into compact study frameworks',
      'Assigns short reflective practice after every session',
      'Uses milestone reviews every two weeks',
    ],
    outcomes: [
      'Average 18% score improvement over 8 sessions',
      'Strong fit for midterm, finals, and scholarship preparation',
      'High retention for students struggling with confidence',
    ],
    nextSlots: ['Tonight • 19:30', 'Tomorrow • 18:00', 'Friday • 20:30'],
    weeklyAvailability: [
      { day: 'Mon', slots: ['18:00 - 20:00', '20:30 - 22:00'] },
      { day: 'Wed', slots: ['17:30 - 19:30', '20:00 - 22:00'] },
      { day: 'Fri', slots: ['18:00 - 20:00', '20:30 - 22:30'] },
      { day: 'Sat', slots: ['09:00 - 11:00', '19:00 - 21:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Lan',
        school: 'RMIT Vietnam',
        quote: 'Lessons feel ordered and calm. I finally know what to revise each week.',
      },
      {
        name: 'Quang',
        school: 'BIS Hanoi',
        quote: 'Excellent for exam preparation. Very clear explanations and no wasted time.',
      },
    ],
  },
  {
    id: '2',
    name: 'Ms. Thu Ha Tran',
    role: 'Academic Writing & Literature',
    headline: 'Editorial guidance for essays, critical reading, and scholarship applications.',
    quote:
      'Strong writing is built through attention, structure, and a sense of voice that feels honest.',
    subjects: ['English', 'Literature', 'Academic Writing'],
    expertise: ['IELTS Writing', 'College Essays', 'Research Papers'],
    university: 'University of Oxford',
    rating: 4.91,
    reviews: 132,
    hourlyRate: 28,
    availability: 'This Week',
    responseTime: 'Replies within 1 hour',
    formats: ['1:1 Live', 'Draft Review'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Ideal for essay refinement and scholarship storytelling.',
    intro:
      'Former writing center mentor with extensive experience guiding students through personal statements, literary analysis, and academic tone.',
    achievements: [
      'M.Phil. in English Literature, University of Oxford',
      'Mentored 300+ essay submissions across UK and US applications',
      'Known for high-clarity feedback and clean editing systems',
    ],
    teachingStyle: [
      'Builds structure first, then improves tone and nuance',
      'Uses before-and-after revision comparisons',
      'Provides focused written feedback between sessions',
    ],
    outcomes: [
      'Students improve coherence and argument quality quickly',
      'Strong outcomes for scholarship and university applications',
      'Useful for students who need calm accountability',
    ],
    nextSlots: ['Tomorrow • 16:00', 'Thursday • 19:00', 'Sunday • 10:00'],
    weeklyAvailability: [
      { day: 'Tue', slots: ['16:00 - 18:00', '19:00 - 21:00'] },
      { day: 'Thu', slots: ['17:00 - 19:30', '20:00 - 21:30'] },
      { day: 'Sun', slots: ['09:00 - 11:30', '14:00 - 17:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Mai',
        school: 'Vinschool',
        quote: 'My essays became clearer and more confident after only three sessions.',
      },
      {
        name: 'An',
        school: 'Fulbright University Vietnam',
        quote: 'Feedback is precise, elegant, and never overwhelming.',
      },
    ],
  },
  {
    id: '3',
    name: 'Mr. Khoa Le',
    role: 'Physics & Engineering Foundations',
    headline: 'For students who need conceptual clarity before advanced STEM coursework.',
    quote:
      'Physics becomes manageable once each formula is tied to an intuitive model you can trust.',
    subjects: ['Physics', 'Mechanics', 'Engineering Basics'],
    expertise: ['IB Physics', 'A-Level Physics', 'First-Year Engineering'],
    university: 'National University of Singapore',
    rating: 4.88,
    reviews: 96,
    hourlyRate: 30,
    availability: 'Today',
    responseTime: 'Replies within 35 minutes',
    formats: ['1:1 Live', 'Problem Clinic'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Strong for students preparing for advanced problem sets.',
    intro:
      'Engineering mentor who specializes in helping students connect physical intuition with rigorous problem solving and exam discipline.',
    achievements: [
      'M.Eng. in Mechanical Engineering, NUS',
      'Led tutoring cohorts for IB and A-Level physics',
      'Specializes in mechanics, motion, and force systems',
    ],
    teachingStyle: [
      'Starts with intuition, then formal derivation',
      'Teaches repeatable solving frameworks',
      'Builds timed practice into later-stage lessons',
    ],
    outcomes: [
      'Students report faster problem-solving under pressure',
      'Useful bridge from secondary to university STEM',
      'Good fit for learners who need disciplined structure',
    ],
    nextSlots: ['Tonight • 20:00', 'Wednesday • 18:30', 'Saturday • 14:00'],
    weeklyAvailability: [
      { day: 'Mon', slots: ['20:00 - 22:00'] },
      { day: 'Wed', slots: ['18:30 - 21:00'] },
      { day: 'Sat', slots: ['14:00 - 17:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Bao',
        school: 'Concordia International School Hanoi',
        quote: 'He makes difficult problem sets feel systematic instead of chaotic.',
      },
      {
        name: 'Minh',
        school: 'HCMC University of Technology',
        quote: 'Very strong at showing why each step matters, not just what to memorize.',
      },
    ],
  },
  {
    id: '4',
    name: 'Dr. Linh Pham',
    role: 'Economics & Decision Science',
    headline: 'Guided support for analytical essays, macroeconomics, and university-level reasoning.',
    quote:
      'Students improve faster when they understand the logic behind a model, not only its vocabulary.',
    subjects: ['Economics', 'Macro', 'Micro'],
    expertise: ['AP Economics', 'University Essays', 'Case Analysis'],
    university: 'London School of Economics',
    rating: 4.9,
    reviews: 141,
    hourlyRate: 34,
    availability: 'This Week',
    responseTime: 'Replies within 45 minutes',
    formats: ['1:1 Live', 'Case Review'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Strong for essay-led economics and structured revision plans.',
    intro:
      'Economics mentor blending academic rigor with practical case analysis so students can think clearly under exam and coursework pressure.',
    achievements: [
      'Ph.D. in Economics, LSE',
      'Designed guided revision programs for advanced high school students',
      'High success rate with essay-based economics assessments',
    ],
    teachingStyle: [
      'Builds conceptual maps before tackling essays',
      'Pairs theory with current-case discussion',
      'Uses milestone sheets to track reasoning improvement',
    ],
    outcomes: [
      'Students improve clarity in argumentation and case use',
      'Supports both exam prep and coursework performance',
      'Useful for students seeking a more refined study process',
    ],
    nextSlots: ['Thursday • 18:00', 'Friday • 19:30', 'Sunday • 16:00'],
    weeklyAvailability: [
      { day: 'Thu', slots: ['18:00 - 20:30'] },
      { day: 'Fri', slots: ['19:30 - 21:30'] },
      { day: 'Sun', slots: ['16:00 - 18:30'] },
    ],
    reviewsPreview: [
      {
        name: 'Vy',
        school: 'British International School Ho Chi Minh City',
        quote: 'Excellent at simplifying economic arguments without making them shallow.',
      },
      {
        name: 'Hieu',
        school: 'Monash University',
        quote: 'My essay structure improved dramatically with her planning method.',
      },
    ],
  },
  {
    id: '5',
    name: 'Mr. Daniel Vo',
    role: 'Chemistry & Biomedical Pathways',
    headline: 'Structured support for pre-med, lab-heavy coursework, and exam-intensive revision.',
    quote:
      'Chemistry feels easier once each unit is linked to a clear mental model and a revision cycle.',
    subjects: ['Chemistry', 'Organic Chemistry', 'Biology'],
    expertise: ['IB Chemistry', 'Pre-Med Prep', 'Lab Reports'],
    university: 'University of Melbourne',
    rating: 4.86,
    reviews: 88,
    hourlyRate: 31,
    availability: 'Limited',
    responseTime: 'Replies within 2 hours',
    formats: ['1:1 Live', 'Lab Review'],
    languages: ['English'],
    matchNote: 'Best for students balancing content-heavy science with deadlines.',
    intro:
      'Biomedical mentor with a calm, highly structured approach to science revision, lab report discipline, and content-heavy exams.',
    achievements: [
      'B.Sc. in Biomedical Science, University of Melbourne',
      'Mentors IB and pre-med students across chemistry-heavy tracks',
      'Known for strong content compression methods before exams',
    ],
    teachingStyle: [
      'Focuses on recall frameworks and concept maps',
      'Pairs content revision with timed application practice',
      'Gives efficient pre-session prep briefs',
    ],
    outcomes: [
      'Helps students reduce overwhelm in content-dense subjects',
      'Strong fit for exam periods and lab-heavy modules',
      'Useful for learners who need weekly structure',
    ],
    nextSlots: ['Friday • 17:00', 'Saturday • 11:00'],
    weeklyAvailability: [
      { day: 'Fri', slots: ['17:00 - 19:00'] },
      { day: 'Sat', slots: ['11:00 - 13:00', '15:00 - 17:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Trang',
        school: 'International School Saigon Pearl',
        quote: 'He organizes chemistry revision in a way that finally feels manageable.',
      },
      {
        name: 'Long',
        school: 'VinUni',
        quote: 'Professional, clear, and very good for science-heavy exam prep.',
      },
    ],
  },
  {
    id: '6',
    name: 'Ms. Sophia Bui',
    role: 'Computer Science & Data Foundations',
    headline: 'Refined support for problem solving, coding confidence, and computational thinking.',
    quote:
      'Students grow faster when programming feels like a structured language rather than a wall of syntax.',
    subjects: ['Computer Science', 'Python', 'Data Analysis'],
    expertise: ['AP Computer Science', 'Python Foundations', 'Data Projects'],
    university: 'University of Toronto',
    rating: 4.93,
    reviews: 117,
    hourlyRate: 33,
    availability: 'Today',
    responseTime: 'Replies within 15 minutes',
    formats: ['1:1 Live', 'Project Review'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Strong for students who need coding confidence and project discipline.',
    intro:
      'Computer science mentor focused on making problem solving calm, logical, and sustainable for students entering technical pathways.',
    achievements: [
      'M.Sc. in Computer Science, University of Toronto',
      'Coached students on coursework, coding interviews, and academic projects',
      'Strong track record with beginner-to-intermediate learners',
    ],
    teachingStyle: [
      'Teaches through patterns instead of isolated syntax',
      'Turns projects into milestone-driven study plans',
      'Uses live debugging to build confidence quickly',
    ],
    outcomes: [
      'Students gain stronger logic and debugging habits',
      'Excellent fit for academic coding and portfolio projects',
      'Helps reduce fear around technical coursework',
    ],
    nextSlots: ['Tonight • 18:00', 'Tomorrow • 20:00', 'Saturday • 09:30'],
    weeklyAvailability: [
      { day: 'Mon', slots: ['18:00 - 20:00'] },
      { day: 'Tue', slots: ['20:00 - 22:00'] },
      { day: 'Sat', slots: ['09:30 - 12:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Nhi',
        school: 'Australian International School',
        quote: 'She makes programming feel much less intimidating and far more structured.',
      },
      {
        name: 'Tuan',
        school: 'University of Economics Ho Chi Minh City',
        quote: 'Project feedback is practical, clear, and genuinely professional.',
      },
    ],
  },
  {
    id: '7',
    name: 'Ms. Yuna Hoang',
    role: 'IELTS Speaking & Communication',
    headline: 'Focused coaching for confident speaking, natural fluency, and high-band interview performance.',
    quote:
      'Fluency is not speed. It is clarity under pressure, built through repeatable speaking routines.',
    subjects: ['English', 'IELTS', 'Public Speaking'],
    expertise: ['IELTS Speaking', 'Pronunciation', 'Interview Training'],
    university: 'University College London',
    rating: 4.94,
    reviews: 152,
    hourlyRate: 29,
    availability: 'Today',
    responseTime: 'Replies within 25 minutes',
    formats: ['1:1 Live', 'Mock Interview'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Best for learners targeting rapid band score progress.',
    intro:
      'Communication mentor specialized in structured speaking drills, pronunciation clarity, and confidence for IELTS and scholarship interviews.',
    achievements: [
      'M.A. in Applied Linguistics, UCL',
      'Coached 400+ IELTS speaking candidates',
      'Known for concise, high-impact correction frameworks',
    ],
    teachingStyle: [
      'Uses timed speaking rounds with reflection loops',
      'Targets filler reduction and lexical precision',
      'Provides short between-session voice drills',
    ],
    outcomes: [
      'Typical speaking band gains within 6 to 8 sessions',
      'Students report stronger confidence in live interviews',
      'Effective for learners who freeze under pressure',
    ],
    nextSlots: ['Tonight • 19:00', 'Tomorrow • 17:30', 'Saturday • 10:30'],
    weeklyAvailability: [
      { day: 'Mon', slots: ['19:00 - 21:00'] },
      { day: 'Tue', slots: ['17:30 - 20:00'] },
      { day: 'Sat', slots: ['10:30 - 13:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Hanh',
        school: 'VNU University of Languages',
        quote: 'My speaking became much more natural and controlled after each mock round.',
      },
      {
        name: 'Duc',
        school: 'RMIT Vietnam',
        quote: 'Very practical coaching. Every session has clear drills and measurable progress.',
      },
    ],
  },
  {
    id: '8',
    name: 'Mr. Adrian Phan',
    role: 'Product Thinking & UX Foundations',
    headline: 'Project-based mentoring for students building product portfolios and user-centered thinking.',
    quote:
      'Great portfolios are not pretty screens. They are clear decisions backed by user logic.',
    subjects: ['Product Design', 'UX Research', 'Portfolio'],
    expertise: ['UX Case Study', 'Product Strategy', 'Figma Workflows'],
    university: 'Carnegie Mellon University',
    rating: 4.89,
    reviews: 74,
    hourlyRate: 35,
    availability: 'This Week',
    responseTime: 'Replies within 1 hour',
    formats: ['1:1 Live', 'Portfolio Review'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Great for students applying to internships and design programs.',
    intro:
      'Product mentor helping learners turn fragmented ideas into polished portfolio case studies with strong narrative and decision quality.',
    achievements: [
      'M.HCI, Carnegie Mellon University',
      'Mentored 120+ student portfolio projects',
      'Former product designer across edtech and fintech',
    ],
    teachingStyle: [
      'Starts from user problem framing before UI',
      'Uses decision logs for each design iteration',
      'Coaches storytelling for portfolio interviews',
    ],
    outcomes: [
      'Students ship stronger portfolio case studies faster',
      'Improves product reasoning and presentation quality',
      'Useful for internship and grad-school applications',
    ],
    nextSlots: ['Thursday • 20:00', 'Saturday • 16:00', 'Sunday • 19:30'],
    weeklyAvailability: [
      { day: 'Thu', slots: ['20:00 - 22:00'] },
      { day: 'Sat', slots: ['16:00 - 18:30'] },
      { day: 'Sun', slots: ['19:30 - 21:30'] },
    ],
    reviewsPreview: [
      {
        name: 'Khanh',
        school: 'FPT University',
        quote: 'He helped me transform rough ideas into a portfolio that feels strategic and mature.',
      },
      {
        name: 'Uyen',
        school: 'University of Sydney',
        quote: 'Excellent for product thinking, not just visual polish.',
      },
    ],
  },
  {
    id: '9',
    name: 'Dr. Elena Vu',
    role: 'Biology & Medical Admissions',
    headline: 'Structured pathways for high-stakes biology exams and medicine-track applications.',
    quote:
      'Biology mastery comes from connecting systems, not memorizing disconnected details.',
    subjects: ['Biology', 'Human Physiology', 'Medical Prep'],
    expertise: ['IB Biology', 'UCAT Support', 'Medical Essays'],
    university: 'Imperial College London',
    rating: 4.92,
    reviews: 109,
    hourlyRate: 34,
    availability: 'Limited',
    responseTime: 'Replies within 90 minutes',
    formats: ['1:1 Live', 'Admissions Coaching'],
    languages: ['English'],
    matchNote: 'Ideal for students targeting medicine and life-science pathways.',
    intro:
      'Medical admissions and biology mentor focused on conceptual mapping, exam timing, and application readiness for competitive programs.',
    achievements: [
      'Ph.D. in Biomedical Sciences, Imperial College London',
      'Advised pre-med candidates across UK and Australia',
      'Strong track record in advanced biology performance gains',
    ],
    teachingStyle: [
      'Builds body-system maps before details',
      'Integrates exam reasoning with admissions strategy',
      'Tracks weak-topic recovery week by week',
    ],
    outcomes: [
      'Improves biological reasoning in complex questions',
      'Supports both exam outcomes and application quality',
      'Strong fit for motivated but overloaded learners',
    ],
    nextSlots: ['Friday • 20:30', 'Sunday • 09:00'],
    weeklyAvailability: [
      { day: 'Fri', slots: ['20:30 - 22:30'] },
      { day: 'Sun', slots: ['09:00 - 11:00', '14:00 - 16:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Phuc',
        school: 'BIS Hanoi',
        quote: 'She made dense biology topics feel connected and much easier to retain.',
      },
      {
        name: 'Ngoc',
        school: 'Monash University',
        quote: 'Very strategic guidance for both exams and med-school statements.',
      },
    ],
  },
  {
    id: '10',
    name: 'Mr. Ryan Tran',
    role: 'Finance, Accounting & Quant Skills',
    headline: 'Practical mentoring for business analytics, accounting fluency, and finance fundamentals.',
    quote:
      'Students perform better when numbers are tied to business context, not isolated formulas.',
    subjects: ['Finance', 'Accounting', 'Business Analytics'],
    expertise: ['Corporate Finance', 'Financial Modeling', 'CFA Level 1 Basics'],
    university: 'University of Warwick',
    rating: 4.87,
    reviews: 83,
    hourlyRate: 33,
    availability: 'This Week',
    responseTime: 'Replies within 50 minutes',
    formats: ['1:1 Live', 'Case Review'],
    languages: ['English', 'Vietnamese'],
    matchNote: 'Best for commerce students needing strong analytical structure.',
    intro:
      'Finance mentor blending academic clarity with market-oriented examples to help students think in frameworks, not just formulas.',
    achievements: [
      'M.Sc. in Finance, University of Warwick',
      'Mentored undergraduate finance and accounting cohorts',
      'Specialized in practical spreadsheet and modeling workflows',
    ],
    teachingStyle: [
      'Explains each model through business context first',
      'Uses compact weekly drills for numerical fluency',
      'Builds structured templates for case solving',
    ],
    outcomes: [
      'Students become faster and cleaner in quantitative work',
      'Strong improvements in finance-case confidence',
      'Useful for internship preparation and course performance',
    ],
    nextSlots: ['Thursday • 18:30', 'Saturday • 20:00', 'Sunday • 11:30'],
    weeklyAvailability: [
      { day: 'Thu', slots: ['18:30 - 20:30'] },
      { day: 'Sat', slots: ['20:00 - 22:00'] },
      { day: 'Sun', slots: ['11:30 - 14:00'] },
    ],
    reviewsPreview: [
      {
        name: 'Binh',
        school: 'Foreign Trade University',
        quote: 'His frameworks helped me stop guessing and solve finance cases with confidence.',
      },
      {
        name: 'Thao',
        school: 'UEH',
        quote: 'Great balance between theory and practical model-building.',
      },
    ],
  },
];

export function getTutorById(id?: string) {
  return tutors.find((tutor) => tutor.id === id) ?? tutors[0];
}
