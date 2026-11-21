import {useEffect, useState, type FormEvent} from 'react';
import {CheckCircle2, X} from 'lucide-react';
import type {ApplicationRecord, PetProfile} from '../data/pets';

export type ApplicationMode = 'Adoption' | 'Foster' | 'Visit';

interface AdoptionModalProps {
  isOpen: boolean;
  initialMode: ApplicationMode;
  selectedPet: PetProfile | null;
  allPets: PetProfile[];
  submittedApplications: ApplicationRecord[];
  onClose: () => void;
  onSubmitApplication: (record: ApplicationRecord) => void;
}

export function AdoptionModal({
  isOpen,
  initialMode,
  selectedPet,
  allPets,
  submittedApplications,
  onClose,
  onSubmitApplication,
}: AdoptionModalProps) {
  const [mode, setMode] = useState<ApplicationMode>(initialMode);
  const [petId, setPetId] = useState<string>(selectedPet?.id || allPets[0]?.id || '');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [housingType, setHousingType] = useState('House with fenced yard');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedRecord, setConfirmedRecord] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setPetId(selectedPet?.id || allPets[0]?.id || '');
      setConfirmedRecord(null);
      setErrorMsg('');
    }
  }, [isOpen, initialMode, selectedPet, allPets]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const chosenPet = allPets.find((p) => p.id === petId) || null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = applicantName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const digits = trimmedPhone.replace(/\D/g, '');
    if (digits.length < 7) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    if (mode === 'Visit' && !preferredDate) {
      setErrorMsg('Please choose a preferred sanctuary visit date.');
      return;
    }

    const referenceId = `PC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: ApplicationRecord = {
      referenceId,
      type: mode,
      petId: mode === 'Adoption' && chosenPet ? chosenPet.id : undefined,
      petName: mode === 'Adoption' && chosenPet ? chosenPet.name : undefined,
      applicantName: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      housingType,
      preferredDate: preferredDate || undefined,
      notes: notes.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    onSubmitApplication(record);
    setConfirmedRecord(record);
    setNotes('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-[#E2E7E0] rounded-xl overflow-hidden shadow-xl my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E2E7E0] bg-[#F8F9F7]">
          <div>
            <h2
              id="application-modal-title"
              className="font-display text-2xl font-semibold text-[#18201C]"
            >
              Sanctuary Application &amp; Visits
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close application form"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#4A5750] hover:text-[#18201C] hover:bg-[#EFF3EE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Mode Switcher */}
          <div
            role="group"
            aria-label="Application type"
            className="inline-flex items-center gap-1 p-1 bg-[#EFF3EE] rounded-lg"
          >
            {(['Adoption', 'Foster', 'Visit'] as ApplicationMode[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setMode(tab);
                  setConfirmedRecord(null);
                  setErrorMsg('');
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  mode === tab
                    ? 'bg-white text-[#18201C] shadow-xs'
                    : 'text-[#4A5750] hover:text-[#18201C]'
                }`}
              >
                {tab === 'Adoption' && 'Adoption Inquiry'}
                {tab === 'Foster' && 'Foster Program'}
                {tab === 'Visit' && 'Schedule Visit'}
              </button>
            ))}
          </div>

          {confirmedRecord ? (
            <div className="bg-[#F8F9F7] border border-[#D8DFD5] rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#18201C]">
                    {confirmedRecord.type} request received
                  </h3>
                  <p className="text-sm text-[#4A5750] mt-1 leading-relaxed">
                    Thank you, {confirmedRecord.applicantName}. Our placement coordinator will review
                    your household details and reach out at {confirmedRecord.email} within one
                    business day.
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E2E7E0] text-xs">
                <div>
                  <dt className="text-[#526058]">Reference Code</dt>
                  <dd className="font-mono font-medium text-[#18201C] mt-0.5 tabular-nums">
                    {confirmedRecord.referenceId}
                  </dd>
                </div>
                {confirmedRecord.petName && (
                  <div>
                    <dt className="text-[#526058]">Selected Resident</dt>
                    <dd className="font-medium text-[#18201C] mt-0.5">{confirmedRecord.petName}</dd>
                  </div>
                )}
                {confirmedRecord.preferredDate && (
                  <div>
                    <dt className="text-[#526058]">Preferred Date</dt>
                    <dd className="font-mono font-medium text-[#18201C] mt-0.5 tabular-nums">
                      {confirmedRecord.preferredDate}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-[#526058]">Submitted</dt>
                  <dd className="font-mono font-medium text-[#18201C] mt-0.5 tabular-nums">
                    {confirmedRecord.submittedAt}
                  </dd>
                </div>
              </dl>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmedRecord(null)}
                  className="px-4 py-2 text-xs font-medium text-[#18201C] bg-white border border-[#D8DFD5] hover:bg-[#EFF3EE] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {mode === 'Adoption' && (
                <div>
                  <label
                    htmlFor="pet-select"
                    className="block text-xs font-semibold text-[#18201C] mb-1.5"
                  >
                    Which resident are you applying for?
                  </label>
                  <select
                    id="pet-select"
                    value={petId}
                    onChange={(e) => setPetId(e.target.value)}
                    className="w-full h-11 px-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] focus:outline-none focus:border-[#1B4332]"
                  >
                    {allPets.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} — {pet.species}, {pet.ageLabel} ({pet.intakeCode})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="applicant-name"
                    className="block text-xs font-semibold text-[#18201C] mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="applicant-name"
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Jordan Alvarez"
                    className="w-full h-11 px-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] placeholder:text-[#6B7970] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="applicant-email"
                    className="block text-xs font-semibold text-[#18201C] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="applicant-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full h-11 px-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] placeholder:text-[#6B7970] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="applicant-phone"
                    className="block text-xs font-semibold text-[#18201C] mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(503) 555-0194"
                    className="w-full h-11 px-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] placeholder:text-[#6B7970] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="housing-type"
                    className="block text-xs font-semibold text-[#18201C] mb-1.5"
                  >
                    Living Situation
                  </label>
                  <select
                    id="housing-type"
                    value={housingType}
                    onChange={(e) => setHousingType(e.target.value)}
                    className="w-full h-11 px-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] focus:outline-none focus:border-[#1B4332]"
                  >
                    <option value="House with fenced yard">House with fenced yard</option>
                    <option value="House without fenced yard">House without fenced yard</option>
                    <option value="Apartment or condo">Apartment or condo</option>
                    <option value="Townhome with patio">Townhome with patio</option>
                  </select>
                </div>
              </div>

              {(mode === 'Visit' || mode === 'Adoption') && (
                <div>
                  <label
                    htmlFor="visit-date"
                    className="block text-xs font-semibold text-[#18201C] mb-1.5"
                  >
                    Preferred Meet-and-Greet Date {mode === 'Adoption' ? '(Optional)' : ''}
                  </label>
                  <input
                    id="visit-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-11 px-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] focus:outline-none focus:border-[#1B4332]"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="household-notes"
                  className="block text-xs font-semibold text-[#18201C] mb-1.5"
                >
                  {mode === 'Foster'
                    ? 'Foster Availability & Experience'
                    : 'Household, Resident Pets & Daily Routine'}
                </label>
                <textarea
                  id="household-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    mode === 'Foster'
                      ? 'Share whether you can foster dogs, cats, or kittens, and typical weekly schedule...'
                      : 'Tell us about adults/children at home, current pets, and a typical weekday schedule...'
                  }
                  className="w-full p-3.5 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] placeholder:text-[#6B7970] focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-medium text-[#991B1B]">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-[#4A5750] hover:text-[#18201C] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
                >
                  {mode === 'Adoption' && 'Submit Adoption Application'}
                  {mode === 'Foster' && 'Submit Foster Interest'}
                  {mode === 'Visit' && 'Confirm Visit Request'}
                </button>
              </div>
            </form>
          )}

          {/* Previously Submitted Inquiries in this Browser */}
          {submittedApplications.length > 0 && (
            <div className="pt-5 border-t border-[#E2E7E0]">
              <h3 className="text-xs font-semibold text-[#4A5750] mb-3">
                Your Recent Submissions ({submittedApplications.length})
              </h3>
              <div className="space-y-2">
                {submittedApplications.slice(0, 3).map((item) => (
                  <div
                    key={item.referenceId}
                    className="flex items-center justify-between gap-4 px-3.5 py-2.5 bg-[#F8F9F7] border border-[#E2E7E0] rounded-lg text-xs"
                  >
                    <div className="truncate">
                      <span className="font-mono font-medium text-[#18201C] tabular-nums">
                        {item.referenceId}
                      </span>
                      <span className="mx-2 text-[#6B7970]" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-[#18201C] font-medium">{item.type}</span>
                      {item.petName && <span className="text-[#526058]"> ({item.petName})</span>}
                    </div>
                    <span className="font-mono text-[#526058] tabular-nums shrink-0">
                      {item.submittedAt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
