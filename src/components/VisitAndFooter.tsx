interface VisitAndFooterProps {
  onBookVisit: () => void;
  onStartApplication: () => void;
}

export function VisitAndFooter({onBookVisit, onStartApplication}: VisitAndFooterProps) {
  return (
    <>
      {/* Sanctuary Visit & Hours Section */}
      <section id="visit" className="py-14 lg:py-16 bg-white border-t border-[#E2E7E0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-sm font-medium text-[#4A5750]">Visit Oakridge Sanctuary</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#18201C]">
                Walk the courtyard and meet residents in person
              </h2>
              <p className="text-sm text-[#4A5750] leading-relaxed max-w-lg">
                We schedule quiet 45-minute meet-and-greets so animals stay relaxed and your family
                has dedicated time with our adoption counselors.
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onBookVisit}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143628] rounded-lg transition-colors cursor-pointer"
                >
                  Schedule a Sanctuary Visit
                </button>
                <button
                  type="button"
                  onClick={onStartApplication}
                  className="px-4 py-2.5 text-sm font-medium text-[#18201C] border border-[#D8DFD5] hover:bg-[#EFF3EE] rounded-lg transition-colors cursor-pointer"
                >
                  Open Adoption Application
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F8F9F7] border border-[#E2E7E0] rounded-xl p-6">
              <div>
                <h3 className="text-xs font-semibold text-[#18201C] mb-2">Sanctuary Address</h3>
                <p className="text-sm text-[#4A5750] leading-relaxed">
                  4120 SE Oakridge Lane
                  <br />
                  Portland, OR 97214
                </p>
                <p className="text-xs text-[#526058] mt-3 font-mono tabular-nums">
                  (503) 555-0148 · care@pawcare-sanctuary.org
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[#18201C] mb-2">Visiting Hours</h3>
                <dl className="text-sm text-[#4A5750] space-y-1">
                  <div className="flex justify-between gap-4">
                    <dt>Tue – Fri</dt>
                    <dd className="font-mono text-xs tabular-nums text-[#18201C]">10:00 – 17:30</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Sat – Sun</dt>
                    <dd className="font-mono text-xs tabular-nums text-[#18201C]">09:30 – 16:30</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Monday</dt>
                    <dd className="text-xs text-[#6B7970]">Vet &amp; Deep Clean</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#F8F9F7] border-t border-[#E2E7E0] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#526058]">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-semibold text-[#18201C]">PawCare</span>
            <span aria-hidden="true">·</span>
            <span>501(c)(3) Non-Profit Animal Sanctuary · Portland, OR</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#adopt" className="hover:text-[#18201C] transition-colors">
              Adoptable Pets
            </a>
            <a href="#foster" className="hover:text-[#18201C] transition-colors">
              Foster Program
            </a>
            <a href="#impact" className="hover:text-[#18201C] transition-colors">
              Placement Ledger
            </a>
            <a href="#visit" className="hover:text-[#18201C] transition-colors">
              Visiting Hours
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
