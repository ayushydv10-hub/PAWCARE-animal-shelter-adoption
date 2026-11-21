export type Species = 'Dog' | 'Cat' | 'Rabbit';
export type AgeGroup = 'Young' | 'Adult' | 'Senior';
export type EnergyLevel = 'Calm' | 'Moderate' | 'Active';
export type PetSize = 'Small' | 'Medium' | 'Large';

export interface MedicalRecord {
  spayedOrNeutered: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  lastVetExam: string;
  healthSummary: string;
  specialCareNote?: string;
}

export interface PetProfile {
  id: string;
  intakeCode: string;
  name: string;
  species: Species;
  breed: string;
  ageLabel: string;
  ageMonths: number;
  ageGroup: AgeGroup;
  sex: 'Male' | 'Female';
  weightLbs: number;
  size: PetSize;
  energyLevel: EnergyLevel;
  adoptionFee: number;
  feeNote?: string;
  daysInCare: number;
  wingLocation: string;
  imageUrl: string;
  shortBio: string;
  caretakerNotes: string;
  idealHome: string;
  compatibility: {
    dogs: boolean;
    cats: boolean;
    children: boolean;
    apartments: boolean;
  };
  medical: MedicalRecord;
}

export interface ApplicationRecord {
  referenceId: string;
  type: 'Adoption' | 'Foster' | 'Visit';
  petId?: string;
  petName?: string;
  applicantName: string;
  email: string;
  phone: string;
  housingType: string;
  preferredDate?: string;
  notes: string;
  submittedAt: string;
}

export const HERO_IMAGE_URL = '/src/assets/images/hero_shelter_sanctuary_1795249566610.jpg';

export const SHELTER_METRICS = [
  {
    value: '98.4%',
    label: 'Live Release Rate',
    detail: 'Audited 2025–2026 shelter outcome ledger',
  },
  {
    value: '1,420',
    label: 'Adoptions Placed',
    detail: 'Dogs, cats, and small mammals placed this year',
  },
  {
    value: '100%',
    label: 'Vet-Cleared & Chipped',
    detail: 'Full core vaccines, exam, and registry included',
  },
  {
    value: '14 Days',
    label: 'Median Care Stay',
    detail: 'Supported by 185 active neighborhood foster homes',
  },
];

export const ADOPTER_STORIES = [
  {
    id: 'story-1',
    adopterName: 'Hannah & David Morales',
    city: 'Portland, OR',
    petAdopted: 'Otis (5-year Hound Mix)',
    outcome:
      'Otis arrived shy after three months in a rural impound. PawCare paired him with a quiet foster home first, shared his full orthopedic notes, and within two weeks of adoption he was hiking three miles every Sunday morning.',
  },
  {
    id: 'story-2',
    adopterName: 'Priya Subramanian',
    city: 'Beaverton, OR',
    petAdopted: 'Juniper (3-year Domestic Shorthair)',
    outcome:
      'As a first-time cat owner living in a downtown flat, I appreciated the honest temperament log instead of generic sales copy. The 30-day post-adoption vet helpline answered every nutrition question in minutes.',
  },
  {
    id: 'story-3',
    adopterName: 'Thomas Callahan',
    city: 'Lake Oswego, OR',
    petAdopted: 'Bramwell (9-year Spaniel Mix)',
    outcome:
      'PawCare waived Bramwell’s senior fee and walked us through his mild arthritis regimen with zero surprises. He sleeps under my studio desk while I draft and greets every neighbor at the gate.',
  },
];

export const SHELTER_PETS: PetProfile[] = [
  {
    id: 'barnaby',
    intakeCode: 'PC-2026-041',
    name: 'Barnaby',
    species: 'Dog',
    breed: 'Golden Retriever & Shepherd Mix',
    ageLabel: '2 yrs',
    ageMonths: 24,
    ageGroup: 'Adult',
    sex: 'Male',
    weightLbs: 54,
    size: 'Medium',
    energyLevel: 'Moderate',
    adoptionFee: 165,
    daysInCare: 19,
    wingLocation: 'Cedar Courtyard · Suite 4',
    imageUrl: '/src/assets/images/pet_barnaby_dog_1795249568477.jpg',
    shortBio:
      'Steady, leash-trained companion who greets unfamiliar guests calmly and settles beside you after a morning walk.',
    caretakerNotes:
      'Barnaby walks smoothly on a loose flat collar and checks back in at street corners without pulling. In group yard play he prefers gentle sniffing over rough wrestling and takes redirection easily. He knows sit, wait at thresholds, and settles quietly on a mat during office hours.',
    idealHome:
      'A home with daily 45-minute walks and someone who enjoys relaxed weekend trails. Does well with a calm resident dog or as an only pet.',
    compatibility: {
      dogs: true,
      cats: false,
      children: true,
      apartments: true,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 12, 2026',
      healthSummary: 'Rabies, DHPP, Bordetella, and heartworm negative. Clean dental check.',
    },
  },
  {
    id: 'miso',
    intakeCode: 'PC-2026-053',
    name: 'Miso',
    species: 'Cat',
    breed: 'Ginger Tabby Domestic Shorthair',
    ageLabel: '1 yr 6 mos',
    ageMonths: 18,
    ageGroup: 'Adult',
    sex: 'Female',
    weightLbs: 9,
    size: 'Small',
    energyLevel: 'Calm',
    adoptionFee: 110,
    daysInCare: 11,
    wingLocation: 'Sunroom Conservatory · Loft 2',
    imageUrl: '/src/assets/images/pet_miso_cat_1795249567899.jpg',
    shortBio:
      'Affectionate sunlit napper who chirps softly when you enter the room and prefers window perches over chaos.',
    caretakerNotes:
      'Miso warmed up to our conservatory volunteers within twenty-four hours of intake. She uses her covered litter box consistently, loves wool wand toys for ten minutes before dinner, and curls onto linen cushions for long afternoon naps.',
    idealHome:
      'Quiet or moderately lively apartments and houses. Happy alongside respectful children aged 6+ or a gentle resident cat.',
    compatibility: {
      dogs: false,
      cats: true,
      children: true,
      apartments: true,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 14, 2026',
      healthSummary: 'FVRCP, Rabies current. FIV/FeLV negative. Healthy weight and coat.',
    },
  },
  {
    id: 'koda',
    intakeCode: 'PC-2026-038',
    name: 'Koda',
    species: 'Dog',
    breed: 'Australian Shepherd Mix',
    ageLabel: '3 yrs',
    ageMonths: 36,
    ageGroup: 'Adult',
    sex: 'Male',
    weightLbs: 48,
    size: 'Medium',
    energyLevel: 'Active',
    adoptionFee: 165,
    daysInCare: 27,
    wingLocation: 'North Meadow · Run 1',
    imageUrl: '/src/assets/images/pet_koda_dog_1795249567310.jpg',
    shortBio:
      'Bright, attentive herding mix who thrives on puzzle feeders, trail runs, and learning new cues every week.',
    caretakerNotes:
      'Koda is one of the sharpest problem-solvers in care right now—he mastered our level-three scent box in four minutes. He bonds closely with handlers and prefers structured outdoor exercise before settling indoors.',
    idealHome:
      'Active household with a runner, hiker, or handler interested in agility or nosework. Fenced yard or regular trail access recommended.',
    compatibility: {
      dogs: true,
      cats: false,
      children: false,
      apartments: false,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 09, 2026',
      healthSummary: 'Full core vaccination series complete, monthly flea/tick prevention active.',
    },
  },
  {
    id: 'sage',
    intakeCode: 'PC-2026-061',
    name: 'Sage',
    species: 'Cat',
    breed: 'Russian Blue Mix',
    ageLabel: '4 yrs',
    ageMonths: 48,
    ageGroup: 'Adult',
    sex: 'Female',
    weightLbs: 10,
    size: 'Small',
    energyLevel: 'Calm',
    adoptionFee: 110,
    daysInCare: 15,
    wingLocation: 'Sunroom Conservatory · Loft 5',
    imageUrl: '/src/assets/images/pet_sage_cat_1795249568264.jpg',
    shortBio:
      'Poised, quiet observer with velvet silver fur who chooses one favorite chair and keeps peaceful company.',
    caretakerNotes:
      'Sage appreciates slow introductions—give her two minutes to sniff your knuckles and she will lean right into a cheek scratch. She prefers calm spaces without loud barking and enjoys high shelving where she can watch birds.',
    idealHome:
      'Low-noise apartment or studio with a remote worker or calm household. Best as the solo cat or with one gentle senior cat.',
    compatibility: {
      dogs: false,
      cats: true,
      children: false,
      apartments: true,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 16, 2026',
      healthSummary: 'FVRCP, Rabies current. FIV/FeLV negative. Recent dental scaling completed.',
    },
  },
  {
    id: 'clover',
    intakeCode: 'PC-2026-067',
    name: 'Clover',
    species: 'Rabbit',
    breed: 'Holland Lop Mix',
    ageLabel: '1 yr',
    ageMonths: 12,
    ageGroup: 'Young',
    sex: 'Female',
    weightLbs: 4,
    size: 'Small',
    energyLevel: 'Calm',
    adoptionFee: 75,
    daysInCare: 9,
    wingLocation: 'Garden Hutch · Atrium B',
    imageUrl: '/src/assets/images/pet_clover_rabbit_1795249568887.jpg',
    shortBio:
      'Curious, litter-trained house rabbit who loves timothy hay tunnels, parsley sprigs, and gentle floor-level company.',
    caretakerNotes:
      'Clover uses her hay-lined corner pan reliably and comes hopping over whenever fresh cilantro is brought into the atrium. She prefers staying on all four paws rather than being scooped up high.',
    idealHome:
      'Indoor bunny-proofed room or large x-pen enclosure. Great match for calm apartments and gentle older children.',
    compatibility: {
      dogs: false,
      cats: false,
      children: true,
      apartments: true,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 17, 2026',
      healthSummary: 'Spayed, RHDV2 vaccinated, healthy incisors and clean ear check.',
    },
  },
  {
    id: 'pip',
    intakeCode: 'PC-2026-072',
    name: 'Pip',
    species: 'Dog',
    breed: 'Border Terrier Mix',
    ageLabel: '5 mos',
    ageMonths: 5,
    ageGroup: 'Young',
    sex: 'Male',
    weightLbs: 14,
    size: 'Small',
    energyLevel: 'Active',
    adoptionFee: 210,
    daysInCare: 8,
    wingLocation: 'Foster Home · Laurelhurst',
    imageUrl: '/src/assets/images/pet_pip_dog_1795249569319.jpg',
    shortBio:
      'Cheerful wire-haired pup practicing crate naps, recall games, and polite greetings in an experienced foster home.',
    caretakerNotes:
      'Pip currently sleeps through the night in his crate from 10 pm to 6:30 am with one potty break. His foster family has started basic leash manners and socialization with calm adult dogs.',
    idealHome:
      'Household ready for puppy routines, positive reinforcement classes, and plenty of playtime. Apartment-friendly with regular outings.',
    compatibility: {
      dogs: true,
      cats: true,
      children: true,
      apartments: true,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 18, 2026',
      healthSummary: 'Age-appropriate puppy boosters complete; final booster voucher included.',
    },
  },
  {
    id: 'luna',
    intakeCode: 'PC-2026-019',
    name: 'Luna',
    species: 'Dog',
    breed: 'Yellow Labrador Mix',
    ageLabel: '9 yrs',
    ageMonths: 108,
    ageGroup: 'Senior',
    sex: 'Female',
    weightLbs: 62,
    size: 'Large',
    energyLevel: 'Calm',
    adoptionFee: 0,
    feeNote: 'Fee-waived Senior Sanctuary Program',
    daysInCare: 34,
    wingLocation: 'Oak Suite · Ground Floor',
    imageUrl: '/src/assets/images/pet_luna_dog_1795249569415.jpg',
    shortBio:
      'Gentle senior sweetheart who asks only for a sunlit rug, unhurried neighborhood strolls, and evening companionship.',
    caretakerNotes:
      'Luna came to us when her longtime guardian moved into memory care. She is completely house-trained, ignores passing cyclists, and greets every staff member with a slow, steady tail wag. Ground-floor access helps keep her hips comfortable.',
    idealHome:
      'Quiet ground-floor home or elevator building with easy access outdoors. Wonderful with gentle children, cats, and laid-back dogs.',
    compatibility: {
      dogs: true,
      cats: true,
      children: true,
      apartments: true,
    },
    medical: {
      spayedOrNeutered: true,
      vaccinated: true,
      microchipped: true,
      lastVetExam: 'Nov 15, 2026',
      healthSummary: 'Senior blood panel normal. Mild hip stiffness managed cleanly on daily joint supplement.',
      specialCareNote: 'Includes 6-month joint supplement supply & waived senior adoption fee.',
    },
  },
];
