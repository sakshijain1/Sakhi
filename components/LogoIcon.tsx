import React from 'react';

// A new logo inspired by the user-provided image of two figures embracing.
// This clean vector version captures the essence of support, safety, and friendship
// to align with the "Sakhi" brand.
export const LogoIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="Sakhi logo of two figures embracing"
      role="img"
      className="w-full h-full text-primary"
    >
      <path
        fillRule="evenodd"
        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z"
        clipRule="evenodd"
      />
      <path
        d="M11.5 15.5C10.121 15.5 9 14.379 9 13C9 11.621 10.121 10.5 11.5 10.5C12.879 10.5 14 11.621 14 13C14 13.743 13.682 14.411 13.166 14.905C12.889 15.26 12.443 15.5 12 15.5H11.5Z"
      />
      <path
        d="M12.5 9.5C13.879 9.5 15 8.379 15 7C15 5.621 13.879 4.5 12.5 4.5C11.121 4.5 10 5.621 10 7C10 7.743 10.318 8.411 10.834 8.905C11.111 9.26 11.557 9.5 12 9.5H12.5Z"
        transform="rotate(30 12.5 7)"
      />
      <path 
        d="M9.834 14.905C10.318 14.411 10 13.743 10 13C10 11.621 11.121 10.5 12.5 10.5H12C11.557 10.5 11.111 10.74 10.834 11.095C10.318 11.589 10 12.257 10 13C10.318 13.411 10.834 14.095 9.834 14.905Z"
        opacity="0"
      />
    </svg>
);
