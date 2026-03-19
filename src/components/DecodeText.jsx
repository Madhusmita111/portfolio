import React, { useState, useEffect, useRef } from 'react';

const CHARS = "01010101XYZABC∑∫∆∝∞µ";

export default function DecodeText({ text, speed = 40 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const iterationsRef = useRef(0);

  const handleMouseEnter = () => {
    if (isDecoding) return;
    setIsDecoding(true);
    iterationsRef.current = 0;
  };

  useEffect(() => {
    if (!isDecoding) return;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev.split("").map((letter, index) => {
          if (index < iterationsRef.current || text[index] === " ") {
            return text[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iterationsRef.current >= text.length) {
        clearInterval(interval);
        setIsDecoding(false);
      }
      iterationsRef.current += 1 / 3; 
    }, speed);

    return () => clearInterval(interval);
  }, [text, isDecoding, speed]);

  return <span onMouseEnter={handleMouseEnter} className="cursor-default">{displayText}</span>;
}
