import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Volume2, VolumeX, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const PremiumWomensDay = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showSparkles, setShowSparkles] = useState(true);

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'],
      shapes: ['circle', 'square'],
      scalar: 1.2
    });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          setIsPlaying(false);
        });
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Generate floating sparkles
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4
  }));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white font-sans overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-60"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
      >
        <source src="/audio_d3kCIXw7.mp3" type="audio/mpeg" />
        <source src="/audio_d3kCIXw7.ogg" type="audio/ogg" />
      </audio>

      {/* Premium Music Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6 z-30"
      >
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20 shadow-2xl">
          <motion.button
            onClick={toggleMusic}
            className="text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer slider accent-yellow-400"
          />
        </div>
      </motion.div>

      {/* Enhanced Floating Flowers */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          { emoji: '🌹', size: 'text-7xl', opacity: 'opacity-25', top: '8%', left: '8%', duration: 8, delay: 0 },
          { emoji: '🌻', size: 'text-6xl', opacity: 'opacity-20', top: '15%', right: '12%', duration: 7, delay: 1 },
          { emoji: '🥀', size: 'text-5xl', opacity: 'opacity-30', top: '65%', left: '3%', duration: 9, delay: 2 },
          { emoji: '🌷', size: 'text-6xl', opacity: 'opacity-25', top: '75%', right: '8%', duration: 10, delay: 0.5 },
          { emoji: '🪻', size: 'text-5xl', opacity: 'opacity-20', top: '35%', left: '85%', duration: 8, delay: 1.5 },
          { emoji: '🌹', size: 'text-6xl', opacity: 'opacity-28', top: '25%', left: '45%', duration: 9, delay: 3 },
          { emoji: '🌼', size: 'text-5xl', opacity: 'opacity-25', top: '85%', left: '65%', duration: 8, delay: 2.5 },
          { emoji: '🌸', size: 'text-5xl', opacity: 'opacity-18', top: '12%', left: '75%', duration: 7, delay: 0.8 },
          { emoji: '🌺', size: 'text-4xl', opacity: 'opacity-22', top: '50%', right: '25%', duration: 11, delay: 4 },
          { emoji: '🌿', size: 'text-3xl', opacity: 'opacity-15', top: '90%', left: '20%', duration: 6, delay: 1.2 }
        ].map((flower, index) => (
          <motion.div
            key={index}
            className={`absolute ${flower.size} ${flower.opacity} filter drop-shadow-lg`}
            style={{ top: flower.top, left: flower.left, right: flower.right }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: flower.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: flower.delay
            }}
          >
            {flower.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen w-full flex flex-col items-center justify-center px-6">
        {/* Background with Poster */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/womens_day_poster.jpg')" }}
        />

        {/* Premium Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-800/40 to-rose-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Glassmorphism Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center max-w-6xl mx-auto px-8 py-16"
        >
          {/* Animated Heart Icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <Heart className="w-20 h-20 mx-auto text-pink-300 drop-shadow-2xl filter" />
          </motion.div>

          {/* Premium Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-8xl md:text-[12rem] font-black bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent leading-none tracking-tighter mb-4 drop-shadow-2xl">
              Happy
            </h1>
            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-pink-300 via-white to-pink-300 bg-clip-text text-transparent leading-none tracking-tighter drop-shadow-2xl">
              Women's Day
            </h1>
          </motion.div>

          {/* Elegant Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-16"
          >
            <p className="text-2xl md:text-4xl max-w-4xl mx-auto font-light leading-relaxed tracking-wide text-white/90 italic px-6 py-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
              "Your <span className="text-yellow-300 font-semibold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">strength</span> is not just in what you do, but in who you are.
              <br className="hidden md:block" />
              Keep shining like the extraordinary woman you are."
            </p>
          </motion.div>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-8"
          >
            <motion.button
              onClick={fireConfetti}
              className="group relative bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-pink-800 px-16 py-6 rounded-full font-bold text-2xl shadow-2xl hover:shadow-yellow-400/50 transition-all duration-500 flex items-center gap-4 mx-auto overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(250, 204, 21, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />

              {/* Sparkle Animation */}
              <AnimatePresence>
                {showSparkles && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-200" />
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="relative z-10 font-extrabold tracking-wide">You Are Amazing</span>
              <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* Date with Elegant Styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-yellow-200/80 font-light tracking-widest bg-white/5 backdrop-blur-sm rounded-full px-8 py-3 border border-white/10 inline-block">
              March 8, 2026
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumWomensDay;
