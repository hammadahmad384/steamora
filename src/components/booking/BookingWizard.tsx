import React, { useState } from 'react';
import { trackConversion, COMPANY_INFO } from '../../data/config';
import { SERVICES } from '../../data/servicesData';
import { MELBOURNE_SUBURBS } from '../../data/suburbsData';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Phone,
  Building,
  Car,
  Check
} from 'lucide-react';

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState('carpet-cleaning');
  const [roomsCount, setRoomsCount] = useState(3);
  const [sofaSeats, setSofaSeats] = useState(3);
  const [mattressCount, setMattressCount] = useState(1);
  const [tileAreaSqm, setTileAreaSqm] = useState(30);

  const [extras, setExtras] = useState({
    petOdourTreatment: false,
    scotchgardShield: true,
    deepSanitization: true,
    antiAllergen: false
  });

  const [propertyType, setPropertyType] = useState<'house' | 'apartment' | 'office' | 'commercial'>('house');
  const [suburb, setSuburb] = useState('Richmond');
  const [isCustomSuburb, setIsCustomSuburb] = useState(false);
  const [customSuburb, setCustomSuburb] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [parking, setParking] = useState<'driveway' | 'street' | 'visitor' | 'none'>('driveway');
  const [hasLift, setHasLift] = useState(true);

  // Date and Time
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];
  const [preferredDate, setPreferredDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'midday' | 'afternoon'>('morning');

  // Contact
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pricing calculation
  const calculateTotal = () => {
    let subtotal = 0;
    if (serviceId === 'carpet-cleaning') {
      subtotal = roomsCount * 30; // Min pricing for display
    } else if (serviceId === 'couch-cleaning') {
      subtotal = sofaSeats * 25;
    } else if (serviceId === 'mattress-cleaning') {
      subtotal = mattressCount * 80;
    } else if (serviceId === 'blind-cleaning') {
      subtotal = roomsCount * 25; // using roomsCount for blind count
    } else if (serviceId === 'rug-cleaning') {
      subtotal = roomsCount * 80; // using roomsCount for rug count
    } else {
      subtotal = 100;
    }

    return subtotal;
  };

  const totalPrice = calculateTotal();

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 2) {
      if (isCustomSuburb || suburb === 'Other') {
        if (!customSuburb.trim()) errs.customSuburb = 'Please enter your suburb or location';
      } else if (!suburb) {
        errs.suburb = 'Please select a suburb';
      }
      if (!streetAddress.trim()) errs.streetAddress = 'Please enter your street address';
    }
    if (s === 3) {
      if (!preferredDate) errs.preferredDate = 'Please select your preferred date';
    }
    if (s === 4) {
      if (!fullName.trim()) errs.fullName = 'Full name is required';
      if (!phone.trim() || phone.length < 8) errs.phone = 'Valid Australian phone number is required';
      if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    if (step === 2 && (isCustomSuburb || suburb === 'Other') && customSuburb.trim()) {
      setSuburb(customSuburb.trim());
    }
    setStep(prev => Math.min(4, prev + 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    trackConversion(
      'booking_submit',
      `Booking Confirmed: ${fullName} - ${serviceId} (${suburb}) on ${preferredDate}`,
      totalPrice
    );

    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-teal-500/20 max-w-3xl mx-auto text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 ring-12 ring-emerald-50/50">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
          Booking Request Confirmed
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-2">
          You’re Booked, {fullName}!
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
          Your booking has been assigned to our Melbourne mobile team for <span className="font-bold text-slate-900">{preferredDate}</span> during the <span className="font-bold text-slate-900 capitalize">{timeSlot}</span> arrival window.
        </p>

        {/* Confirmed Details Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-left max-w-xl mx-auto mb-8 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs text-slate-600 uppercase font-semibold">Service</span>
              <p className="font-bold text-slate-900 capitalize text-sm">{serviceId.replace(/-/g, ' ')}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-600 uppercase font-semibold">Estimated Total</span>
              <p className="text-xl font-extrabold text-teal-600">${totalPrice} AUD</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <span className="text-slate-600">Location:</span>
              <p className="font-semibold text-slate-800">{streetAddress}, {suburb} VIC</p>
            </div>
            <div>
              <span className="text-slate-600">Arrival Window:</span>
              <p className="font-semibold text-slate-800">
                {timeSlot === 'morning' ? '8:00 AM – 11:00 AM' : timeSlot === 'midday' ? '11:00 AM – 2:00 PM' : '2:00 PM – 5:00 PM'}
              </p>
            </div>
            <div>
              <span className="text-slate-600">Phone:</span>
              <p className="font-semibold text-slate-800">{phone}</p>
            </div>
            <div>
              <span className="text-slate-600">Email Receipt:</span>
              <p className="font-semibold text-slate-800 truncate">{email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${COMPANY_INFO.phoneTel}`}
            onClick={() => trackConversion('phone_call_click', 'Booking Confirmation Call')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/15"
          >
            <Phone className="w-4 h-4 text-teal-400" />
            <span>Call Dispatch ({COMPANY_INFO.phone})</span>
          </a>
          <button
            onClick={() => {
              setIsConfirmed(false);
              setStep(1);
            }}
            className="w-full sm:w-auto px-6 py-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-4xl mx-auto overflow-hidden">
      {/* Progress Bar & Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-500/30">
              <Sparkles className="w-3 h-3" />
              <span>Direct Online Scheduler</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Book Your Steamora Clean
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Select your requirements in 4 quick steps. No payment required upfront.
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700 shrink-0">
            <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
              Live Total
            </span>
            <div className="text-2xl font-extrabold text-white">
              ${totalPrice} <span className="text-xs font-normal text-slate-400">AUD</span>
            </div>
          </div>
        </div>

        {/* 4 Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2 border-t border-slate-800">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Location' },
            { num: 3, label: 'Date & Time' },
            { num: 4, label: 'Confirm' }
          ].map(s => (
            <div key={s.num} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s.num
                      ? 'bg-teal-400 text-slate-900'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-xs font-bold hidden sm:inline ${step >= s.num ? 'text-white' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= s.num ? 'bg-teal-400' : 'bg-slate-800'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Step Content */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Step 1: Choose Your Primary Service
              </h3>
              <p className="text-slate-600 text-sm">
                Select the main cleaning service required for your Melbourne space.
              </p>
            </div>

            {/* Service Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SERVICES.map(srv => (
                <button
                  type="button"
                  key={srv.id}
                  onClick={() => setServiceId(srv.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    serviceId === srv.id
                      ? 'border-teal-500 bg-teal-50/50 shadow-md ring-2 ring-teal-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded">
                        {srv.startingPrice}
                      </span>
                      {srv.badge && (
                        <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {srv.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{srv.shortTitle}</h4>
                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">{srv.tagline}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Select this service</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      serviceId === srv.id ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                    }`}>
                      {serviceId === srv.id && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Dynamic Items Counter based on selected service */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <h4 className="font-bold text-slate-900 text-sm mb-3">
                Specify Quantity / Area
              </h4>

              {serviceId === 'carpet-cleaning' && (
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <span className="font-bold text-sm text-slate-800">Carpeted Rooms & Hallways</span>
                    <p className="text-xs text-slate-600">Bedrooms, living rooms, and rumpus areas</p>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-slate-900 text-sm">{roomsCount}</span>
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.min(10, roomsCount + 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {serviceId === 'couch-cleaning' && (
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <span className="font-bold text-sm text-slate-800">Sofa Seats / Lounge Size</span>
                    <p className="text-xs text-slate-600">e.g. 3-seater lounge or modular</p>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setSofaSeats(Math.max(2, sofaSeats - 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-slate-900 text-sm">{sofaSeats} Seats</span>
                    <button
                      type="button"
                      onClick={() => setSofaSeats(Math.min(8, sofaSeats + 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {serviceId === 'mattress-cleaning' && (
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <span className="font-bold text-sm text-slate-800">Number of Mattresses</span>
                    <p className="text-xs text-slate-600">Queen, King, Double, or Single</p>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMattressCount(Math.max(1, mattressCount - 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-slate-900 text-sm">{mattressCount}</span>
                    <button
                      type="button"
                      onClick={() => setMattressCount(Math.min(6, mattressCount + 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {serviceId === 'blind-cleaning' && (
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <span className="font-bold text-sm text-slate-800">Number of Blinds</span>
                    <p className="text-xs text-slate-600">Standard size blinds</p>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-slate-900 text-sm">{roomsCount}</span>
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.min(20, roomsCount + 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {serviceId === 'rug-cleaning' && (
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <span className="font-bold text-sm text-slate-800">Number of Rugs</span>
                    <p className="text-xs text-slate-600">Standard area rugs</p>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-slate-900 text-sm">{roomsCount}</span>
                    <button
                      type="button"
                      onClick={() => setRoomsCount(Math.min(10, roomsCount + 1))}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY & LOCATION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Step 2: Property & Location Details
              </h3>
              <p className="text-slate-600 text-sm">
                Help us plan access and portable equipment setup.
              </p>
            </div>

            {/* Property Type Radio Cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Architecture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'house', label: 'House / Terrace' },
                  { id: 'apartment', label: 'Apartment / Unit' },
                  { id: 'office', label: 'Office Space' },
                  { id: 'commercial', label: 'Retail / Venue' }
                ].map(prop => (
                  <button
                    type="button"
                    key={prop.id}
                    onClick={() => setPropertyType(prop.id as any)}
                    className={`p-3.5 rounded-xl border text-center font-semibold text-xs transition-colors ${
                      propertyType === prop.id
                        ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {prop.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Suburb & Street */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Melbourne Suburb *
                </label>
                <select
                  value={isCustomSuburb ? 'Other' : suburb}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Other') {
                      setIsCustomSuburb(true);
                      setSuburb('Other');
                    } else {
                      setIsCustomSuburb(false);
                      setSuburb(val);
                      if (errors.customSuburb) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.customSuburb;
                          return next;
                        });
                      }
                    }
                  }}
                  className="w-full text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white font-medium"
                >
                  {MELBOURNE_SUBURBS.map(sub => (
                    <option key={sub.slug} value={sub.name}>
                      {sub.name} (VIC {sub.postcode})
                    </option>
                  ))}
                  <option value="Other">Other Suburb / Not Listed (Type manually)</option>
                </select>
                {errors.suburb && <p className="text-red-500 text-xs mt-1">{errors.suburb}</p>}

                {isCustomSuburb && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={customSuburb}
                      onChange={(e) => {
                        setCustomSuburb(e.target.value);
                        if (errors.customSuburb) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.customSuburb;
                            return next;
                          });
                        }
                      }}
                      placeholder="Type your suburb or location..."
                      className={`w-full text-xs sm:text-sm py-2.5 px-3 rounded-lg border ${
                        errors.customSuburb ? 'border-red-500 bg-red-50/20' : 'border-teal-400 bg-teal-50/20'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900`}
                      autoFocus
                    />
                    {errors.customSuburb && (
                      <p className="text-red-500 text-xs mt-1">{errors.customSuburb}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. 42 Bridge Road or Unit 12B"
                  className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                    errors.streetAddress ? 'border-red-500' : 'border-slate-300'
                  } focus:ring-2 focus:ring-teal-500 bg-white`}
                />
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
              </div>
            </div>

            {/* Parking & Access */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Van Parking Facility
                </label>
                <select
                  value={parking}
                  onChange={(e) => setParking(e.target.value as any)}
                  className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="driveway">Private Driveway Available</option>
                  <option value="street">Street Parking Available</option>
                  <option value="visitor">Visitor Bay in Building</option>
                  <option value="none">Permit / Metered Only</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="inline-flex items-center gap-2.5 cursor-pointer mt-4 text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={hasLift}
                    onChange={(e) => setHasLift(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span>Lift / Elevator Access (for apartments/offices)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Step 3: Select Preferred Date & Arrival Window
              </h3>
              <p className="text-slate-600 text-sm">
                Choose a convenient date. We operate 7 days across Melbourne.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className={`w-full text-base py-3 px-4 rounded-xl border ${
                    errors.preferredDate ? 'border-red-500' : 'border-slate-300'
                  } focus:ring-2 focus:ring-teal-500 bg-white text-slate-900 font-semibold`}
                />
                {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                <p className="text-xs text-slate-600 mt-2">
                  Need priority same-day service? You can also call us or WhatsApp directly on {COMPANY_INFO.phone}.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Arrival Time Window
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'morning', label: 'Morning Slot', time: '8:00 AM – 11:00 AM', tag: 'Fastest Drying' },
                    { id: 'midday', label: 'Midday Slot', time: '11:00 AM – 2:00 PM', tag: 'Popular' },
                    { id: 'afternoon', label: 'Afternoon Slot', time: '2:00 PM – 5:00 PM', tag: 'Flexible' }
                  ].map(slot => (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => setTimeSlot(slot.id as any)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        timeSlot === slot.id
                          ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{slot.label}</span>
                        <span className="text-xs text-slate-600">{slot.time}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {slot.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT & FINAL CONFIRMATION */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Step 4: Contact Information & Confirmation
              </h3>
              <p className="text-slate-600 text-sm">
                Where should we send your booking confirmation and technician SMS tracker?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Liam Hemsworth"
                  className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300'
                  } focus:ring-2 focus:ring-teal-500 bg-white`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0488 123 456"
                  className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  } focus:ring-2 focus:ring-teal-500 bg-white`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. liam@example.com"
                  className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  } focus:ring-2 focus:ring-teal-500 bg-white`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Special Instructions (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={2}
                placeholder="e.g. Key is in lockbox code 1234, or please ring buzzer upon arrival"
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
              />
            </div>

            {/* Booking Summary Box */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs space-y-2">
              <div className="font-bold text-slate-900 text-sm pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>Summary of Services</span>
                <span className="text-teal-600 font-extrabold text-base">${totalPrice} AUD</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Selected Service:</span>
                <span className="font-semibold text-slate-800 capitalize">{serviceId.replace(/-/g, ' ')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Location:</span>
                <span className="font-semibold text-slate-800">{streetAddress ? `${streetAddress}, ` : ''}{suburb} VIC</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Scheduled Date & Window:</span>
                <span className="font-semibold text-slate-800">{preferredDate} ({timeSlot})</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-slate-900/10"
            >
              <span>Continue to {step === 1 ? 'Location' : step === 2 ? 'Date & Time' : 'Confirmation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-teal-600/25 tracking-wide uppercase"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>CONFIRM STEAMORA BOOKING</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
