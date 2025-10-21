import React from 'react';

const Logo: React.FC<{ showText?: boolean; className?: string }> = ({ showText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      {/* Icon: responsive sizes (small screens show slightly smaller icon) */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 w-12 h-12 sm:w-14 sm:h-14"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="100" cy="100" r="100" fill="url(#bgGradient)" />

        {/* Book icon*/}
        <path
          d="M58 62h34v76H58c-3 0-6-3-6-6V68c0-3 3-6 6-6z"
          fill="#F59E0B"
          stroke="#fff"
          strokeWidth="2"
        />
        <path
          d="M108 62h34c3 0 6 3 6 6v64c0 3-3 6-6 6h-34V62z"
          fill="#FCD34D"
          stroke="#fff"
          strokeWidth="2"
        />

        <line x1="100" y1="62" x2="100" y2="138" stroke="#ffffff" strokeWidth="2" />

        <circle cx="100" cy="160" r="5" fill="#FCD34D" stroke="#fff" strokeWidth="1.2" />
      </svg>

      {showText && (
        // Hide text on very small screens to keep the header compact
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-lg sm:text-2xl font-bold text-[#0B3D91]">Learn</span>
          <span className="text-lg sm:text-2xl font-bold text-[#FF7A00]">Gujarati</span>
        </div>
      )}
    </div>
  );
};

export default Logo;