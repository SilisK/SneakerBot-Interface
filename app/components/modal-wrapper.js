"use client";

import { useState, useEffect } from "react";

export default function ModalWrapper({ children, isOpen, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Add a delay before completely removing the modal from DOM
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // Restore scrolling when modal is closed
        document.body.style.overflow = "auto";
      }, 300); // Match this with the transition duration
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  if (!isOpen && !isAnimating) return null;
  
  // Handle background click to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className={`m-0 fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div className="relative transition-transform duration-300 transform scale-100">
        {children}
      </div>
    </div>
  );
}