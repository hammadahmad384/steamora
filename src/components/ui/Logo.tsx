interface LogoProps {
  variant?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({
  variant = 'dark',
  showTagline = false,
  size = 'md',
  className = ''
}: LogoProps) {
  const isDark = variant === 'dark';
  const isWhite = variant === 'white';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: Minimal Geometric Steam / Wave Emblem */}
      <div 
        className={`relative flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]} ${
          isWhite 
            ? 'bg-white/10 text-teal-300 ring-1 ring-white/20' 
            : isDark 
              ? 'bg-gradient-to-br from-slate-900 to-slate-950 text-teal-400 shadow-md shadow-slate-900/15 ring-1 ring-slate-800/60' 
              : 'bg-teal-50 text-teal-600 ring-1 ring-teal-200'
        }`}
      >
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          {/* Base water drop / droplet curvature */}
          <path 
            d="M20 6C20 6 9 19 9 26C9 32.0751 13.9249 37 20 37C26.0751 37 31 32.0751 31 26C31 19 20 6 20 6Z" 
            className="fill-teal-500/20"
          />
          {/* Ascending dual steam dynamic waves */}
          <path 
            d="M16 28C15 24 18 21 16 17C14.5 14 17 11 18 9" 
            stroke="currentColor" 
            strokeWidth="2.75" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-teal-400"
          />
          <path 
            d="M23 29C22 25 25 22 23 18C21.5 15 24 12 25 10" 
            stroke="currentColor" 
            strokeWidth="2.75" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-cyan-300"
          />
          {/* Subtle spark of cleanliness */}
          <circle cx="28" cy="11" r="1.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-wider">
          <span className={`font-black font-['Outfit'] tracking-[0.08em] ${textSizes[size]} ${
            isWhite ? 'text-white' : isDark ? 'text-slate-950' : 'text-slate-900'
          }`}>
            STEAM
          </span>
          <span className={`font-black font-['Outfit'] tracking-[0.08em] ${textSizes[size]} text-teal-500`}>
            ORA
          </span>
        </div>
        
        {showTagline && (
          <span className={`text-[9px] uppercase tracking-[0.24em] font-medium mt-0.5 ${
            isWhite ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Fresh Spaces • Elevated Living
          </span>
        )}
      </div>
    </div>
  );
}
