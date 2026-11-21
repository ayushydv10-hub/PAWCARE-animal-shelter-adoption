import {useState} from 'react';
import {CheckCircle2} from 'lucide-react';
import {ADOPTER_STORIES} from '../data/pets';

interface FosterAndImpactSectionProps {
  onApplyFoster: () => void;
}

const ADOPTION_STEPS = [
  {
    number: '01.',
    title: 'Browse & Save a Shortlist',
    detail:
      'Filter by species, home setup, and energy level. Every card links directly to full vaccination dates and handler notes.',
  },
  {
    number: '02.',
    title: 'Submit Household Match',
    detail:
      'Complete a 3-minute household inquiry so our team can confirm compatibility with resident pets, stairs, or children.',
  },
  {
    number: '03.',
    title: 'Guided Sanctuary Meet & Greet',
    detail:
      'Spend 45 unhurried minutes in our Cedar Courtyard or Sunroom Loft alongside the caretaker who works with your match daily.',
  },
  {
    number: '04.',
    title: 'Transition & 30-Day Vet Support',
    detail:
      'Go home with starter food, microchip registration transferred on-site, and direct access to our veterinary helpline for 30 days.',
  },
];

const SPONSOR_TIERS = [
  {
    id: 'vaccines',
    amount: 25,
    title: 'Intake Vaccine & Microchip Kit',
    detail: 'Covers core vaccinations, deworming, and lifetime registry for one new arrival.',
  },
  {
    id: 'senior',
    amount: 60,
    title: 'Week of Senior Joint & Diet Care',
    detail: 'Funds prescription joint support and soft orthopedic bedding for senior residents.',
  },
  {
    id: 'surgery',
    amount: 120,
    title: 'Spay & Neuter Surgical Grant',
    detail: 'Underwrites a full surgical procedure and pain-management recovery protocol.',
  },
];

export function FosterAndImpactSection({onApplyFoster}: FosterAndImpactSectionProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('senior');
  const [pledgedAmount, setPledgedAmount] = useState<number | null>(null);

  const selectedTier = SPONSOR_TIERS.find((t) => t.id === selectedTierId) || SPONSOR_TIERS[1];

  return (
    <>
      {/* Section: Adoption Workflow & Foster Care */}
      <section id="foster" className="py-14 lg:py-20 bg-white border-t border-b border-[#E2E7E0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-sm font-medium text-[#4A5750]">How Placement Works</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#18201C]">
                Transparent steps from inquiry to first night home.
              </h2>
              <p className="text-sm text-[#4A5750] leading-relaxed">
                Not ready to adopt permanently? Short-term neighborhood fosters give recovering pets
                and young litters calm home routines while PawCare covers 100% of supplies and vet
                care.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onApplyFoster}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
                >
                  Apply to Become a Foster
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ADOPTION_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="p-6 bg-[#F8F9F7] border border-[#E2E7E0] rounded-xl space-y-2.5"
                >
                  <div className="font-mono text-sm font-medium text-[#1B4332] tabular-nums">
                    {step.number}
                  </div>
                  <h3 className="text-base font-semibold text-[#18201C]">{step.title}</h3>
                  <p className="text-sm text-[#4A5750] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Adopter Stories & Direct Supply Sponsorship */}
      <section id="impact" className="py-14 lg:py-20 bg-[#F8F9F7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#4A5750] mb-2">
                Community Placement Ledger
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#18201C]">
                Recent adoptions across Oregon
              </h2>
            </div>
            <p className="text-sm text-[#526058] max-w-md">
              Real transition notes shared by families 60 days after bringing a PawCare animal home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADOPTER_STORIES.map((story) => (
              <article
                key={story.id}
                className="bg-white border border-[#E2E7E0] rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <p className="text-sm text-[#18201C] leading-relaxed">“{story.outcome}”</p>
                <div className="pt-4 border-t border-[#EFF3EE]">
                  <div className="text-sm font-semibold text-[#18201C]">{story.adopterName}</div>
                  <div className="text-xs text-[#526058] mt-0.5">
                    {story.city} · Adopted {story.petAdopted}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Direct Care Sponsorship Module */}
          <div className="bg-white border border-[#E2E7E0] rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <p className="text-xs font-semibold text-[#1B4332]">Direct Medical Sponsorship</p>
                <h3 className="font-display text-2xl font-semibold text-[#18201C]">
                  Fund an animal’s care kit directly
                </h3>
                <p className="text-sm text-[#4A5750] leading-relaxed">
                  100% of care sponsorships go directly to medical intake kits, senior supplements,
                  and surgical grants for animals awaiting placement.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SPONSOR_TIERS.map((tier) => {
                    const active = selectedTierId === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setSelectedTierId(tier.id);
                          setPledgedAmount(null);
                        }}
                        className={`p-4 text-left rounded-lg border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#EFF3EE] border-[#1B4332]'
                            : 'bg-[#F8F9F7] border-[#E2E7E0] hover:border-[#C5D3C2]'
                        }`}
                      >
                        <div className="font-mono text-lg font-medium text-[#18201C] tabular-nums">
                          ${tier.amount}
                        </div>
                        <div className="text-xs font-semibold text-[#18201C] mt-1">
                          {tier.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-[#526058] max-w-md">{selectedTier.detail}</p>

                  {pledgedAmount ? (
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B4332] shrink-0">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span className="tabular-nums">
                        ${pledgedAmount} pledge recorded — thank you
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPledgedAmount(selectedTier.amount)}
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Sponsor ${selectedTier.amount} Care Kit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
