import React from 'react';

export const SmallBackground = () => (
    <div style={{ position: 'absolute', maxHeight: '100%', maxWidth: '100%', left: 0, right: 0 }}>
        <svg version="1.1" width={`100%`} height={`100%`} viewBox="0 0 1440 993.12" >
            <defs>
                <linearGradient id="linearGradient1990" x1="582.47" x2="1433.5" y1="-76.286" y2="1401.9" gradientTransform="matrix(1 0 0 .99022 0 -.44505)" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0e3b43" offset="0" />
                    <stop stop-color="#0e3b43" stop-opacity=".5" offset="1" />
                </linearGradient>
            </defs>
            <path d="m0 409.58 48 90.876c48 92.583 144 271.77 240 250.44 96-21.332 192-251.72 288-204.79 96 46.931 192 362.65 288 432.19 96 66.984 192-112.21 288-159.14 96-46.931 192 46.931 240 90.876l48 45.651v-955.69h-48-240-288-288-288-240-48z" fill="url(#linearGradient1990)" stroke-width="2.0655" />
        </svg>
    </div>
);