
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PolaroidCarouselProps {
  images: string[];
}

const PolaroidCarousel: React.FC<PolaroidCarouselProps> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Modulo logic for infinite looping
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 5 : -5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 5 : -5,
    }),
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto flex items-center justify-center py-4">
      {/* Decorative "Edges" of other polaroids */}
      <div className="absolute left-0 w-16 h-64 bg-white/40 shadow-sm border border-pink-50 rounded-sm transform -rotate-6 -translate-x-8 blur-[1px] pointer-events-none" />
      <div className="absolute right-0 w-16 h-64 bg-white/40 shadow-sm border border-pink-50 rounded-sm transform rotate-6 translate-x-8 blur-[1px] pointer-events-none" />

      <div className="relative w-[280px] h-[360px] flex items-center justify-center overflow-visible">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotate: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
              if (swipe) {
                paginate(offset.x > 0 ? -1 : 1);
              }
            }}
            className="absolute bg-white p-3 pb-8 shadow-2xl border border-pink-50 cursor-grab active:cursor-grabbing w-full h-full"
          >
            <div className="overflow-hidden bg-gray-100 aspect-[3/4] relative w-full h-full">
              <img
                src={images[imageIndex]}
                alt={`Memory ${imageIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            {/* Polaroid captions space */}
            <div className="mt-4 flex justify-center">
               <div className="w-16 h-1 bg-pink-100 rounded-full" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Hidden on mobile touch but available for desktop) */}
      <button
        className="absolute left-2 z-10 p-2 rounded-full bg-white/80 text-[#d63384] shadow-md hover:bg-white transition-colors md:flex hidden"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute right-2 z-10 p-2 rounded-full bg-white/80 text-[#d63384] shadow-md hover:bg-white transition-colors md:flex hidden"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute -bottom-6 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === imageIndex ? 'w-4 bg-[#d63384]' : 'bg-pink-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PolaroidCarousel;
