import {useMemo, useState} from 'react';
import {Bookmark, Search, X} from 'lucide-react';
import type {AgeGroup, PetProfile, Species} from '../data/pets';
import {SanctuaryImage} from './SanctuaryImage';

export type HomeFitFilter = 'all' | 'apartments' | 'dogs' | 'cats' | 'children';
export type SortOption = 'recent' | 'age_asc' | 'fee_asc';

interface PetDirectoryProps {
  pets: PetProfile[];
  savedIds: string[];
  showSavedOnly: boolean;
  onToggleShowSavedOnly: (value: boolean) => void;
  onToggleSave: (petId: string) => void;
  onSelectPet: (pet: PetProfile) => void;
  onApplyPet: (pet: PetProfile) => void;
}

const SPECIES_TABS: Array<{label: string; value: 'All' | Species}> = [
  {label: 'All Animals', value: 'All'},
  {label: 'Dogs', value: 'Dog'},
  {label: 'Cats', value: 'Cat'},
  {label: 'Rabbits', value: 'Rabbit'},
];

export function PetDirectory({
  pets,
  savedIds,
  showSavedOnly,
  onToggleShowSavedOnly,
  onToggleSave,
  onSelectPet,
  onApplyPet,
}: PetDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<'All' | Species>('All');
  const [ageFilter, setAgeFilter] = useState<'All' | AgeGroup>('All');
  const [homeFit, setHomeFit] = useState<HomeFitFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const filteredPets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = pets.filter((pet) => {
      if (showSavedOnly && !savedIds.includes(pet.id)) return false;
      if (speciesFilter !== 'All' && pet.species !== speciesFilter) return false;
      if (ageFilter !== 'All' && pet.ageGroup !== ageFilter) return false;

      if (homeFit === 'apartments' && !pet.compatibility.apartments) return false;
      if (homeFit === 'dogs' && !pet.compatibility.dogs) return false;
      if (homeFit === 'cats' && !pet.compatibility.cats) return false;
      if (homeFit === 'children' && !pet.compatibility.children) return false;

      if (query) {
        const haystack = `${pet.name} ${pet.breed} ${pet.species} ${pet.shortBio} ${pet.wingLocation}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'age_asc') return a.ageMonths - b.ageMonths;
      if (sortBy === 'fee_asc') return a.adoptionFee - b.adoptionFee;
      return a.daysInCare - b.daysInCare;
    });
  }, [pets, savedIds, showSavedOnly, speciesFilter, ageFilter, homeFit, searchQuery, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    speciesFilter !== 'All' ||
    ageFilter !== 'All' ||
    homeFit !== 'all' ||
    showSavedOnly;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSpeciesFilter('All');
    setAgeFilter('All');
    setHomeFit('all');
    setSortBy('recent');
    onToggleShowSavedOnly(false);
  };

  return (
    <section id="adopt" className="py-14 lg:py-20 bg-[#F8F9F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-medium text-[#4A5750] mb-2">
              Current Sanctuary &amp; Foster Residents
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#18201C]">
              Meet animals ready for adoption
            </h2>
          </div>

          <p className="text-sm text-[#526058] max-w-md leading-relaxed">
            Every profile includes verified vaccination dates, compatibility notes from daily
            handlers, and a transparent adoption fee.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white border border-[#E2E7E0] rounded-xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Species Segmented Control */}
            <div
              role="group"
              aria-label="Filter by species"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFF3EE] rounded-lg self-start"
            >
              {SPECIES_TABS.map((tab) => {
                const active = speciesFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setSpeciesFilter(tab.value)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] ${
                      active
                        ? 'bg-white text-[#18201C] shadow-xs'
                        : 'text-[#4A5750] hover:text-[#18201C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search & Saved Shortlist Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search
                  className="w-4 h-4 text-[#526058] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, breed, wing..."
                  aria-label="Search pets by name, breed, or location"
                  className="w-full h-10 pl-10 pr-9 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] placeholder:text-[#6B7970] focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#526058] hover:text-[#18201C] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => onToggleShowSavedOnly(!showSavedOnly)}
                aria-pressed={showSavedOnly}
                className={`inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] ${
                  showSavedOnly
                    ? 'bg-[#1B4332] text-white border-[#1B4332]'
                    : 'bg-white text-[#18201C] border-[#D8DFD5] hover:bg-[#EFF3EE]'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${showSavedOnly ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                <span className="tabular-nums">Saved ({savedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Secondary Filters Row */}
          <div className="pt-3 border-t border-[#EFF3EE] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-medium text-[#4A5750]">
                <span>Age</span>
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value as 'All' | AgeGroup)}
                  className="h-9 px-3 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] focus:outline-none focus:border-[#1B4332]"
                >
                  <option value="All">All Ages</option>
                  <option value="Young">Young (Under 18 mos)</option>
                  <option value="Adult">Adult</option>
                  <option value="Senior">Senior (7+ yrs)</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-[#4A5750]">
                <span>Home Fit</span>
                <select
                  value={homeFit}
                  onChange={(e) => setHomeFit(e.target.value as HomeFitFilter)}
                  className="h-9 px-3 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] focus:outline-none focus:border-[#1B4332]"
                >
                  <option value="all">Any Household</option>
                  <option value="apartments">Apartment Friendly</option>
                  <option value="dogs">Good with Dogs</option>
                  <option value="cats">Good with Cats</option>
                  <option value="children">Good with Children</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-[#4A5750]">
                <span>Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-9 px-3 text-sm bg-[#F8F9F7] border border-[#D8DFD5] rounded-lg text-[#18201C] focus:outline-none focus:border-[#1B4332]"
                >
                  <option value="recent">Newest Arrivals</option>
                  <option value="age_asc">Youngest First</option>
                  <option value="fee_asc">Lowest Adoption Fee</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#526058]">
              <span className="tabular-nums">
                Showing {filteredPets.length} of {pets.length} residents
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="font-medium text-[#1B4332] hover:underline underline-offset-4 cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State or 3-Column Pet Grid */}
        {filteredPets.length === 0 ? (
          <div className="bg-white border border-[#E2E7E0] rounded-xl px-6 py-14 text-center">
            <h3 className="font-display text-2xl font-semibold text-[#18201C] mb-2">
              {showSavedOnly
                ? 'No animals in your saved shortlist yet'
                : 'No residents match those filters'}
            </h3>
            <p className="text-sm text-[#526058] max-w-md mx-auto mb-6 leading-relaxed">
              {showSavedOnly
                ? 'Bookmark any dog, cat, or rabbit from the directory to compare medical notes and apply together.'
                : 'Try broadening your home fit or age filter to inspect all animals currently at Oakridge Sanctuary.'}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
            >
              Show All Animals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPets.map((pet) => {
              const isSaved = savedIds.includes(pet.id);
              return (
                <article
                  key={pet.id}
                  className="group bg-white border border-[#E2E7E0] rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* 4:3 Portrait */}
                  <button
                    type="button"
                    onClick={() => onSelectPet(pet)}
                    aria-label={`View full profile for ${pet.name}`}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFF3EE] block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B4332]"
                  >
                    <SanctuaryImage
                      src={pet.imageUrl}
                      alt={`${pet.name}, ${pet.ageLabel} ${pet.breed}`}
                      title={pet.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean Unboxed Metadata with middot separators */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#526058] mb-2">
                        <span className="truncate">
                          {pet.species} · {pet.ageLabel} · {pet.sex} · {pet.energyLevel}
                        </span>
                        <span className="font-mono text-[11px] text-[#6B7970] tabular-nums shrink-0">
                          {pet.intakeCode}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <h3 className="font-display text-2xl font-semibold text-[#18201C]">
                          <button
                            type="button"
                            onClick={() => onSelectPet(pet)}
                            className="hover:text-[#1B4332] transition-colors text-left cursor-pointer"
                          >
                            {pet.name}
                          </button>
                        </h3>
                        <span className="font-mono text-sm font-medium text-[#18201C] tabular-nums shrink-0">
                          {pet.adoptionFee === 0 ? 'Fee Waived' : `$${pet.adoptionFee}`}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-[#4A5750] mb-3">{pet.breed}</p>

                      <p className="text-sm text-[#4A5750] leading-relaxed line-clamp-3">
                        {pet.shortBio}
                      </p>

                      {pet.medical.specialCareNote && (
                        <p className="mt-3 text-xs font-medium text-[#92400E]">
                          Senior Program: {pet.feeNote || 'Includes medical support'}
                        </p>
                      )}
                    </div>

                    {/* Footer Action Row */}
                    <div className="pt-4 border-t border-[#EFF3EE] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleSave(pet.id)}
                        aria-pressed={isSaved}
                        aria-label={isSaved ? `Remove ${pet.name} from saved` : `Save ${pet.name}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] ${
                          isSaved
                            ? 'bg-[#EFF3EE] text-[#1B4332] border-[#C5D3C2]'
                            : 'bg-white text-[#4A5750] border-[#E2E7E0] hover:text-[#18201C] hover:bg-[#F8F9F7]'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`}
                          aria-hidden="true"
                        />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectPet(pet)}
                          className="px-3.5 py-2 text-xs font-medium text-[#18201C] hover:bg-[#EFF3EE] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332]"
                        >
                          Medical &amp; Notes
                        </button>
                        <button
                          type="button"
                          onClick={() => onApplyPet(pet)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332]"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
