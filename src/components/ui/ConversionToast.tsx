import { useState, useEffect } from 'react';
import { subscribeToAnalytics, TrackingEvent } from '../../data/config';
import { Activity, CheckCircle2, X } from 'lucide-react';

export default function ConversionToast() {
  const [activeEvents, setActiveEvents] = useState<TrackingEvent[]>([]);
  const [minimized, setMinimized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeToAnalytics((event) => {
      setActiveEvents(prev => [event, ...prev.slice(0, 3)]);
      // Auto dismiss oldest after 4.5 seconds
      setTimeout(() => {
        setActiveEvents(prev => prev.filter(e => e.id !== event.id));
      }, 4500);
    });
    return unsubscribe;
  }, []);

  if (activeEvents.length === 0) return null;

  return (
    <aside aria-label="Event tracking notification" className="fixed bottom-20 sm:bottom-6 left-4 z-50 max-w-sm flex flex-col gap-2 pointer-events-none">
      {activeEvents.map((evt) => (
        <div
          key={evt.id}
          className="pointer-events-auto bg-slate-950/95 text-white backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl border border-teal-500/30 flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-teal-400 uppercase tracking-wider text-[10px]">
              <CheckCircle2 className="w-3 h-3" />
              GA4 & Google Ads Event Fired
            </div>
            <p className="text-slate-200 font-semibold mt-0.5">
              {evt.label}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
              <code>event: {evt.type}</code>
              {evt.value && <span className="text-emerald-400 font-bold">${evt.value} AUD</span>}
              <span>• {evt.timestamp}</span>
            </div>
          </div>
          <button
            onClick={() => setActiveEvents(prev => prev.filter(e => e.id !== evt.id))}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss tracking notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
}
