export function TurntableLamp() {
  return (
    <>
      <span className="turntable-lamp__shelf" aria-hidden="true" />
      <div className="turntable-lamp" aria-hidden="true">
        <span className="turntable-lamp__cord" />
        <span className="turntable-lamp__socket" />
        <span className="turntable-lamp__glass">
          <svg viewBox="0 0 24 26" fill="none" aria-hidden="true">
            <path
              d="M8 1v13l2 4 2-5 2 5 2-4V1"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </>
  );
}

export function TurntableTonearm() {
  return (
    <svg className="turntable-arm" viewBox="0 0 460 380" aria-hidden="true">
      <defs>
        <linearGradient id="tonearm-metal" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#6f7066" />
          <stop offset="0.42" stopColor="#d8d0b4" />
          <stop offset="1" stopColor="#8e8a77" />
        </linearGradient>
        <radialGradient id="tonearm-pivot" cx="37%" cy="30%">
          <stop stopColor="#898779" />
          <stop offset="1" stopColor="#333730" />
        </radialGradient>
      </defs>
      <circle cx="385" cy="80" r="26" fill="#131912" stroke="#53594a" />
      <circle
        cx="385"
        cy="80"
        r="18"
        fill="url(#tonearm-pivot)"
        stroke="#999481"
      />
      <path
        d="M396 151v90"
        stroke="#11160f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M392 207h8"
        stroke="#77796b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g className="turntable-arm__moving">
        <path
          d="M385 80c-3 38-5 68-16 89-9 17-27 31-47 44"
          fill="none"
          stroke="#10140e"
          strokeWidth="10"
          strokeLinecap="round"
          transform="translate(2 3)"
        />
        <path
          d="M385 80c-3 38-5 68-16 89-9 17-27 31-47 44"
          fill="none"
          stroke="url(#tonearm-metal)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle
          cx="385"
          cy="80"
          r="7"
          fill="#d1c9ac"
          stroke="#666558"
          strokeWidth="2"
        />
        <path d="M325 207l6 8-19 15-7-9z" fill="#32382e" stroke="#aaa28a" />
        <path
          d="m310 225-6 5"
          stroke="#d4c29b"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
