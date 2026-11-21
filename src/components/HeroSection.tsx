import {ArrowRight} from 'lucide-react';
import {HERO_IMAGE_URL, SHELTER_METRICS} from '../data/pets';
import {SanctuaryImage} from './SanctuaryImage';

interface HeroSectionProps {
  onBookVisit: () => void;
  availableCount: number;
}

export function HeroSection({onBookVisit, availableCount}: HeroSectionProps) {
  return (
    <section id="top" className="border-b border-[#E2E7E0] bg-[#F8F9F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#4A5750] mb-4">
                Oakridge Sanctuary · Portland, Oregon · {availableCount} pets ready for homes
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-[#18201C] leading-[1.08] mb-5"
                style={{fontSize: 'clamp(2.25rem, 4vw, 3.6rem)'}}
              >
                Every rescue deserves a prepared home, never a rushed guess.
              </h1>

              <p className="text-base sm:text-lg text-[#4A5750] leading-relaxed max-w-xl mb-8">
                PawCare pairs full veterinary transparency with honest caretaker field notes so you
                can meet dogs, cats, and house rabbits matched to your daily rhythm.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#adopt"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B4332]"
              >
                Browse Adoptable Pets
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onBookVisit}
                className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-[#18201C] hover:text-[#1B4332] underline underline-offset-4 decoration-[#C4CEC0] hover:decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
              >
                Schedule a sanctuary visit
              </button>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-[#E2E7E0] bg-[#EFF3EE]">
              <SanctuaryImage
                src={HERO_IMAGE_URL}
                alt="Caretaker sitting with a calm golden shepherd mix dog in the sunlit PawCare sanctuary courtyard"
                title="Oakridge Sanctuary Courtyard"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 sm:p-6"
                aria-hidden="false"
              >
                <p className="text-xs sm:text-sm font-medium text-white/95">
                  Cedar Courtyard · Daily guided meet-and-greets from 10:00 AM to 5:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Shelter Transparency Strip below Hero Split */}
        <div className="mt-10 lg:mt-12 pt-8 border-t border-[#E2E7E0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SHELTER_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-medium text-[#18201C] tabular-nums">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-[#18201C]">{metric.label}</div>
              <p className="text-xs text-[#526058] leading-relaxed">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
