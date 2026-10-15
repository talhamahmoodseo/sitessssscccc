/**
 * Hand-drawn rocket for the homepage hero. An original drawing in the site's
 * line-art style: a stick-figure rider, chain links on the hull (it's a link
 * building agency), exhaust curls and a grainy trail.
 *
 * Drawn already tilted, nose up and to the right. The hull runs along the axis
 * from (70,250) to (230,90); every point below is measured from that axis.
 *
 * It holds still, flame included: the movement in the hero comes from the
 * smoke (SmokePlume), which starts at the `data-nozzle` marker below.
 */

const Drawing = () => (
  <svg
    viewBox="0 0 270 310"
    className="h-full w-full overflow-visible"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      {/* wobble the lines a touch and break them up like pencil on paper */}
      <filter id="rk-pencil" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.035"
          numOctaves="2"
          seed="7"
          result="wob"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="wob"
          scale="2.6"
          xChannelSelector="R"
          yChannelSelector="G"
          result="drawn"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.1"
          numOctaves="1"
          seed="3"
          result="grain"
        />
        <feColorMatrix
          in="grain"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.35"
          result="speckle"
        />
        <feComposite in="drawn" in2="speckle" operator="in" />
      </filter>
    </defs>

    {/* flame, under everything */}
    <path
      d="M58 248 Q 34 276 16 302 Q 48 292 76 264 Z"
      fill="rgb(var(--mark))"
      fillOpacity="0.9"
    />

    <g
      filter="url(#rk-pencil)"
      stroke="rgb(var(--ink))"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* hull, filled with paper so the trail doesn't show through */}
      <path
        d="M57.3 220.3 L169 108.6 C 186.7 90.9, 224.1 78.9, 239.7 80.3 C 241.1 95.9, 229.1 133.3, 211.4 151 L99.7 262.7 Z"
        fill="rgb(var(--paper))"
        strokeWidth="2.3"
      />
      {/* second, lighter pass for the sketched feel */}
      <path
        d="M59 222 L170 111 C 187 94, 222 82, 237 83"
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* shading: short hatches along the underside */}
      {[40, 58, 76, 94, 112, 130, 148, 166].map((t) => {
        const x = 70 + 0.707 * t;
        const y = 250 - 0.707 * t;
        return (
          <path
            key={t}
            d={`M${(x + 10).toFixed(1)} ${(y + 10).toFixed(1)} L${(x + 22).toFixed(1)} ${(y + 18).toFixed(1)}`}
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
        );
      })}

      {/* bands */}
      <path d="M126.6 151 L169 193.4" strokeWidth="1.8" />
      <path
        d="M136.5 141.1 L178.9 183.5"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />

      {/* porthole */}
      <circle
        cx="176"
        cy="144"
        r="15"
        fill="rgb(var(--paper))"
        strokeWidth="2.2"
      />
      <circle
        cx="176"
        cy="144"
        r="9.5"
        fill="rgb(var(--mark))"
        fillOpacity="0.55"
        strokeWidth="1.4"
      />
      <path
        d="M171 139 Q 174 137 178 138"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />

      {/* chain links on the hull */}
      <g transform="translate(112 208) rotate(-45)">
        <rect
          x="-24"
          y="-7.5"
          width="26"
          height="15"
          rx="7.5"
          strokeWidth="2"
        />
        <rect x="-4" y="-7.5" width="26" height="15" rx="7.5" strokeWidth="2" />
      </g>

      {/* fins */}
      <path
        d="M91.2 186.4 Q 50 178 24 197 L 62.9 214.7"
        fill="rgb(var(--paper))"
        strokeWidth="2.2"
      />
      <path
        d="M133.6 228.8 Q 142 270 123 296 L 105.3 257.1"
        fill="rgb(var(--paper))"
        strokeWidth="2.2"
      />
      <path d="M40 199 L 62 206" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M127 279 L 120 258" strokeWidth="1" strokeOpacity="0.5" />

      {/* nozzle */}
      <path
        d="M63 226 L54.5 240.1 L79.9 265.5 L94 257"
        fill="rgb(var(--paper))"
        strokeWidth="2.1"
      />

      {/* exhaust curls */}
      <path
        d="M50 262 C 34 280, 14 276, 20 262 C 26 250, 42 262, 30 282"
        strokeWidth="1.6"
        strokeOpacity="0.8"
      />
      <path
        d="M70 272 C 62 294, 42 302, 36 290 C 32 280, 50 278, 46 298"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />

      {/* the rider: sitting on the hull, arms up */}
      <path d="M133.6 144 L 124 114" strokeWidth="2.3" />
      <circle
        cx="119"
        cy="100"
        r="10"
        fill="rgb(var(--paper))"
        strokeWidth="2.2"
      />
      <path
        d="M115 99 Q 116 97 117 99 M121 98 Q 122 96 123 98"
        strokeWidth="1.2"
      />
      <path d="M115 104 Q 119 107 123 103" strokeWidth="1.3" />
      <path d="M125 118 L 140 98 L 149 80" strokeWidth="2.2" />
      <path d="M146 76 L 149 80 L 153 77" strokeWidth="1.6" />
      <path d="M125 118 L 106 104 L 98 86" strokeWidth="2.2" />
      <path d="M133.6 144 L 151 150 L 158 166" strokeWidth="2.2" />
      <path d="M154 167 L 163 168" strokeWidth="2" />
    </g>

    {/* a tiny pennant in the rider's hand, in the highlighter colour */}
    <path
      d="M149 80 L 152 58"
      stroke="rgb(var(--ink))"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M152 58 L 172 64 L 151 70 Z"
      fill="rgb(var(--mark))"
      stroke="rgb(var(--ink))"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const Rocket = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none ${className}`} aria-hidden="true">
    <div className="relative h-full w-full">
      <Drawing />
      {/* where the smoke leaves the nozzle, read by SmokePlume */}
      <span
        data-nozzle
        className="absolute left-[24.6%] top-[81.4%] h-px w-px"
      />
    </div>
  </div>
);

export default Rocket;
