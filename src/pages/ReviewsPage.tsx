import { useState } from 'react';
import { PageRoute } from '../types';
import { REVIEWS } from '../data/reviewsData';
import { COMPANY_INFO, trackConversion } from '../data/config';
import { Star, CheckCircle2, Filter, ExternalLink, Calendar, Plus } from 'lucide-react';

interface ReviewsPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: () => void;
}

export default function ReviewsPage({ onNavigate, onOpenQuoteModal }: ReviewsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);

  // Filter reviews
  const filteredReviews = REVIEWS.filter(rev => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'carpet') return rev.service.toLowerCase().includes('carpet');
    if (selectedFilter === 'upholstery') return rev.service.toLowerCase().includes('upholstery') || rev.service.toLowerCase().includes('couch');
    if (selectedFilter === 'mattress') return rev.service.toLowerCase().includes('mattress');
    if (selectedFilter === 'bond') return rev.service.toLowerCase().includes('bond') || rev.service.toLowerCase().includes('lease');
    return true;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Reviews Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <span className="text-amber-400">★★★★★</span>
            <span>Verified Customer Testimonials</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Trusted by Hundreds of Melbourne Homes & Businesses
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Read real, unfiltered Google reviews from clients across Richmond, South Yarra, Docklands, and Greater Melbourne.
          </p>

          {/* Aggregate Rating Scoreboard */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 pt-4 text-xs sm:text-sm">
            <div className="bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-white">{COMPANY_INFO.ratings.googleRating}</span>
              <div className="text-left">
                <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                <div className="text-[11px] text-slate-400">Based on {COMPANY_INFO.ratings.totalReviews}+ reviews</div>
              </div>
            </div>

            <div className="bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-teal-400">100%</span>
              <div className="text-left">
                <div className="font-bold text-white text-xs">Satisfaction Guarantee</div>
                <div className="text-[11px] text-slate-400">Full bond refund compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Service Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'carpet', label: 'Carpet Steam Cleaning' },
              { id: 'upholstery', label: 'Upholstery & Couches' },
              { id: 'mattress', label: 'Mattress Sanitisation' },
              { id: 'bond', label: 'End of Lease / Bond' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedFilter === f.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={COMPANY_INFO.social.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Verify on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-lg shadow-slate-900/5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.avatarUrl && (
                    <img
                      src={rev.avatarUrl}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      <span>{rev.author}</span>
                      {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500">{rev.location}</div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Join Our Delighted Melbourne Customers?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Book online in under 60 seconds with zero upfront credit card required.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/20 uppercase tracking-wide"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
