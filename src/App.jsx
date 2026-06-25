import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import Typewriter from "typewriter-effect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards, Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "./App.css";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const LOVE_NAME = "Patan Arshad";
const FROM_NAME = "Rua";
const AGE = 24;

const PHOTOS = [
  {
    src: "/images/P1.jpeg",
    quote: "In a world full of temporary things, you are a perpetual feeling.",
    caption: "The first time I truly saw you — not just your face, but the soul behind those eyes — I understood what poets have been chasing all along. You are the poem I never knew how to write until I met you. Every single moment with you rewrote me. 🌙",
    memory: "The moment that rewrote me",
    author: "— for you, always",
    theme: "rose",
  },
  {
    src: "/images/P2.jpeg",
    quote: "Your laugh is the most beautiful sound in a universe full of music.",
    caption: "That laugh of yours — it doesn't just fill a room, it fills every hollow quiet I have ever carried. You laugh like the world owes you joy and you're here to collect. And somehow, just by being near it, I feel like the richest person alive. ✨",
    memory: "The sound I live for",
    author: "— written with my whole heart",
    theme: "violet",
  },
  {
    src: "/images/P3.jpeg",
    quote: "Every road is more vivid when you walk it beside me.",
    caption: "I would travel every road on this earth just to arrive at a moment with you in it. You have this rare magic — you make the ordinary feel sacred, the mundane feel like miracle. Every adventure with you feels like the best chapter of my life. 🌍",
    memory: "Miles walked, forever felt",
    author: "— from your Rua, with love",
    theme: "teal",
  },

  {
    src: "/images/P5.jpeg",
    quote: "Unguarded, unfiltered — this is the version I love most.",
    caption: "This is you — no performance, no armor, just the real Arshad. And that person? That person is my absolute favourite person on this entire earth. I hope you never hide him again. He is everything worth celebrating. 🎉",
    memory: "You — raw and real",
    author: "— your Rua",
    theme: "coral",
  },
  {
    src: "/images/P6.jpeg",
    quote: "Some people don't just enter your life — they become it.",
    caption: "You didn't just walk into my life. You built a home in the deepest part of me and decided to stay. Every memory we've made feels like a page I'd re-read until the ink disappears. You are the chapter I never want to end. 📖",
    memory: "The chapter without an ending",
    author: "— written just for you",
    theme: "sky",
  },
  {
    src: "/images/P7.jpeg",
    quote: "You are the safest place I have ever been.",
    caption: "On every day I was falling apart, you were there — quietly, steadily, without making me feel weak for it. You are my safe harbour in every storm. Knowing you exist in my world makes absolutely everything easier to breathe through. 🤍",
    memory: "My safest, softest place",
    author: "— always, Rua",
    theme: "rose",
  },

  {
    src: "/images/P9.jpeg",
    quote: "Your kindness is the quiet revolution that changes everything around you.",
    caption: "You don't announce your goodness — you just live it. You check on people. You remember. You show up without being asked. The world is genuinely better, softer, more possible because you move through it. I see it every single day. 🌻",
    memory: "The quiet force of you",
    author: "— from your Rua",
    theme: "teal",
  },
  {
    src: "/images/P10.jpeg",
    quote: "In every memory I treasure most, you are there.",
    caption: "I look back at every moment that made me feel alive — truly, deeply alive — and you are woven into every single one. You are not just a chapter. You are the light that makes the whole story readable. I am so grateful for every second. 🌟",
    memory: "Woven into my best moments",
    author: "— with all my love",
    theme: "gold",
  },
  {
    src: "/images/P11.jpeg",
    quote: "Twenty-four looks beautiful on you — but then, everything does.",
    caption: "Here you are — twenty-four years of warmth, laughter, loyalty and love. I have watched you grow and I have never once stopped being in awe of you. This year, may the universe return every ounce of love you have poured into the world. 🥂",
    memory: "Twenty-four, and still growing",
    author: "— your Rua, always and forever",
    theme: "coral",
  },
];

const REASONS = [
  { icon: "🌻", title: "You Remember Everything", text: "You remember the tiny throwaway things I say — the things I forget I even said — and somehow that makes me feel the most loved I have ever felt by another human being." },
  { icon: "🎵", title: "You Love Loudly", text: "The way you love music is the way I love you — with your whole chest, no holding back, no embarrassment. Pure. Loud. Beautiful. It mirrors your entire soul, and I am endlessly grateful to witness it." },
  { icon: "🌙", title: "You Show Up at 2am", text: "You check on people at 2am when you sense they're struggling. Not because anyone asks — because your heart simply won't rest until the people you love are okay. That is not common. That is extraordinary." },
  { icon: "⚡", title: "You Make Ordinary Magic", text: "You turn the most forgettable Tuesday into something I will carry forever. That is not luck. That is a gift only you have — the art of making ordinary life feel completely extraordinary." },
  { icon: "🤝", title: "You Never Let Anyone Fight Alone", text: "You suit up, you show up, and you stay — even when it costs you something. That kind of loyalty is the rarest thing I have ever witnessed. I will spend my whole life being grateful you chose me too." },
  { icon: "💬", title: "Your Honesty Heals", text: "You tell the truth in a way that feels like a hug. Honest, but tender. Brave, but kind. I have never met anyone who could do that the way you do, and I never want to stop learning from you." },
];

const TIMELINE = [
  { year: "Day 1", label: "The universe decided you were needed", icon: "🌙" },
  { year: "Growing up", label: "You became the person everyone leans on", icon: "🌱" },
  { year: "Then & now", label: "You walked into my life and nothing was the same", icon: "💛" },
  { year: "Today", label: "Twenty-four years of you — still not enough", icon: "🎂" },
  { year: "Forever", label: "Every year with you is my favourite year yet", icon: "✨" },
];

// ─── FLOATING PETALS ───────────────────────────────────────────────────────
function FloatingPetals() {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 5,
    size: 10 + Math.random() * 14,
    symbol: ["🌸", "✨", "💛", "🌷", "⭐", "💫", "🌺", "✦"][i % 8],
    rotate: Math.random() * 360,
  }));

  return (
    <div className="petals-layer" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="petal"
          style={{ left: p.left, fontSize: p.size }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.8, 0.8, 0], rotate: p.rotate }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}

// ─── GOLDEN ORBS ──────────────────────────────────────────────────────────
function GoldenOrbs() {
  return (
    <div className="orbs-bg" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`orb orb-${i + 1}`}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );
}

// ─── COUNTDOWN HEARTS ─────────────────────────────────────────────────────
function HeartRain() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 * i + Math.random() * 4}%`,
    delay: i * 0.25,
    size: 14 + Math.floor(Math.random() * 14),
    color: ["#ff6b9d", "#ffd07a", "#c084fc", "#6ee7b7", "#f97316"][i % 5],
  }));
  return (
    <div className="heart-rain">
      {items.map((h) => (
        <motion.span
          key={h.id}
          style={{ left: h.left, fontSize: h.size, color: h.color, position: "absolute" }}
          animate={{ y: [0, -90, -180], opacity: [0, 1, 0], rotate: [0, 12, -12] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: h.delay, ease: "easeOut" }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

// ─── PHOTO CARD ────────────────────────────────────────────────────────────
function PhotoCard({ photo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [flipped, setFlipped] = useState(false);

  const themeColors = {
    rose: "var(--rose)",
    violet: "var(--violet)",
    teal: "var(--teal)",
    gold: "var(--gold)",
    coral: "var(--coral)",
    sky: "var(--sky)",
  };

  return (
    <motion.div
      ref={ref}
      className={`photo-card theme-${photo.theme}`}
      initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -3 : 3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      style={{ "--card-accent": themeColors[photo.theme] }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-flip-inner ${flipped ? "is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="card-face card-front">
          <div className="photo-frame">
            <img src={photo.src} alt={`Memory — ${photo.memory}`} loading="lazy" />
            <div className="photo-overlay" />
            <div className="photo-num">#{String(index + 1).padStart(2, "0")}</div>
            <div className="photo-quote-teaser">
              <span className="quote-icon">❝</span>
              <em>{photo.quote}</em>
            </div>
          </div>
          <div className="card-front-foot">
            <p className="memory-tag">✦ {photo.memory}</p>
            <span className="tap-hint">tap to read 💌</span>
          </div>
        </div>

        {/* BACK */}
        <div className="card-face card-back">
          <div className="card-back-content">
            <p className="back-big-quote">❝</p>
            <p className="back-italic-quote">{photo.quote}</p>
            <div className="back-divider" />
            <p className="back-caption">{photo.caption}</p>
            <p className="back-author">{photo.author}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── REASON CARD ───────────────────────────────────────────────────────────
function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="reason-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1 }}
      whileHover={{ scale: 1.025, y: -4 }}
    >
      <div className="reason-icon-wrap">
        <motion.span
          className="reason-icon"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {reason.icon}
        </motion.span>
      </div>
      <div className="reason-body">
        <h4 className="reason-title">{reason.title}</h4>
        <p className="reason-text">{reason.text}</p>
      </div>
    </motion.div>
  );
}

// ─── TIMELINE ITEM ─────────────────────────────────────────────────────────
function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${index % 2 === 0 ? "tl-left" : "tl-right"}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12 }}
    >
      <div className="tl-dot">
        <span>{item.icon}</span>
      </div>
      <div className="tl-card">
        <span className="tl-year">{item.year}</span>
        <p className="tl-label">{item.label}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [revealed, setRevealed] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 5000;
    const colors = ["#ff6b9d", "#ffd07a", "#c084fc", "#6ee7b7", "#f97316", "#ffffff"];
    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors,
        shapes: ["circle", "square"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors,
        shapes: ["circle", "square"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { x: 0.5, y: 0.55 },
      colors: ["#ff6b9d", "#ffd07a", "#fff"],
      shapes: ["circle"],
      scalar: 1.3,
    });
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    setTimeout(fireConfetti, 700);
  };

  return (
    <div className="app">
      <GoldenOrbs />
      <FloatingPetals />

      {/* ── COVER / HERO ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.section
            key="cover"
            className="cover"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(24px)" }}
            transition={{ duration: 1 }}
          >
            <div className="cover-center">
              <motion.div
                className="cover-emblem"
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="cover-cake">🎂</span>
              </motion.div>

              <motion.h1
                className="cover-headline"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9 }}
              >
                Someone extraordinary
                <br />
                <span className="cover-highlight">is turning {AGE}.</span>
              </motion.h1>

              <motion.p
                className="cover-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                And the universe prepared something just for them 🌙
              </motion.p>

              <motion.button
                className="reveal-btn"
                onClick={handleReveal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.07, boxShadow: "0 0 60px rgba(255,107,157,0.8)" }}
                whileTap={{ scale: 0.94 }}
              >
                Open Your Surprise&nbsp; 🎁
              </motion.button>

              <HeartRain />
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="hero"
            className="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="hero-inner"
              style={{ opacity: heroOpacity, scale: heroScale }}
            >
              <motion.span
                className="hero-eyebrow"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ✦ twenty-four ✦
              </motion.span>

              <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9 }}
              >
                {LOVE_NAME}
              </motion.h1>

              <motion.p
                className="hero-typewriter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Typewriter
                  options={{ delay: 42, cursor: "♡", loop: true }}
                  onInit={(tw) =>
                    tw
                      .typeString("My favourite person in the entire world.")
                      .pauseFor(1800)
                      .deleteAll(30)
                      .typeString("The one who makes everything make sense.")
                      .pauseFor(1800)
                      .deleteAll(30)
                      .typeString("Happy 24th birthday, my love. 🥂")
                      .pauseFor(2200)
                      .deleteAll(30)
                      .start()
                  }
                />
              </motion.p>

              <motion.div
                className="hero-from"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <span>with all my love,</span>
                <strong> {FROM_NAME}</strong>
              </motion.div>

              <motion.div
                className="hero-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                {["💛", "🌙", "✨", "🌸", "💛"].map((ic, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -12, 0], rotate: [0, 9, -9, 0] }}
                    transition={{
                      duration: 2.5 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.18,
                    }}
                  >
                    {ic}
                  </motion.span>
                ))}
              </motion.div>

              <HeartRain />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── REST OF PAGE ─────────────────────────────────────── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            {/* ── TIMELINE ── */}
            <section className="section timeline-section">
              <div className="section-header" data-inview>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="section-eyebrow">the story of you</span>
                  <h2 className="section-title">A Journey Worth Celebrating</h2>
                  <p className="section-sub">Twenty-four years of becoming someone the world needed 🌙</p>
                </motion.div>
              </div>
              <div className="timeline">
                <div className="tl-line" />
                {TIMELINE.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </section>

            {/* ── SWIPER CAROUSEL ── */}
            <section className="section slider-section">
              <div className="section-header">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="section-eyebrow">our most precious frames</span>
                  <h2 className="section-title">Every Picture, a Feeling</h2>
                  <p className="section-sub">Moments I would trade nothing in the world for 🌙</p>
                </motion.div>
              </div>

              <div className="swiper-outer">
                <Swiper
                  modules={[Autoplay, Pagination, EffectCards, Navigation]}
                  effect="cards"
                  grabCursor
                  centeredSlides
                  autoplay={{ delay: 2600, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation
                  className="bday-swiper"
                >
                  {PHOTOS.map((photo, i) => (
                    <SwiperSlide key={i} className="bday-slide">
                      <img src={photo.src} alt={`Slide ${i + 1}`} />
                      <div className="slide-glass">
                        <p className="slide-quote">❝ {photo.quote} ❞</p>
                        <span className="slide-memory">{photo.memory}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* ── PHOTO GRID (flip cards) ── */}
            <section className="section photos-section">
              <div className="section-header">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="section-eyebrow">letters i never sent</span>
                  <h2 className="section-title">Until Now.</h2>
                  <p className="section-sub">
                    Tap each card to read what my heart has been holding 🤍
                  </p>
                </motion.div>
              </div>

              <div className="photos-grid">
                {PHOTOS.map((photo, i) => (
                  <PhotoCard key={i} photo={photo} index={i} />
                ))}
              </div>
            </section>

            {/* ── REASONS ── */}
            <section className="section reasons-section">
              <div className="section-header">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="section-eyebrow">why you are irreplaceable</span>
                  <h2 className="section-title">A List I Could Write Forever</h2>
                  <p className="section-sub">And still never finish 💛</p>
                </motion.div>
              </div>
              <div className="reasons-grid">
                {REASONS.map((r, i) => (
                  <ReasonCard key={i} reason={r} index={i} />
                ))}
              </div>
            </section>

            {/* ── FINALE ── */}
            <section className="section finale-section">
              <motion.div
                className="finale-card"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="finale-glow-icon"
                  animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  💛
                </motion.div>

                <h2 className="finale-heading">Here's to you, Arshad.</h2>

                <p className="finale-body">
                  Twenty-four years ago, the world got a little louder, a little warmer, and a whole lot
                  more beautiful — and I don't think it has recovered since. You are the kind of person
                  people write songs about, paint on walls, and whisper about in prayers. You are my favourite
                  story, my safest place, the answer to every question I didn't know I was asking.
                  <br /><br />
                  May this year give you everything your generous heart deserves. May you be loved the
                  way you love others — completely, without conditions, without limits. I am the luckiest
                  person alive simply because I get to know you, to stand beside you, to be chosen by you.
                  <br /><br />
                  Happy 24th birthday, my love. 🥂
                </p>

                <div className="finale-from">
                  <span>With every piece of me,</span>
                  <strong> {FROM_NAME} 💛</strong>
                </div>

                <div className="finale-stamp">
                  <motion.div
                    className="stamp-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  >
                    ✦ born for greatness ✦ turning 24 ✦ loved endlessly ✦&nbsp;
                  </motion.div>
                  <span className="stamp-num">24</span>
                </div>

                <motion.button
                  className="confetti-btn"
                  onClick={fireConfetti}
                  whileHover={{ scale: 1.07, boxShadow: "0 0 50px rgba(255,208,122,0.7)" }}
                  whileTap={{ scale: 0.94 }}
                >
                  🎊 Celebrate Again!
                </motion.button>
              </motion.div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="footer">
              <p className="footer-heart">💛</p>
              <p className="footer-text">
                Made with love by{" "}
                <span className="footer-accent">your best friend</span> 🌙
              </p>
              <p className="footer-sub">
                Happy 24th, {LOVE_NAME} — from {FROM_NAME}, always.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}