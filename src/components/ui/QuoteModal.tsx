import { X } from 'lucide-react';
import QuoteCalculator from '../quote/QuoteCalculator';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;
}

export default function QuoteModal({ isOpen, onClose, service }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-auto overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        <QuoteCalculator 
          initialService={service}
          onSuccess={() => {
            // keep visible for review or user closes
          }}
          className="border-0 shadow-none p-6 sm:p-8"
        />
      </div>
    </div>
  );
}
