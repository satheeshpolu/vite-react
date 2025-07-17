import React from "react";

const ShoppingCartAnimation = () => (
  <svg
    width="300"
    height="200"
    viewBox="0 0 300 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cart body */}
    <rect
      x="80"
      y="100"
      width="140"
      height="70"
      fill="#4FD1C5"
      rx="10"
      ry="10"
    />
    {/* Cart handle */}
    <line
      x1="80"
      y1="100"
      x2="50"
      y2="50"
      stroke="#4FD1C5"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Wheels */}
    <circle cx="100" cy="180" r="15" fill="#2C7A7B" />
    <circle cx="200" cy="180" r="15" fill="#2C7A7B" />

    {/* Shirt (Left Side) */}
    <g className="drop-left" transform="translate(50,0)">
      <rect x="0" y="0" width="20" height="20" fill="#FF6B6B" rx="3" />
      <path
        d="M4 0 L8 8 L12 0 L16 8 L12 20 L8 20 L4 8 Z"
        fill="#FFE66D"
        stroke="#D94F4F"
        strokeWidth="1"
      />
    </g>

    {/* Bottle (Right Side) */}
    <g className="drop-right" transform="translate(250,0)">
      <rect x="7" y="0" width="6" height="20" fill="#4ECDC4" rx="2" />
      <rect x="5" y="15" width="10" height="5" fill="#1A535C" rx="1" />
      <circle cx="10" cy="8" r="3" fill="#1A535C" />
    </g>

    {/* Shoe (Top) */}
    <g className="drop-top" transform="translate(150,0)">
      <ellipse cx="10" cy="10" rx="10" ry="6" fill="#556270" />
      <rect x="0" y="5" width="20" height="6" fill="#C7F464" rx="2" />
      <path
        d="M5 5 L15 5 L10 0 Z"
        fill="#C7F464"
        stroke="#3E4A50"
        strokeWidth="1"
      />
    </g>

    <style>{`
      /* Animations for the falling items */
      @keyframes dropLeft {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        80% { transform: translate(40px, 90px) scale(1.2); opacity: 1; }
        100% { transform: translate(80px, 100px) scale(0); opacity: 0; }
      }
      @keyframes dropRight {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        80% { transform: translate(-40px, 90px) scale(1.2); opacity: 1; }
        100% { transform: translate(-80px, 100px) scale(0); opacity: 0; }
      }
      @keyframes dropTop {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        80% { transform: translate(0, 90px) scale(1.2); opacity: 1; }
        100% { transform: translate(0, 100px) scale(0); opacity: 0; }
      }

      .drop-left {
        animation: dropLeft 3s ease-in-out infinite;
        transform-origin: center;
      }
      .drop-right {
        animation: dropRight 3s ease-in-out infinite;
        animation-delay: 1s;
        transform-origin: center;
      }
      .drop-top {
        animation: dropTop 3s ease-in-out infinite;
        animation-delay: 2s;
        transform-origin: center;
      }
    `}</style>
  </svg>
);

export default ShoppingCartAnimation;
