import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import Tilt from "react-parallax-tilt";
import Typewriter from "typewriter-effect";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCube, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import "swiper/css/navigation";
import "./App.css";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const FRIEND_NAME = "Patan Arshad";
const AGE = 24;

const PHOTOS = [
  {
    src: "/images/P1.jpeg",
    caption: "I still remember the exact moment this was taken — the way you smiled, like you owned the entire world and somehow made me feel like I did too. That's a rare gift, Arshad. You've always made every ordinary second feel like it was worth saving forever. 🌙",
    memory: "The moment that rewired my heart",
    theme: "rose",
    shape: "hexagon",
  },
  {
    src: "/images/P2.jpeg",
    caption: "That laugh. God, that laugh. It doesn't just fill a room — it fills every quiet corner of my soul I never knew was empty. You laugh like nothing bad could ever survive near you, and honestly? I believe it. You're the warmest person I have ever known. ✨",
    memory: "The sound I replay on my hardest days",
    theme: "violet",
    shape: "diamond",
  },
  {
    src: "/images/P3.jpeg",
    caption: "Every place we've been, every road we've walked — none of it would've meant anything without you beside me. You have this magic where adventures become more vivid when you're in them. I would cross every city on earth just to stand next to you again. 🌍",
    memory: "Miles walked, a lifetime felt",
    theme: "teal",
    shape: "arch",
  },
  {
    src: "/images/P4.jpeg",
    caption: "You see people. Not their best version or their worst — just *them*. You looked at me on my worst days and made me feel like I was still worth everything. No one has ever made me feel as seen as you have. That is the greatest love I know. 💛",
    memory: "The eyes that see right through me",
    theme: "gold",
    shape: "circle",
  },
  {
    src: "/images/P5.jpeg",
    caption: "This is the version of you I keep tucked in my heart — completely unguarded, completely you. No performance, no pretense. Just the real Arshad, and that person? That person is my favourite person on this entire earth. Don't ever hide him. 🎉",
    memory: "You — no filter, no walls",
    theme: "coral",
    shape: "wave",
  },
  {
    src: "/images/P6.jpeg",
    caption: "Some people walk into your life and rearrange the furniture of your soul. You didn't just walk in — you built a home there and decided to stay. Every memory we have feels like a page from the book I'd read over and over until the end of time. 📖",
    memory: "The chapter I never want to end",
    theme: "sky",
    shape: "hexagon",
  },
  {
    src: "/images/P7.jpeg",
    caption: "You've held me together on days when I was completely falling apart, and you never once made me feel weak for it. You are the safest place I have ever been. Knowing you exist in my world makes everything — absolutely everything — easier to carry. 🤍",
    memory: "My safest, softest place",
    theme: "rose",
    shape: "diamond",
  },

];

const REASONS = [
  { icon: "🌻", text: "You remember every tiny thing I ever told you — things I forgot I even said — and somehow that makes me feel the most loved I've ever felt by another human being." },
  { icon: "🎵", text: "The way you love music is the way I love you — with your whole chest, no holding back, no embarrassment. Pure. Loud. Beautiful. It mirrors your entire soul." },
  { icon: "🌙", text: "You check on people at 2am when you know they're struggling. Not because anyone asks you to — because your heart simply won't let you rest until the people you love are okay." },
  { icon: "⚡", text: "You turn the most boring Tuesday into something I'll remember for years. That's not luck. That's a gift only you have — the art of making ordinary life feel extraordinary." },
  { icon: "🤝", text: "You never let anyone fight their battles alone. You suit up, you show up, and you stay — even when it's inconvenient, even when it costs you something. That kind of loyalty is rare." },
  { icon: "💬", text: "Your honesty doesn't hurt — it heals. You tell the truth in a way that feels like a hug. I have never met anyone who could do that the way you do." },
];

const MEMES = [
  { emoji: "🎂", text: "Me realizing Arshad is actually 24 now", sub: "no way he was just 20 yesterday" },
  { emoji: "😭", text: "Us trying to find a good pic of him", sub: "every single one is perfect lol" },
  { emoji: "💅", text: "Arshad walking into 24 like", sub: "that's the glow-up era era" },
];

// ─── ANIME DANCER SVG ──────────────────────────────────────────────────────
function AnimeDancer({ color = "#ff6b9d", x = 0 }) {
  return (
    <motion.g
      transform={`translate(${x}, 0)`}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* head */}
      <circle cx="0" cy="-60" r="14" fill={color} opacity="0.9" />
      {/* hair */}
      <ellipse cx="0" cy="-72" rx="16" ry="8" fill="#1a0533" />
      {/* eyes */}
      <circle cx="-5" cy="-62" r="2.5" fill="white" />
      <circle cx="5" cy="-62" r="2.5" fill="white" />
      <circle cx="-4" cy="-61" r="1.5" fill="#1a0533" />
      <circle cx="6" cy="-61" r="1.5" fill="#1a0533" />
      {/* blush */}
      <ellipse cx="-8" cy="-58" rx="4" ry="2" fill="#ffaacc" opacity="0.6" />
      <ellipse cx="8" cy="-58" rx="4" ry="2" fill="#ffaacc" opacity="0.6" />
      {/* body */}
      <rect x="-10" y="-44" width="20" height="28" rx="6" fill={color} opacity="0.85" />
      {/* arms - dancing */}
      <motion.line
        x1="-10" y1="-38" x2="-26" y2="-54"
        stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ rotate: [0, 20, 0] }}
        style={{ originX: "-10px", originY: "-38px" }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      <motion.line
        x1="10" y1="-38" x2="26" y2="-54"
        stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ rotate: [0, -20, 0] }}
        style={{ originX: "10px", originY: "-38px" }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      {/* legs */}
      <motion.line
        x1="-5" y1="-16" x2="-12" y2="10"
        stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ rotate: [0, 15, 0] }}
        style={{ originX: "-5px", originY: "-16px" }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <motion.line
        x1="5" y1="-16" x2="12" y2="10"
        stroke={color} strokeWidth="5" strokeLinecap="round"
        animate={{ rotate: [0, -15, 0] }}
        style={{ originX: "5px", originY: "-16px" }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
      {/* sparkles */}
      {[[-28, -68], [28, -68], [0, -90]].map(([sx, sy], i) => (
        <motion.text
          key={i}
          x={sx} y={sy}
          fontSize="12"
          textAnchor="middle"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
        >✨</motion.text>
      ))}
    </motion.g>
  );
}

// ─── STAR BURST ───────────────────────────────────────────────────────────
function StarBurst() {
  return (
    <svg className="starburst-svg" viewBox="0 0 200 200">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.line
          key={i}
          x1="100" y1="100"
          x2={100 + 70 * Math.cos((i * Math.PI) / 4)}
          y2={100 + 70 * Math.sin((i * Math.PI) / 4)}
          stroke="#ffd700"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      <motion.circle cx="100" cy="100" r="20" fill="#ffd700" opacity="0.9"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="100" y="107" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#07040f">24</text>
    </svg>
  );
}

// ─── ANIMATED HEART TRAIL ─────────────────────────────────────────────────
function HeartTrail() {
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    id: i, left: `${10 + i * 9}%`,
    delay: i * 0.3,
    size: 12 + Math.random() * 16,
    color: ["#ff6b9d", "#a78bfa", "#ffd700", "#34d399", "#fb923c"][i % 5],
  }));
  return (
    <div className="heart-trail">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="floating-heart"
          style={{ left: h.left, fontSize: h.size, color: h.color }}
          animate={{ y: [0, -80, -160], opacity: [0, 1, 0], rotate: [0, 15, -15] }}
          transition={{ duration: 3, repeat: Infinity, delay: h.delay, ease: "easeOut" }}
        >♥</motion.span>
      ))}
    </div>
  );
}

// ─── UNIQUE PHOTO CARD ─────────────────────────────────────────────────────
function PhotoCard({ photo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`photo-card theme-${photo.theme} shape-${photo.shape}`}
      initial={{ opacity: 0, y: 80, rotate: index % 2 === 0 ? -4 : 4 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.12} glareColor="#ffffff" glareBorderRadius="20px" tiltReverse>
        <div className={`card-inner ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
          <div className="card-front">
            <div className="photo-frame">
              <img src={photo.src} alt={`Memory ${index + 1}`} />
              <div className="photo-shimmer" />
              <div className="photo-number">#{String(index + 1).padStart(2, "0")}</div>
            </div>
            <div className="card-bottom">
              <p className="photo-memory-tag">✦ {photo.memory}</p>
              <span className="flip-hint">tap to read 💌</span>
            </div>
          </div>
          <div className="card-back">
            <div className="card-back-inner">
              <span className="quote-mark">"</span>
              <p className="photo-caption">{photo.caption}</p>
              <div className="card-back-footer">
                <span>— written with love, for you 💛</span>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

// ─── MEME CARD ────────────────────────────────────────────────────────────
function MemeCard({ meme, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="meme-card"
      initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.04, rotate: 2 }}
    >
      <div className="meme-emoji">{meme.emoji}</div>
      <p className="meme-text">{meme.text}</p>
      <p className="meme-sub">{meme.sub}</p>
    </motion.div>
  );
}

// ─── REASON CARD ──────────────────────────────────────────────────────────
function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="reason-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.span
        className="reason-icon"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      >{reason.icon}</motion.span>
      <p>{reason.text}</p>
    </motion.div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
    setParticlesInit(true);
  }, []);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 4000;
    const colors = ["#ff6b9d", "#ffd700", "#a78bfa", "#34d399", "#fb923c", "#fff"];
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors, shapes: ["circle", "square", "star"] });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors, shapes: ["circle", "square", "star"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    // heart burst from center
    confetti({ particleCount: 80, spread: 100, origin: { x: 0.5, y: 0.6 }, colors: ["#ff6b9d", "#fff"], shapes: ["circle"] });
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    setTimeout(fireConfetti, 600);
  };

  return (
    <div className="app">
      {/* Particles BG */}
      {particlesInit === false && (
        <Particles
          id="tsparticles"
          init={initParticles}
          options={{
            particles: {
              number: { value: 40 },
              color: { value: ["#ff6b9d", "#ffd700", "#a78bfa", "#34d399"] },
              shape: { type: ["circle", "star"] },
              opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 1 } },
              size: { value: { min: 2, max: 6 } },
              move: { enable: true, speed: 1.2, direction: "top", outModes: "out" },
            },
            background: { color: "transparent" },
          }}
          className="particles-layer"
        />
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <motion.div className="hero-bg-anim" style={{ opacity: heroOpacity }}>
          <svg className="hero-svg-dancers" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet">
            <AnimeDancer color="#ff6b9d" x={120} />
            <AnimeDancer color="#a78bfa" x={450} />
            <AnimeDancer color="#34d399" x={780} />
          </svg>
        </motion.div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="cover" className="cover-screen" exit={{ scale: 1.3, opacity: 0, filter: "blur(20px)" }} transition={{ duration: 0.9 }}>
              <motion.div
                className="cover-icon-wrap"
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="cover-big-emoji">🎂</span>
                <StarBurst />
              </motion.div>

              <motion.h1 className="cover-title"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Someone very special is turning {AGE}… 🎉
              </motion.h1>

              <motion.p className="cover-sub"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                And the universe prepared something just for them 🌙
              </motion.p>

              <motion.button
                className="reveal-btn"
                onClick={handleReveal}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(255,107,157,0.7)" }}
                whileTap={{ scale: 0.93 }}
              >
                Open Your Gift 🎁
              </motion.button>

              <HeartTrail />
            </motion.div>
          ) : (
            <motion.div key="hero" className="hero-content"
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

              <motion.div className="age-badge"
                initial={{ rotate: -15, scale: 0 }} animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}>
                <span>✦ twenty four ✦</span>
              </motion.div>

              <motion.h1 className="hero-name"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {FRIEND_NAME}
              </motion.h1>

              <motion.p className="hero-typewriter"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <Typewriter
                  options={{ delay: 45, cursor: "♡" }}
                  onInit={(tw) => tw
                    .typeString("My favourite person in the entire world.")
                    .pauseFor(1200)
                    .deleteAll()
                    .typeString("The one who makes everything make sense.")
                    .pauseFor(1200)
                    .deleteAll()
                    .typeString("Happy 24th birthday, love. 🥂")
                    .start()}
                />
              </motion.p>

              <motion.div className="floating-icons"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {["💛", "🌙", "✨", "💛", "🌙"].map((icon, i) => (
                  <motion.span key={i}
                    animate={{ y: [0, -10, 0], rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}>
                    {icon}
                  </motion.span>
                ))}
              </motion.div>

              <HeartTrail />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* REST OF PAGE */}
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>

            {/* ── 24 MEME SECTION ── */}
            <section className="section meme-section">
              <motion.div className="section-header"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="section-title">
                  <span className="title-accent">😭</span> Turning 24 — a whole documentary
                </h2>
                <p className="section-sub">The internet couldn't stay silent about this one 🎤</p>
              </motion.div>
              <div className="meme-grid">
                {MEMES.map((m, i) => <MemeCard key={i} meme={m} index={i} />)}
              </div>
            </section>

            {/* ── CAROUSEL ── */}
            <section className="section slider-section">
              <motion.div className="section-header"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="section-title">
                  <span className="title-accent">🎞️</span> Our Most Precious Frames
                </h2>
                <p className="section-sub">Every slide is a piece of us 🌙</p>
              </motion.div>

              <div className="swiper-wrap">
                <Swiper
                  modules={[Autoplay, Pagination, EffectCube, Navigation]}
                  effect="cube"
                  grabCursor
                  centeredSlides
                  cubeEffect={{ shadow: false, slideShadows: false }}
                  autoplay={{ delay: 2800, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation
                  className="birthday-swiper"
                >
                  {PHOTOS.map((photo, i) => (
                    <SwiperSlide key={i} className="swiper-slide-custom">
                      <img src={photo.src} alt={`Slide ${i + 1}`} />
                      <div className="slide-overlay">
                        <p>{photo.memory}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* ── PHOTO GRID ── */}
            <section className="section photos-section">
              <motion.div className="section-header"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="section-title">
                  <span className="title-accent">💌</span> Letters I Never Sent (Until Now)
                </h2>
                <p className="section-sub">Tap each card to read what my heart has been holding 🤍</p>
              </motion.div>

              <div className="photos-grid">
                {PHOTOS.map((photo, i) => <PhotoCard key={i} photo={photo} index={i} />)}
              </div>
            </section>

            {/* ── ANIME DANCERS DIVIDER ── */}
            <div className="dancer-divider">
              <svg viewBox="0 0 900 130" className="dancer-svg-strip">
                <AnimeDancer color="#ff6b9d" x={100} />
                <AnimeDancer color="#ffd700" x={300} />
                <AnimeDancer color="#a78bfa" x={500} />
                <AnimeDancer color="#34d399" x={700} />
                <AnimeDancer color="#fb923c" x={860} />
              </svg>
              <p className="dancer-label">the whole squad celebrating for you 🎊</p>
            </div>

            {/* ── REASONS ── */}
            <section className="section reasons-section">
              <motion.div className="section-header"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="section-title">
                  <span className="title-accent">🌟</span> Why You're Irreplaceable
                </h2>
                <p className="section-sub">A list I could write forever and never finish 💛</p>
              </motion.div>
              <div className="reasons-grid">
                {REASONS.map((r, i) => <ReasonCard key={i} reason={r} index={i} />)}
              </div>
            </section>

            {/* ── FINALE ── */}
            <section className="section finale-section">
              <motion.div
                className="finale-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div className="finale-glow"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}>
                  💛
                </motion.div>

                <h2 className="finale-title">Here's to you, Arshad.</h2>

                <p className="finale-body">
                  Twenty-four years ago, the world got a little louder, a little warmer, and a whole lot more beautiful —
                  and I don't think it's recovered since. You are the kind of person people write songs about, paint on walls,
                  and whisper about in prayers. You are my favourite story, my safest place, the answer to every question
                  I didn't know I was asking. May this year give you everything your generous heart deserves.
                  May you be loved the way you love others — completely, without conditions, without limits.
                  I'm the luckiest person alive just because I know you. 🥂
                </p>

                <div className="finale-age-stamp">
                  <motion.div className="age-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    ✦ born for greatness ✦ turning 24 ✦ shining forever ✦
                  </motion.div>
                  <span className="age-center">24</span>
                </div>

                <motion.button
                  className="celebrate-btn"
                  onClick={fireConfetti}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(255,215,0,0.6)" }}
                  whileTap={{ scale: 0.93 }}
                >
                  🎊 Make it Rain Confetti Again!
                </motion.button>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}