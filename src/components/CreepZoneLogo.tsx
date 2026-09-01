import React from 'react';

interface CreepZoneLogoProps {
  className?: string;
}

export const CreepZoneLogo: React.FC<CreepZoneLogoProps> = ({ className = 'w-full max-w-[480px]' }) => {
  return (
    <svg
      viewBox="0 0 540 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none drop-shadow-[0_15px_35px_rgba(20,46,162,0.35)] transition-all`}
    >
      <defs>
        {/* Soft 3D drop shadow for letters */}
        <filter id="letterShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="4" stdDeviation="0" floodColor="#0a134a" floodOpacity="0.95" />
        </filter>
        <filter id="stickerGlow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0c1a63" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#stickerGlow)">
        {/* 1. OUTER WHITE STICKER BORDER (Silueta exterior blanca continua) */}
        <path
          d="M 135 70
             C 70 70, 20 120, 20 185
             C 20 235, 55 275, 110 295
             C 170 318, 230 320, 245 320
             L 245 320
             C 255 320, 260 310, 265 305
             C 275 300, 375 290, 485 275
             C 505 272, 520 255, 518 235
             L 512 140
             C 510 120, 492 105, 472 108
             L 330 128
             C 325 129, 320 125, 320 120
             L 320 90
             C 320 70, 305 55, 285 55
             L 230 58
             C 210 60, 195 75, 195 95
             L 195 110
             C 195 118, 185 120, 180 115
             C 168 88, 150 70, 135 70 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="24"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 2. ROYAL BLUE BADGE & PIN BASE (Cuerpo azul profundo del sticker) */}
        <path
          d="M 140 85
             C 80 85, 36 130, 36 190
             C 36 235, 68 270, 118 288
             C 175 308, 228 310, 240 310
             C 248 310, 252 302, 258 296
             C 270 290, 370 280, 475 265
             C 490 263, 502 250, 500 235
             L 495 145
             C 493 130, 478 118, 462 120
             L 322 140
             C 314 141, 308 136, 308 128
             L 308 95
             C 308 80, 295 68, 280 68
             L 235 70
             C 220 72, 208 84, 208 100
             L 208 118
             C 208 128, 198 132, 190 125
             C 175 100, 160 85, 140 85 Z"
          fill="#142EA2"
          stroke="#142EA2"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* 3. RED LOCATION PIN (Pin rojo icónico del lado izquierdo) */}
        <path
          d="M 140 88
             C 85 88, 42 132, 42 188
             C 42 228, 70 262, 115 280
             C 165 300, 222 304, 236 304
             L 225 180
             C 225 130, 188 88, 140 88 Z"
          fill="#EE1119"
        />

        {/* 4. PIN TARGET / EYE (Anillo blanco y pupila roja) */}
        {/* Anillo exterior blanco grueso */}
        <circle cx="126" cy="182" r="50" fill="#FFFFFF" />
        {/* Círculo central rojo */}
        <circle cx="126" cy="182" r="26" fill="#EE1119" />

        {/* 5. TEXT: "the" (Estilo cómic manuscrito en la pestaña superior) */}
        <g transform="translate(225, 74)">
          {/* 't' */}
          <path
            d="M 16 10 L 16 38 C 16 43, 20 45, 25 43 M 8 20 L 26 20"
            stroke="#0a134a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 16 10 L 16 38 C 16 43, 20 45, 25 43 M 8 20 L 26 20"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'h' */}
          <path
            d="M 32 6 L 32 40 M 32 24 C 36 18, 48 18, 48 26 L 48 40"
            stroke="#0a134a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 32 6 L 32 40 M 32 24 C 36 18, 48 18, 48 26 L 48 40"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'e' */}
          <path
            d="M 56 28 C 56 18, 70 16, 70 26 C 70 30, 56 30, 56 30 C 56 38, 68 40, 72 36"
            stroke="#0a134a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 56 28 C 56 18, 70 16, 70 26 C 70 30, 56 30, 56 30 C 56 38, 68 40, 72 36"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 6. TEXT: "CREEP" (Letras cómic gruesas blancas con sombra 3D negra/azul) */}
        <g id="letters-creep">
          {/* Letter C */}
          <g filter="url(#letterShadow)">
            <path
              d="M 270 152
                 C 260 142, 240 144, 232 158
                 C 222 176, 222 205, 235 220
                 C 246 232, 266 230, 274 218
                 L 262 208
                 C 255 215, 248 215, 242 208
                 C 236 198, 238 178, 245 168
                 C 250 160, 258 160, 264 165 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter R */}
          <g filter="url(#letterShadow)">
            <path
              d="M 282 144
                 L 316 140
                 C 328 139, 336 148, 334 162
                 C 332 174, 324 182, 312 185
                 L 326 218
                 L 308 221
                 L 297 190
                 L 295 223
                 L 282 225 Z
                 M 295 156
                 L 295 178
                 L 312 176
                 C 318 175, 322 170, 322 165
                 C 322 159, 318 155, 311 155 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter E (first) */}
          <g filter="url(#letterShadow)">
            <path
              d="M 345 137
                 L 380 133
                 L 378 148
                 L 358 150
                 L 357 167
                 L 375 165
                 L 373 179
                 L 356 181
                 L 355 203
                 L 378 200
                 L 376 215
                 L 343 219 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter E (second) */}
          <g filter="url(#letterShadow)">
            <path
              d="M 392 132
                 L 427 128
                 L 425 143
                 L 405 145
                 L 404 162
                 L 422 160
                 L 420 174
                 L 403 176
                 L 402 197
                 L 425 194
                 L 423 209
                 L 390 213 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter P */}
          <g filter="url(#letterShadow)">
            <path
              d="M 438 126
                 L 472 121
                 C 485 119, 494 128, 492 143
                 C 490 157, 480 167, 467 170
                 L 451 172
                 L 446 220
                 L 433 222 Z
                 M 449 139
                 L 448 160
                 L 464 158
                 C 471 157, 477 152, 478 147
                 C 478 142, 474 137, 467 137 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>
        </g>

        {/* 7. TEXT: "ZONE" (Letras inferiores dinámicas blancas con sombra y trazos de contorno) */}
        <g id="letters-zone">
          {/* Letter Z */}
          <g filter="url(#letterShadow)">
            <path
              d="M 235 240
                 L 278 234
                 L 276 248
                 L 252 278
                 L 282 274
                 L 280 290
                 L 232 297
                 L 234 282
                 L 258 253
                 L 237 256 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter O */}
          <g filter="url(#letterShadow)">
            <path
              d="M 308 230
                 C 324 227, 340 236, 342 254
                 C 345 272, 333 288, 317 291
                 C 300 294, 285 284, 283 267
                 C 280 249, 292 232, 308 230 Z
                 M 311 245
                 C 304 246, 298 253, 299 262
                 C 300 270, 307 276, 314 275
                 C 321 274, 326 267, 325 258
                 C 324 250, 318 244, 311 245 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter N */}
          <g filter="url(#letterShadow)">
            <path
              d="M 353 224
                 L 367 222
                 L 389 265
                 L 390 219
                 L 403 217
                 L 401 278
                 L 387 280
                 L 365 238
                 L 364 284
                 L 351 286 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>

          {/* Letter E */}
          <g filter="url(#letterShadow)">
            <path
              d="M 416 215
                 L 452 209
                 L 450 224
                 L 430 227
                 L 428 243
                 L 446 240
                 L 444 254
                 L 426 257
                 L 424 275
                 L 448 271
                 L 446 286
                 L 412 292 Z"
              fill="#FFFFFF"
              stroke="#0a134a"
              strokeWidth="2.5"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
