/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect, useState} from 'react';
import {AdoptionModal, type ApplicationMode} from './components/AdoptionDrawer';
import {FosterAndImpactSection} from './components/FosterAndImpactSection';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {PetDetailModal} from './components/PetDetailModal';
import {PetDirectory} from './components/PetDirectory';
import {VisitAndFooter} from './components/VisitAndFooter';
import {SHELTER_PETS, type ApplicationRecord, type PetProfile} from './data/pets';

const SAVED_STORAGE_KEY = 'pawcare_saved_pet_ids';
const APPS_STORAGE_KEY = 'pawcare_submitted_applications';

function readStoredList<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [savedIds, setSavedIds] = useState<string[]>(() =>
    readStoredList<string>(SAVED_STORAGE_KEY, ['barnaby', 'miso']),
  );
  const [submittedApplications, setSubmittedApplications] = useState<ApplicationRecord[]>(() =>
    readStoredList<ApplicationRecord>(APPS_STORAGE_KEY, []),
  );

  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [activePet, setActivePet] = useState<PetProfile | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [applicationMode, setApplicationMode] = useState<ApplicationMode>('Adoption');
  const [applicationPet, setApplicationPet] = useState<PetProfile | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(submittedApplications));
    } catch {
      // Ignore storage quota errors
    }
  }, [submittedApplications]);

  const handleToggleSave = (petId: string) => {
    setSavedIds((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId],
    );
  };

  const handleOpenSaved = () => {
    setShowSavedOnly(true);
    const adoptSection = document.getElementById('adopt');
    if (adoptSection) {
      adoptSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  const openApplication = (mode: ApplicationMode, pet: PetProfile | null = null) => {
    setActivePet(null);
    setApplicationMode(mode);
    setApplicationPet(pet);
    setApplicationModalOpen(true);
  };

  const handleSubmitApplication = (record: ApplicationRecord) => {
    setSubmittedApplications((prev) => [record, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F7] text-[#18201C]">
      <Navbar
        savedCount={savedIds.length}
        onOpenSaved={handleOpenSaved}
        onStartApplication={() => openApplication('Adoption', null)}
      />

      <main className="flex-1">
        <HeroSection
          availableCount={SHELTER_PETS.length}
          onBookVisit={() => openApplication('Visit', null)}
        />

        <PetDirectory
          pets={SHELTER_PETS}
          savedIds={savedIds}
          showSavedOnly={showSavedOnly}
          onToggleShowSavedOnly={setShowSavedOnly}
          onToggleSave={handleToggleSave}
          onSelectPet={(pet) => setActivePet(pet)}
          onApplyPet={(pet) => openApplication('Adoption', pet)}
        />

        <FosterAndImpactSection onApplyFoster={() => openApplication('Foster', null)} />
      </main>

      <VisitAndFooter
        onBookVisit={() => openApplication('Visit', null)}
        onStartApplication={() => openApplication('Adoption', null)}
      />

      <PetDetailModal
        pet={activePet}
        isSaved={activePet ? savedIds.includes(activePet.id) : false}
        onClose={() => setActivePet(null)}
        onToggleSave={handleToggleSave}
        onStartAdoption={(pet) => openApplication('Adoption', pet)}
      />

      <AdoptionModal
        isOpen={applicationModalOpen}
        initialMode={applicationMode}
        selectedPet={applicationPet}
        allPets={SHELTER_PETS}
        submittedApplications={submittedApplications}
        onClose={() => setApplicationModalOpen(false)}
        onSubmitApplication={handleSubmitApplication}
      />
    </div>
  );
}
