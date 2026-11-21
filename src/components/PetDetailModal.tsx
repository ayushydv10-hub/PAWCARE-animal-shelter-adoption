import {useEffect} from 'react';
import {Bookmark, Check, Minus, X} from 'lucide-react';
import type {PetProfile} from '../data/pets';
import {SanctuaryImage} from './SanctuaryImage';

interface PetDetailModalProps {
  pet: PetProfile | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (petId: string) => void;
  onStartAdoption: (pet: PetProfile) => void;
}

export function PetDetailModal({
  pet,
  isSaved,
  onClose,
  onToggleSave,
  onStartAdoption,
}: PetDetailModalProps) {
  useEffect(() => {
    if (!pet) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pet, onClose]);

  if (!pet) return null;

  const compatibilityItems = [
    {
      label: pet.compatibility.dogs ? 'Comfortable with calm dogs' : 'Best as only dog',
      ok: pet.compatibility.dogs,
    },
    {
      label: pet.compatibility.cats ? 'Good with resident cats' : 'Needs a cat-free home',
      ok: pet.compatibility.cats,
    },
    {
      label: pet.compatibility.children
        ? 'Suitable for families with children'
        : 'Adult or older-teen household recommended',
      ok: pet.compatibility.children,
    },
    {
      label: pet.compatibility.apartments
        ? 'Apartment-friendly routine'
        : 'House with yard or trail access ideal',
      ok: pet.compatibility.apartments,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-[#E2E7E0] rounded-xl overflow-hidden shadow-xl my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E2E7E0] bg-[#F8F9F7]">
          <div className="text-xs text-[#526058] tabular-nums">
            <span className="font-mono font-medium text-[#18201C]">{pet.intakeCode}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{pet.wingLocation}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{pet.daysInCare} days in care</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close animal profile"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#4A5750] hover:text-[#18201C] hover:bg-[#EFF3EE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-start">
            <div className="md:col-span-5">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#EFF3EE] border border-[#E2E7E0]">
                <SanctuaryImage
                  src={pet.imageUrl}
                  alt={`${pet.name}, ${pet.breed}`}
                  title={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F8F9F7] border border-[#E2E7E0] rounded-lg">
                  <div className="text-[#526058]">Weight &amp; Size</div>
                  <div className="font-mono font-medium text-[#18201C] mt-0.5 tabular-nums">
                    {pet.weightLbs} lbs · {pet.size}
                  </div>
                </div>
                <div className="p-3 bg-[#F8F9F7] border border-[#E2E7E0] rounded-lg">
                  <div className="text-[#526058]">Adoption Fee</div>
                  <div className="font-mono font-medium text-[#18201C] mt-0.5 tabular-nums">
                    {pet.adoptionFee === 0 ? '$0 (Waived)' : `$${pet.adoptionFee}`}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-medium text-[#526058] mb-1">
                  {pet.species} · {pet.ageLabel} · {pet.sex} · {pet.energyLevel} Energy
                </p>
                <h2
                  id="pet-modal-title"
                  className="font-display text-3xl font-semibold text-[#18201C]"
                >
                  {pet.name}
                </h2>
                <p className="text-sm font-medium text-[#4A5750] mt-1">{pet.breed}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#18201C] mb-1.5">
                  Caretaker Field Notes
                </h3>
                <p className="text-sm text-[#4A5750] leading-relaxed">{pet.caretakerNotes}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#18201C] mb-1.5">
                  Recommended Home Environment
                </h3>
                <p className="text-sm text-[#4A5750] leading-relaxed">{pet.idealHome}</p>
              </div>
            </div>
          </div>

          {/* Household Compatibility & Veterinary Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E2E7E0]">
            <div>
              <h3 className="text-sm font-semibold text-[#18201C] mb-3">
                Household Compatibility
              </h3>
              <ul className="space-y-2.5">
                {compatibilityItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5 text-sm text-[#4A5750]">
                    {item.ok ? (
                      <Check
                        className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <Minus
                        className="w-4 h-4 text-[#6B7970] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#18201C] mb-3">
                Veterinary &amp; Intake Ledger
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#EFF3EE]">
                  <dt className="text-[#526058]">Spay / Neuter</dt>
                  <dd className="font-medium text-[#18201C]">
                    {pet.medical.spayedOrNeutered ? 'Completed' : 'Scheduled'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#EFF3EE]">
                  <dt className="text-[#526058]">Core Vaccinations</dt>
                  <dd className="font-medium text-[#18201C]">
                    {pet.medical.vaccinated ? 'Verified Current' : 'In Progress'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#EFF3EE]">
                  <dt className="text-[#526058]">Microchip Registry</dt>
                  <dd className="font-medium text-[#18201C]">
                    {pet.medical.microchipped ? 'Registered Included' : 'Pending'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#EFF3EE]">
                  <dt className="text-[#526058]">Last Exam Date</dt>
                  <dd className="font-mono text-xs font-medium text-[#18201C] tabular-nums">
                    {pet.medical.lastVetExam}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-[#526058] leading-relaxed">
                {pet.medical.healthSummary}
              </p>
              {pet.medical.specialCareNote && (
                <p className="mt-2 text-xs font-medium text-[#92400E]">
                  {pet.medical.specialCareNote}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E2E7E0] bg-[#F8F9F7] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleSave(pet.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#EFF3EE] text-[#1B4332] border-[#C5D3C2]'
                : 'bg-white text-[#18201C] border-[#D8DFD5] hover:bg-[#EFF3EE]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" />
            <span>{isSaved ? 'Saved to Shortlist' : 'Save to Shortlist'}</span>
          </button>

          <button
            type="button"
            onClick={() => onStartAdoption(pet)}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
          >
            Apply to Adopt {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
}
