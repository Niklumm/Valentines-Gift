import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import PolaroidCarousel from './components/PolaroidCarousel';
import VoucherCard from './components/VoucherCard';
import { Voucher } from './types';

// BILD-IMPORTS: Vite verarbeitet diese Bilder nun als Assets
// Stelle sicher, dass die Dateien exakt so im Hauptordner liegen
import imgCouple1 from './couple1.jpg';
import imgCouple2 from './couple2.jpg';
import imgCouple3 from './couple3.jpg';
import imgCouple4 from './couple4.jpg';
import imgSpa1 from './spa1.jpg';
import imgSpa2 from './spa2.jpg';

const COUPLE_IMAGES = [
  imgCouple1,
  imgCouple2,
  imgCouple3,
  imgCouple4
];

const VOUCHERS: Voucher[] = [
  {
    id: 'wed',
    day: 'Mittwoch',
    image: imgSpa1,
    price: '3 Küsse 🥰🥰',
    kissesCount: 3
  },
  {
    id: 'thu',
    day: 'Donnerstag',
    image: imgSpa2,
    price: '5 Küsse 🥰🥰🥰',
    kissesCount: 5
  }
];

const App: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    
    // Romantic confetti effect
    const scalar = 2;
    const heart = confetti.shapeFromPath({ path: 'M0 10 C0 6, 3 2, 6 2 C9 2, 12 6, 12 10 C12 14, 6 22, 0 30 C-6 22, -12 14, -12 10 C-12 6, -9 2, -6 2 C-3 2, 0 6, 0 10 Z' });

    confetti({
      shapes: [heart],
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f8d7da', '#d63384', '#ffffff'],
      scalar
    });
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    Swal.fire({
      title: 'Perfekt! ❤️',
      text: `${voucher.day} ist gebucht. Vergiss meine ${voucher.kissesCount} Küsse nicht!`,
      icon: 'success',
      confirmButtonColor: '#d63384',
      background: '#fffafb',
      color: '#4a4a4a',
      confirmButtonText: 'Ich freue mich!',
      iconColor: '#d63384',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto bg-[#fffafb]">
      <div className="w-full max-w-[500px] flex flex-col items-center space-y-8">
        
        {/* Initial View: Polaroid Carousel & Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <PolaroidCarousel images={COUPLE_IMAGES} />
          
          <div className="mt-14 space-y-4 px-4">
            <h1 className="font-romantic text-4xl sm:text-5xl text-[#d63384] font-bold">
              Hey Lieblingsmensch
            </h1>
            <p className="text-[#4a4a4a] leading-relaxed text-sm sm:text-base font-light">
              Heute geht es nur um uns. Danke, dass du an meiner Seite bist und jeden Tag zu etwas Besonderem machst. Ich liebe es, mit dir einfach mal die Welt zu vergessen und "einen gechillten" zu machen. Aber weil du auch mal wieder so richtig abschalten sollst, habe ich eine kleine Überraschung für nächste Woche geplant...
            </p>
          </div>
        </motion.div>

        {/* Action Button Section */}
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="reveal-button"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-4"
            >
              <button
                onClick={handleReveal}
                className="group relative flex items-center space-x-3 bg-[#f8d7da] hover:bg-[#f3c2c7] text-[#d63384] px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse active:scale-95"
              >
                <span>Geschenk öffnen</span>
                <Heart className="w-5 h-5 fill-current transition-transform group-hover:scale-125" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="voucher-section"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full px-2"
            >
              <div className="border-2 border-dashed border-[#d63384] rounded-2xl p-6 sm:p-8 bg-pink-50/30 w-full">
                <div className="text-center mb-6">
                  <h2 className="text-[#4a4a4a] text-lg sm:text-xl font-semibold">
                    Gutschein für einen Tag Therme & Sauna
                  </h2>
                  <p className="text-[#d63384]/70 text-xs mt-1 uppercase tracking-widest">
                    Wähle deinen Wunschtermin
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {VOUCHERS.map((v) => (
                    <VoucherCard 
                      key={v.id} 
                      voucher={v} 
                      onSelect={handleSelectVoucher} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-12 text-[#4a4a4a]/40 text-xs uppercase tracking-widest font-light">
          Für immer & Ewig ❤️
        </footer>
      </div>
    </div>
  );
};

export default App;
