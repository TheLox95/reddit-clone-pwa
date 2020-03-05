import React from 'react';

export const BigBackground = () => (
    <div style={{ position: 'absolute', overflow: 'hidden', maxHeight: document.documentElement.clientHeight, maxWidth: document.documentElement.clientWidth }}>
        <svg version="1.1" viewBox="0 0 1440 3016.2" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="linearGradient1990" x1="582.47" x2="1433.5" y1="-76.286" y2="1401.9" gradientTransform="matrix(1 0 0 3.1252 0 -1.3823)" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0e3b43" offset="0" />
                    <stop stop-color="#0e3b43" stop-opacity=".5" offset="1" />
                </linearGradient>
            </defs>
            <path d="m0 1292.7 48 286.81c48 292.19 144 857.71 240 790.39 96-67.324 180.39-557.05 276.39-408.94 96 148.12 192 629.07 288 848.54 96 211.4 203.61-76.057 299.61-224.17 96-148.12 192 148.12 240 286.81l48 144.08v-3016.2h-1440z" fill="url(#linearGradient1990)" stroke-width="3.6694" />
        </svg>

    </div >
);