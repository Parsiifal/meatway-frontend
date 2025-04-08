export const LogoIcon = ({ size = 52, fill = "currentColor", ...props }) => {
  const height = size / 1.35;
  return (
    <svg
      width={size}
      height={height}
      fill={fill}
      viewBox="0 0 624 462"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...props} >

      <g transform="translate(0.000000,462.000000) scale(0.100000,-0.100000)">
        <path d="M1000 4614 c-223 -32 -367 -83 -530 -189 -205 -132 -358 -326 -441 -555 -21 -59 -23 -86 -27 -281 l-4 -217 32 -93 c146 -425 445 -679 908 -773 l114 -23 -93 -37 c-52 -21 -134 -57 -184 -80 l-90 -42 89 -47 c49 -26 148 -92 222 -147 143 -108 204 -143 274 -159 25 -6 124 -11 221 -11 l177 0 55 -60 c62 -67 99 -150 136 -305 33 -138 69 -244 103 -304 17 -30 78 -112 135 -183 155 -194 205 -292 205 -404 0 -50 -8 -82 -46 -174 l-46 -113 20 -43 c27 -62 61 -90 169 -141 53 -24 153 -86 227 -138 83 -60 141 -95 157 -95 14 0 48 16 77 35 148 100 372 100 520 0 29 -19 62 -35 75 -35 12 0 60 27 106 61 142 103 211 145 290 178 88 36 144 86 161 143 10 34 8 46 -32 145 -87 215 -57 316 176 601 123 151 162 231 214 437 45 178 87 278 147 345 l41 45 208 5 c208 5 209 5 274 36 36 17 112 67 170 111 144 109 222 160 287 190 l56 26 -90 42 c-50 24 -127 58 -172 76 -79 32 -100 49 -62 49 40 0 256 62 346 99 321 132 559 406 644 742 29 113 29 345 2 469 -95 422 -492 755 -967 810 -55 6 -113 10 -130 8 -31 -3 -31 -4 97 -142 201 -218 280 -347 314 -515 33 -160 2 -277 -96 -365 -112 -101 -394 -175 -724 -191 -149 -7 -188 -1 -300 49 -162 72 -367 111 -635 122 -185 8 -227 2 -457 -66 -92 -28 -186 -50 -209 -50 -24 0 -107 20 -186 45 -288 92 -447 97 -838 31 -112 -19 -151 -31 -230 -69 -137 -65 -163 -70 -320 -62 -327 16 -574 74 -715 167 -151 100 -180 313 -75 544 53 118 133 223 308 405 45 47 82 89 82 93 0 6 -94 6 -140 0z m-121 -91 c-14 -16 -59 -65 -102 -110 -132 -141 -199 -245 -243 -373 -29 -86 -26 -243 8 -337 33 -92 105 -201 171 -256 145 -121 282 -158 659 -177 299 -14 318 -18 376 -84 33 -38 62 -118 62 -171 0 -103 -68 -202 -153 -223 -135 -34 -400 -24 -616 24 -192 43 -443 142 -592 234 -27 16 -49 26 -49 22 1 -14 106 -133 160 -178 113 -97 307 -207 473 -269 26 -10 46 -20 44 -21 -8 -8 -178 27 -256 51 -293 93 -515 271 -633 510 -75 149 -103 273 -102 445 1 274 89 482 276 655 64 59 185 143 268 185 44 23 246 98 264 99 6 1 -1 -11 -15 -26z m4613 -24 c215 -85 419 -239 522 -394 160 -240 184 -595 61 -887 -131 -310 -448 -542 -828 -603 -50 -8 -92 -13 -94 -12 -1 2 37 19 85 37 211 82 382 190 502 316 63 67 104 121 83 113 -4 -2 -48 -26 -97 -53 -182 -101 -423 -185 -636 -222 -128 -22 -403 -25 -495 -5 -132 29 -196 164 -150 317 15 50 64 109 113 134 13 6 83 16 155 21 73 4 202 13 287 19 277 18 432 73 551 197 100 104 146 196 169 338 31 194 -50 374 -275 612 -58 61 -105 114 -105 117 0 6 88 -20 152 -45z m-2872 -1145 c31 -18 112 -74 180 -124 136 -100 234 -161 293 -181 36 -13 42 -12 100 19 34 18 139 87 232 153 142 101 227 155 279 178 5 2 -32 -45 -82 -105 -50 -59 -90 -110 -88 -111 2 -2 32 12 67 31 100 53 243 106 348 128 117 24 259 20 319 -9 35 -17 37 -21 36 -64 0 -36 -9 -60 -41 -112 -55 -88 -63 -120 -63 -263 0 -109 -2 -125 -26 -172 -34 -68 -143 -184 -273 -290 -248 -201 -352 -312 -471 -499 -31 -49 -59 -83 -69 -83 -29 0 -80 38 -105 79 -48 76 -65 149 -81 353 -21 268 -39 338 -70 266 -24 -58 -33 -114 -44 -268 -13 -174 -25 -238 -58 -307 -23 -51 -103 -133 -128 -133 -6 0 -35 37 -62 83 -112 183 -198 277 -438 477 -164 137 -284 260 -316 327 -20 42 -24 68 -29 198 l-5 151 -42 69 c-23 39 -47 84 -53 102 -23 64 25 99 154 109 141 12 309 -27 509 -121 112 -51 112 -51 8 77 -74 91 -72 95 19 42z m-848 -776 c20 -15 49 -44 66 -65 l30 -38 -52 3 c-69 5 -138 -23 -263 -102 -128 -83 -186 -100 -312 -93 -90 4 -271 42 -271 56 0 3 28 17 63 30 34 13 123 56 197 97 214 116 302 145 426 141 70 -2 85 -5 116 -29z m2942 17 c53 -13 552 -253 543 -261 -1 -2 -50 -15 -107 -30 -88 -22 -121 -25 -205 -22 -112 5 -121 8 -285 108 -111 68 -181 93 -245 88 -25 -2 -45 -1 -45 2 0 8 91 94 120 114 32 21 140 21 224 1z m-2594 -475 c86 -200 210 -310 418 -368 l72 -20 0 91 c0 51 -5 110 -11 131 -16 56 -114 149 -222 211 -171 97 -152 97 49 -1 211 -103 276 -181 295 -358 18 -163 -9 -340 -69 -449 -14 -27 -47 -69 -72 -95 -25 -26 -78 -87 -118 -135 -49 -61 -72 -82 -72 -68 0 31 49 160 86 228 19 34 34 63 34 65 0 2 -49 -5 -108 -16 -59 -10 -120 -16 -135 -12 -35 8 -150 117 -197 186 -20 30 -55 89 -76 130 -38 74 -39 76 -39 185 1 97 5 127 42 260 23 83 44 168 48 190 l7 40 22 -70 c13 -38 33 -95 46 -125z m2125 -61 c24 -82 38 -154 42 -215 6 -87 4 -94 -28 -170 -43 -99 -97 -180 -173 -262 -94 -100 -125 -108 -271 -72 -44 11 -83 20 -86 20 -4 0 17 -48 47 -107 29 -60 60 -133 69 -163 l15 -55 -74 81 c-141 153 -177 199 -219 283 l-42 84 -3 184 c-4 164 -2 191 17 252 18 60 28 76 76 118 30 27 89 69 132 95 77 45 223 112 230 105 2 -2 -31 -21 -72 -42 -79 -41 -81 -49 -13 -60 21 -4 40 -11 44 -16 10 -17 -26 -106 -61 -147 -55 -63 -175 -110 -175 -67 0 8 27 54 60 102 56 83 58 89 39 97 -15 7 -29 3 -62 -20 -83 -59 -117 -139 -117 -280 0 -77 -1 -77 132 -34 149 48 247 129 325 268 28 50 94 216 104 262 1 3 7 -22 14 -56 8 -34 30 -117 50 -185z m-2455 162 c0 -16 -112 -112 -160 -136 -71 -36 -163 -49 -252 -36 -71 11 -233 59 -225 67 2 2 41 -1 87 -7 166 -23 284 -2 455 81 87 42 95 44 95 31z m2795 -51 c204 -83 308 -93 463 -42 101 33 108 21 14 -21 -100 -45 -175 -60 -286 -55 -122 5 -195 33 -268 106 -46 45 -61 70 -35 59 6 -3 57 -24 112 -47z m-2214 -66 c73 -48 129 -106 160 -166 10 -21 19 -40 19 -43 0 -13 -78 -3 -116 16 -47 22 -86 67 -114 132 -21 49 -35 107 -25 107 4 0 38 -21 76 -46z m882 -1028 c32 -7 61 -16 64 -20 4 -3 -87 -6 -202 -6 -115 0 -205 3 -202 6 30 30 243 43 340 20z m-467 -96 c198 -61 427 -65 627 -9 129 36 154 36 234 -4 l70 -36 6 -58 c4 -32 20 -105 37 -163 17 -58 34 -139 37 -182 5 -67 3 -80 -16 -106 -31 -45 -86 -62 -195 -62 -71 0 -95 3 -99 14 -9 22 2 26 62 26 65 0 120 24 139 60 16 31 8 103 -17 162 l-18 43 29 59 c16 32 27 60 24 63 -10 11 -105 -30 -229 -99 -180 -99 -236 -120 -333 -126 -124 -7 -165 8 -454 166 -41 23 -92 48 -114 57 -37 16 -38 16 -31 -2 24 -59 26 -100 9 -191 -20 -105 -15 -133 29 -166 19 -14 47 -21 92 -24 56 -4 65 -7 65 -23 0 -17 -8 -19 -87 -19 -102 0 -153 19 -197 71 -25 30 -28 38 -22 84 3 27 22 113 41 189 19 76 35 158 35 182 0 39 4 45 31 60 54 27 153 63 165 59 7 -2 43 -13 80 -25z m555 -705 c24 -9 55 -25 69 -36 20 -17 21 -19 5 -14 -11 4 -147 11 -302 15 -156 3 -286 9 -289 12 -3 4 21 12 53 18 32 7 63 14 68 15 6 2 87 4 181 4 129 1 181 -3 215 -14z"/>
        <path d="M452 4128 c-139 -183 -162 -425 -59 -623 47 -91 165 -204 257 -248 134 -64 305 -92 480 -80 117 8 105 13 -105 52 -88 16 -186 39 -217 51 -173 65 -307 222 -358 417 -35 137 -19 322 38 442 28 56 12 51 -36 -11z"/>
        <path d="M1485 3157 c96 -51 184 -107 252 -163 l32 -26 -22 69 c-40 123 -123 173 -288 173 l-74 0 100 -53z"/>
        <path d="M5772 4073 c38 -126 47 -249 24 -348 -50 -213 -210 -398 -391 -454 -34 -11 -126 -31 -206 -46 -79 -14 -148 -30 -153 -36 -21 -20 251 -15 355 7 217 44 364 153 449 329 99 206 78 409 -61 593 -22 28 -41 52 -43 52 -2 0 9 -44 26 -97z"/>
        <path d="M4641 3193 c-76 -23 -124 -72 -146 -148 -10 -33 -20 -67 -23 -75 -3 -8 22 10 56 40 73 64 168 124 267 168 l70 31 -85 0 c-47 0 -109 -8 -139 -16z"/>
        <path d="M2065 1943 c21 -205 130 -425 238 -477 53 -26 228 -56 258 -44 16 6 58 153 47 163 -3 3 -43 15 -89 26 -143 34 -221 95 -367 286 -46 62 -87 113 -89 113 -3 0 -2 -30 2 -67z"/>
        <path d="M4080 1893 c-140 -191 -211 -245 -374 -285 -70 -16 -86 -24 -82 -37 3 -9 13 -46 22 -83 l16 -68 42 0 c66 0 166 19 218 42 118 50 222 251 246 471 4 42 6 77 3 77 -3 0 -44 -53 -91 -117z"/>
      </g>
    </svg>
  );
};