import {useState} from 'react';
import {Menu, X} from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onStartApplication: () => void;
}

export function Navbar({savedCount, onOpenSaved, onStartApplication}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSavedClick = () => {
    setMobileMenuOpen(false);
    onOpenSaved();
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9F7]/95 backdrop-blur-sm border-b border-[#E2E7E0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#18201C] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
        >
          PawCare
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A5750]"
        >
          <a
            href="#adopt"
            className="hover:text-[#18201C] hover:underline underline-offset-8 decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
          >
            Adopt
          </a>
          <button
            type="button"
            onClick={onOpenSaved}
            className="hover:text-[#18201C] hover:underline underline-offset-8 decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 py-1 tabular-nums cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
          >
            Saved ({savedCount})
          </button>
          <a
            href="#foster"
            className="hover:text-[#18201C] hover:underline underline-offset-8 decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
          >
            Foster &amp; Care
          </a>
          <a
            href="#impact"
            className="hover:text-[#18201C] hover:underline underline-offset-8 decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
          >
            Impact
          </a>
          <a
            href="#visit"
            className="hover:text-[#18201C] hover:underline underline-offset-8 decoration-[#1B4332] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] rounded-sm"
          >
            Visit
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartApplication}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B4332]"
          >
            Start Application
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#18201C] hover:bg-[#EFF3EE] rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E7E0] bg-[#F8F9F7] px-4 py-4 space-y-2">
          <a
            href="#adopt"
            onClick={handleLinkClick}
            className="block px-3 py-2.5 text-base font-medium text-[#18201C] hover:bg-[#EFF3EE] rounded-lg"
          >
            Adopt
          </a>
          <button
            type="button"
            onClick={handleSavedClick}
            className="w-full text-left px-3 py-2.5 text-base font-medium text-[#18201C] hover:bg-[#EFF3EE] rounded-lg tabular-nums cursor-pointer"
          >
            Saved ({savedCount})
          </button>
          <a
            href="#foster"
            onClick={handleLinkClick}
            className="block px-3 py-2.5 text-base font-medium text-[#18201C] hover:bg-[#EFF3EE] rounded-lg"
          >
            Foster &amp; Care
          </a>
          <a
            href="#impact"
            onClick={handleLinkClick}
            className="block px-3 py-2.5 text-base font-medium text-[#18201C] hover:bg-[#EFF3EE] rounded-lg"
          >
            Impact
          </a>
          <a
            href="#visit"
            onClick={handleLinkClick}
            className="block px-3 py-2.5 text-base font-medium text-[#18201C] hover:bg-[#EFF3EE] rounded-lg"
          >
            Visit
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartApplication();
              }}
              className="w-full py-3 px-4 text-sm font-medium text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
            >
              Start Application
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
