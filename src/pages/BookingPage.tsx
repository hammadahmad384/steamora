import { PageRoute } from '../types';
import BookingWizard from '../components/booking/BookingWizard';
import { COMPANY_INFO } from '../data/config';
import { Sparkles, Phone, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface BookingPageProps {
  onNavigate: (route: PageRoute) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Online Scheduling Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          Book Your Melbourne Steam Clean
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Reserve your preferred arrival window in 4 simple steps. No upfront payment required; pay only upon completion and 100% satisfaction.
        </p>

        {/* Reassurance Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>100% Satisfaction Guarantee</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>7 Days a Week Availability</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Zero Upfront Card Needed</span>
          </span>
        </div>
      </section>

      {/* Embedded Wizard */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingWizard />
      </section>

      {/* Phone Alternate Dispatch */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs sm:text-sm text-slate-500">
          Prefer to book over the phone with our Melbourne dispatch coordinator?
        </p>
        <a
          href={`tel:${COMPANY_INFO.phoneTel}`}
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-teal-600 hover:text-teal-700 mt-1"
        >
          <Phone className="w-4 h-4" />
          <span>Call Dispatch Directly on {COMPANY_INFO.phone}</span>
        </a>
      </section>
    </div>
  );
}
