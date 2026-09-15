import { useState, useRef, useEffect } from 'react';
import { COMPANY_INFO, trackConversion } from '../../data/config';
import { Bot, X, Send, Sparkles, Phone, CheckCircle2, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
  fieldToSet?: string;
}

export default function SteamoraAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState(0);
  const [leadData, setLeadData] = useState({
    service: '',
    suburb: '',
    rooms: '',
    propertyType: '',
    name: '',
    phone: '',
    email: '',
    date: ''
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "Hi 👋 Welcome to Steamora! I'm Steamora Assistant, your Melbourne steam cleaning concierge. I can give you an instant estimate and check booking availability in under 60 seconds.",
      options: ['Carpet Steam Cleaning', 'Upholstery & Sofa', 'Mattress Sanitisation', 'Tile & Grout', 'Commercial Clean'],
      fieldToSet: 'service'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSelectOption = (option: string, field?: string) => {
    addMessage('user', option);
    const updated = { ...leadData };
    if (field) {
      (updated as any)[field] = option;
      setLeadData(updated);
    }
    proceedNextQuestion(option, updated);
  };

  const handleSendInput = () => {
    if (!inputVal.trim()) return;
    const val = inputVal.trim();
    setInputVal('');
    addMessage('user', val);

    // Map according to current step
    const updated = { ...leadData };
    if (step === 1) updated.suburb = val;
    else if (step === 2) updated.rooms = val;
    else if (step === 3) updated.propertyType = val;
    else if (step === 4) updated.name = val;
    else if (step === 5) updated.phone = val;
    else if (step === 6) updated.email = val;
    else if (step === 7) updated.date = val;
    setLeadData(updated);

    proceedNextQuestion(val, updated);
  };

  const addMessage = (sender: 'bot' | 'user', text: string, options?: string[], fieldToSet?: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: 'msg_' + Math.random().toString(36).substring(2, 8),
        sender,
        text,
        options,
        fieldToSet
      }
    ]);
  };

  const proceedNextQuestion = (lastAnswer: string, currentLead: typeof leadData) => {
    const nextStep = step + 1;
    setStep(nextStep);

    setTimeout(() => {
      if (nextStep === 1) {
        addMessage(
          'bot',
          `Excellent choice! Which Melbourne suburb is the property located in? (e.g., Richmond, South Yarra, Melbourne CBD, Docklands)`,
          ['Melbourne CBD', 'Richmond', 'South Yarra', 'St Kilda', 'Brunswick', 'Hawthorn'],
          'suburb'
        );
      } else if (nextStep === 2) {
        addMessage(
          'bot',
          `Got it, ${lastAnswer}! How many rooms, seats, or areas need treatment?`,
          ['1-2 Rooms / Areas', '3 Rooms (Most Popular)', '4-5 Rooms', 'Large Whole House (6+)'],
          'rooms'
        );
      } else if (nextStep === 3) {
        addMessage(
          'bot',
          `What type of property is it?`,
          ['House', 'Apartment / Unit', 'Townhouse', 'Office / Commercial'],
          'propertyType'
        );
      } else if (nextStep === 4) {
        addMessage(
          'bot',
          `Almost done! What is your full name so our technicians know who to address?`
        );
      } else if (nextStep === 5) {
        addMessage(
          'bot',
          `Great to meet you, ${lastAnswer}! What is the best phone number for our Melbourne dispatch team to send your confirmation quote?`
        );
      } else if (nextStep === 6) {
        addMessage(
          'bot',
          `And your email address for the detailed written quote and booking receipt?`
        );
      } else if (nextStep === 7) {
        addMessage(
          'bot',
          `Lastly, do you have a preferred date or timeframe?`,
          ['This Week (Priority)', 'Within 2-3 Days', 'This Weekend', 'Flexible / Next Week'],
          'date'
        );
      } else {
        setIsCompleted(true);
        trackConversion('quote_form_submit', `AI Chat Lead: ${currentLead.name} (${currentLead.suburb})`, 149);
        addMessage(
          'bot',
          `🎉 Thank you ${currentLead.name}! Your steam cleaning quote request has been securely registered with Steamora Melbourne dispatch. A technician is reviewing your ${currentLead.service} details for ${currentLead.suburb} and will call/SMS ${currentLead.phone} within 15 minutes with your exact fixed price.`
        );
      }
    }, 450);
  };

  const handleReset = () => {
    setStep(0);
    setIsCompleted(false);
    setLeadData({
      service: '',
      suburb: '',
      rooms: '',
      propertyType: '',
      name: '',
      phone: '',
      email: '',
      date: ''
    });
    setMessages([
      {
        id: 'm1',
        sender: 'bot',
        text: "Hi 👋 Welcome to Steamora! I'm Steamora Assistant, your Melbourne steam cleaning concierge. I can give you an instant estimate and check booking availability in under 60 seconds.",
        options: ['Carpet Steam Cleaning', 'Upholstery & Sofa', 'Mattress Sanitisation', 'Tile & Grout', 'Commercial Clean'],
        fieldToSet: 'service'
      }
    ]);
  };

  return (
    <aside aria-label="Interactive AI cleaning concierge" className="fixed bottom-24 sm:bottom-8 left-4 sm:left-6 z-40 flex flex-col items-start">
      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[380px] h-[480px] sm:h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">Steamora Assistant</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Melbourne Smart Concierge</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart chat"
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none shadow-md shadow-teal-600/20'
                      : 'bg-white text-slate-800 rounded-bl-none shadow-sm border border-slate-200/80'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                </div>

                {/* Interactive Clickable Options */}
                {m.options && !isCompleted && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt, m.fieldToSet)}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-teal-50 text-slate-800 hover:text-teal-700 text-[11px] font-semibold border border-slate-200/90 hover:border-teal-300 shadow-sm transition-colors text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isCompleted && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Lead Details Confirmed</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Need urgent same-day booking? Call direct:
                  </p>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    onClick={() => trackConversion('phone_call_click', 'Assistant Call Click')}
                    className="inline-flex items-center gap-1 font-bold text-emerald-800 underline mt-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          {!isCompleted ? (
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendInput()}
                placeholder={
                  step === 4
                    ? 'Enter your full name...'
                    : step === 5
                    ? 'Enter your phone number...'
                    : step === 6
                    ? 'Enter your email...'
                    : 'Type your reply...'
                }
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
              <button
                onClick={handleSendInput}
                disabled={!inputVal.trim()}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-3 bg-white border-t border-slate-200 flex justify-center">
              <button
                onClick={handleReset}
                className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start New Calculation
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) trackConversion('modal_open', 'Steamora Assistant Opened');
        }}
        className="group flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white px-4 py-3 rounded-full shadow-2xl shadow-slate-900/40 hover:shadow-slate-900/60 transition-all duration-300 transform hover:-translate-y-0.5 border border-slate-700"
        aria-label="Open Steamora Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-teal-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 rounded-full" />
        </div>
        <span className="text-sm font-bold tracking-tight hidden sm:inline">
          Steamora AI Concierge
        </span>
      </button>
    </aside>
  );
}
