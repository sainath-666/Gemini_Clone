
import React from 'react';

export const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" />
  </svg>
);

export const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const GeminiIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#8E44AD', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#3498DB', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M20 7.5C18.3562 7.5 16.7812 8.13259 15.6062 9.30625L9.30625 15.6062C8.13259 16.7812 7.5 18.3562 7.5 20C7.5 21.6438 8.13259 23.2188 9.30625 24.3938L11.8812 26.9688C11.95 27.0375 12.0188 27.0938 12.1 27.1625C13.8312 28.8562 16.1812 29.9812 18.75 30.4938V32.5H21.25V30.4938C26.0375 29.5688 30 25.1562 30 20C30 14.8438 25.1562 10 20 10C19.7812 10 19.5625 10.0125 19.35 10.025L24.3938 15.0688C24.7812 15.4562 25 15.9812 25 16.5312C25 17.6562 24.1 18.5312 23.0312 18.5312C22.4812 18.5312 21.9562 18.3125 21.5688 17.925L16.5312 12.8812C16.1438 12.4938 15.925 11.9688 15.925 11.4187C15.925 10.2938 16.825 9.41875 17.8938 9.41875C18.4438 9.41875 18.9688 9.6375 19.3562 10.025L20 10.6687L20.625 10.0312C21.0125 9.64375 21.5375 9.425 22.0875 9.425C23.1562 9.425 24.0312 10.325 24.0312 11.3938C24.0312 11.9438 23.8125 12.4688 23.425 12.8562L19.35 16.9312C19.2812 17 19.2125 17.0688 19.1438 17.1375C17.9688 18.3125 17.9688 20.2188 19.1438 21.3938C20.3188 22.5688 22.225 22.5688 23.4 21.3938L27.15 17.6438C28.8562 15.9375 29.9812 13.5875 30.4938 11.25H32.5V8.75H30.4938C29.5688 8.01875 28.5125 7.4375 27.3625 7.03125L24.3938 9.30625C23.2188 8.13259 21.6438 7.5 20 7.5Z" fill="url(#gemini-gradient)"/>
    </svg>
);