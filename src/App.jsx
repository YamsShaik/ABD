import { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import Typewriter from "typewriter-effect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards, Navigation } from "swiper/modules";
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

// ─── STATIC STAR FIELD (CSS only, no JS animation loop) ────────────────────
function StarField() {
  // Pre-computed — no random on each render, no motion on scroll
  const stars = useMemo(() => Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: `${(i * 17.3) % 100}%`,
    top:  `${(i * 23.7) % 100}%`,
    size: ((i % 3) + 1) * 1.5,
    delay: `${(i * 0.37) % 4}s`,
    dur:   `${2.5 + (i % 3)}s`,
  })), []);

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
}

// ─── STATIC GRADIENT BLOBS (pure CSS, no framer-motion on fixed layer) ─────
function GradientBlobs() {
  return <div className="gradient-blobs" aria-hidden="true" />;
}

// ─── HEART RAIN (only on cover/hero, not fixed) ────────────────────────────
function HeartRain() {
  const items = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${9 * i + 3}%`,
    delay: i * 0.28,
    size: 14 + (i % 4) * 4,
    color: ["#ff6b9d", "#ffd07a", "#c084fc", "#6ee7b7", "#f97316"][i % 5],
  })), []);

  return (
    <div className="heart-rain">
      {items.map((h) => (
        <motion.span
          key={h.id}
          style={{ left: h.left, fontSize: h.size, color: h.color }}
          animate={{ y: [0, -100, -200], opacity: [0, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: h.delay, ease: "easeOut" }}
        >♥</motion.span>
      ))}
    </div>
  );
}

// ─── PHOTO CARD ────────────────────────────────────────────────────────────
function PhotoCard({ photo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`photo-card theme-${photo.theme}`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.3) }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-flip-inner ${flipped ? "is-flipped" : ""}`}>
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
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      className="reason-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.35) }}
    >
      <div className="reason-icon-wrap">
        <span className="reason-icon">{reason.icon}</span>
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
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${index % 2 === 0 ? "tl-left" : "tl-right"}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="tl-dot"><span>{item.icon}</span></div>
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

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 4500;
    const colors = ["#ff6b9d", "#ffd07a", "#c084fc", "#6ee7b7", "#f97316", "#ffffff"];
    const frame = () => {
      confetti({ particleCount: 6, angle: 60,  spread: 75, origin: { x: 0,   y: 0.7 }, colors, shapes: ["circle", "square"] });
      confetti({ particleCount: 6, angle: 120, spread: 75, origin: { x: 1,   y: 0.7 }, colors, shapes: ["circle", "square"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    confetti({ particleCount: 100, spread: 110, origin: { x: 0.5, y: 0.55 }, colors: ["#ff6b9d", "#ffd07a", "#fff"], shapes: ["circle"], scalar: 1.2 });
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    setTimeout(fireConfetti, 600);
  };

  return (
    <div className="app">
      <GradientBlobs />
      <StarField />

      {/* ── COVER / HERO ── */}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.section
            key="cover"
            className="cover"
            exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
            transition={{ duration: 0.85 }}
          >
            <div className="cover-center">
              <motion.div
                className="cover-emblem"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="cover-cake">🎂</span>
                <div className="cover-sparkles">
                  {["✦","✦","✦","✦","✦","✦"].map((s, i) => (
                    <span key={i} className={`spark spark-${i}`}>{s}</span>
                  ))}
                </div>
              </motion.div>

              <motion.h1
                className="cover-headline"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
              >
                Someone extraordinary
                <br />
                <span className="cover-highlight">is turning {AGE}.</span>
              </motion.h1>

              <motion.p
                className="cover-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                And the universe prepared something just for them 🌙
              </motion.p>

              <motion.button
                className="reveal-btn"
                onClick={handleReveal}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Your Surprise 🎁
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
            transition={{ duration: 0.9 }}
          >
            <div className="hero-inner">
              <motion.span
                className="hero-eyebrow"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                ✦ Happy-Birthday ✦
              </motion.span>

              <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.85 }}
              >
                {LOVE_NAME}
              </motion.h1>

              <motion.p
                className="hero-typewriter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Typewriter
                  options={{ delay: 40, cursor: "♡", loop: true }}
                  onInit={(tw) =>
                    tw
                      .typeString("My favourite person in the entire world.")
                      .pauseFor(1800).deleteAll(28)
                      .typeString("The one who makes everything make sense.")
                      .pauseFor(1800).deleteAll(28)
                      .typeString("Happy 24th birthday, my love. 🥂")
                      .pauseFor(2200).deleteAll(28)
                      .start()
                  }
                />
              </motion.p>

              <motion.div
                className="hero-from"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <span>with all my love,</span>
                <strong> {FROM_NAME}</strong>
              </motion.div>

              <motion.div
                className="hero-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {["💛","🌙","✨","🌸","💛"].map((ic, i) => (
                  <span key={i} className={`hero-icon hi-${i}`}>{ic}</span>
                ))}
              </motion.div>

              <HeartRain />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── CONTENT ── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9 }}
          >
            {/* TIMELINE */}
            <section className="section timeline-section">
              <div className="section-header">
                <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="section-eyebrow">the story of you</span>
                  <h2 className="section-title">A Journey Worth Celebrating</h2>
                  <p className="section-sub">Twenty-four years of becoming someone the world needed 🌙</p>
                </motion.div>
              </div>
              <div className="timeline">
                <div className="tl-line" />
                {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
              </div>
            </section>

            {/* SWIPER */}
            <section className="section slider-section">
              <div className="section-header">
                <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
                  autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  pagination={{ clickable: true }}
                  navigation
                  className="bday-swiper"
                >
                  {PHOTOS.map((photo, i) => (
                    <SwiperSlide key={i} className="bday-slide">
                      <img src={photo.src} alt={`Slide ${i + 1}`} loading="lazy" />
                      <div className="slide-glass">
                        <p className="slide-quote">❝ {photo.quote} ❞</p>
                        <span className="slide-memory">{photo.memory}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* FLIP CARDS */}
            <section className="section photos-section">
              <div className="section-header">
                <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="section-eyebrow">letters i never sent</span>
                  <h2 className="section-title">Until Now.</h2>
                  <p className="section-sub">Tap each card to read what my heart has been holding 🤍</p>
                </motion.div>
              </div>
              <div className="photos-grid">
                {PHOTOS.map((photo, i) => <PhotoCard key={i} photo={photo} index={i} />)}
              </div>
            </section>

            {/* REASONS */}
            <section className="section reasons-section">
              <div className="section-header">
                <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="section-eyebrow">why you are irreplaceable</span>
                  <h2 className="section-title">A List I Could Write Forever</h2>
                  <p className="section-sub">And still never finish 💛</p>
                </motion.div>
              </div>
              <div className="reasons-grid">
                {REASONS.map((r, i) => <ReasonCard key={i} reason={r} index={i} />)}
              </div>
            </section>

            {/* FINALE */}
            <section className="section finale-section">
              <motion.div
                className="finale-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="finale-glow-icon">💛</div>
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
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  >
                    ✦ born for greatness ✦ turning 24 ✦ loved endlessly ✦&nbsp;
                  </motion.div>
                  <span className="stamp-num">24</span>
                </div>
                <motion.button
                  className="confetti-btn"
                  onClick={fireConfetti}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎊 Celebrate Again!
                </motion.button>
              </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
              <p className="footer-heart">💛</p>
              <p className="footer-text">Made with love by <span className="footer-accent">your best friend</span> 🌙</p>
              <p className="footer-sub">Happy 24th, {LOVE_NAME} — from {FROM_NAME}, always.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}