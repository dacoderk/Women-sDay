import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const PremiumWomensDay = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF1493']
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
          console.log('Music started playing');
        }).catch((error) => {
          console.log('Play failed:', error);
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

  // Auto-play music when component mounts (with user interaction)
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        // Set volume first
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log('Music started playing');
        }).catch((error) => {
          console.log('Autoplay failed:', error);
          // Autoplay failed, user will need to click play button
        });
      }
      // Remove listeners after first interaction
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

  // Set volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white h-screen font-sans overflow-hidden relative">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onLoadedData={() => console.log('Audio file loaded')}
        onError={(e) => console.log('Audio error:', e)}
      >
        <source src="/audio_d3kCIXw7.mp3" type="audio/mpeg" />
        <source src="/audio_d3kCIXw7.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
        <button
          onClick={toggleMusic}
          className="text-white hover:text-yellow-400 transition-colors"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      {/* Floating Flowers Background */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {/* Flower 1 - Pink Rose */}
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{ top: '10%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌹
        </motion.div>

        {/* Flower 2 - Yellow Sunflower */}
        <motion.div
          className="absolute text-5xl opacity-15"
          style={{ top: '20%', right: '15%' }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🌻
        </motion.div>

        {/* Flower 3 - White Lily */}
        <motion.div
          className="absolute text-4xl opacity-25"
          style={{ top: '60%', left: '5%' }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🥀
        </motion.div>

        {/* Flower 4 - Pink Tulip */}
        <motion.div
          className="absolute text-5xl opacity-20"
          style={{ top: '70%', right: '10%' }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, -6, 6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          🌷
        </motion.div>

        {/* Flower 5 - Purple Orchid */}
        <motion.div
          className="absolute text-4xl opacity-18"
          style={{ top: '40%', left: '80%' }}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          🪻
        </motion.div>

        {/* Flower 6 - Red Rose */}
        <motion.div
          className="absolute text-5xl opacity-22"
          style={{ top: '30%', left: '50%' }}
          animate={{
            y: [0, -16, 0],
            rotate: [0, -4, 4, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          🌹
        </motion.div>

        {/* Flower 7 - Daisy */}
        <motion.div
          className="absolute text-4xl opacity-20"
          style={{ top: '80%', left: '60%' }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        >
          🌼
        </motion.div>

        {/* Flower 8 - Cherry Blossom */}
        <motion.div
          className="absolute text-4xl opacity-15"
          style={{ top: '15%', left: '70%' }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          🌸
        </motion.div>
      </div>

      {/* Main Content */}
      <div 
        className="h-screen w-full flex flex-col items-center justify-center px-6 bg-cover bg-right md:bg-center relative" 
        style={{ backgroundImage: "url('/womens_day_poster.jpg')" }}
      >
        {/* A radial gradient that makes the center text area clearer while keeping the art visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-transparent to-pink-900/60 backdrop-blur-[2px] z-0"></div>
        
        <div className="text-center z-10 flex-1 flex flex-col justify-center">
          
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Heart className="text-yellow-400 w-16 h-16 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
          
          {/* Use the exact Yellow from the flowers in the hair for your text */}
          <h1 className="text-7xl md:text-9xl font-black text-[#FFD700] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Happy <br/> Women's Day
          </h1>

          {/* The Quote: Elegant, Airy, and Personal */}
          <p className="text-2xl md:text-3xl max-w-3xl mx-auto font-light leading-relaxed font-sans tracking-wide text-yellow-100/90 italic mt-8 px-4">
            "Your <span className="text-white font-semibold">strength</span> is not just in what you do, but in who you are. <br className="hidden md:block" /> Keep shining."
          </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="text-center z-10 pb-8">
          <motion.button
            onClick={fireConfetti}
            className="bg-yellow-400 text-pink-700 px-12 py-5 rounded-full font-bold text-2xl shadow-[0_20px_50px_rgba(250,204,21,0.3)] hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            You Are Amazing
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          <p className="mt-4 text-yellow-200 text-sm">March 8, 2026</p>
        </div>
      </div>

    </div>
  );
};

export default PremiumWomensDay;
