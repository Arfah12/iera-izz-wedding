
import { useState, useEffect, useRef } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./services/firebase";

import CameraOpening from "./components/CameraOpening";
import MusicPlayer from "./components/MusicPlayer";

import WeddingHero from "./components/WeddingHero";
import Invitation from "./components/Invitation";
import Couple from "./components/Couple";
import Countdown from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import GuestInteraction from "./components/GuestInteraction";
import WishesWall from "./components/WishesWall";
import Closing from "./components/Closing";
import { weddingData } from "./config/weddingData";

// Admin
import AdminAccess from "./components/admin/AdminAccess";
import AdminDashboard from "./components/admin/AdminDashboard";

import "./App.css";

// Authorized admin UID
const ADMIN_UID = "LDN1EMTs47UpSuGAUy3Jcb2oi0T2";

export default function App() {
  const [experienceStarted, setExperienceStarted] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Auto-scroll references
  const animationRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const startYRef = useRef(0);
  const targetYRef = useRef(0);
  const startTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const completedRef = useRef(false);

  // Auto-scroll settings
  const scrollDuration = 120000; // 2 minutes
  const resumeDelay = 3000; // 3 seconds
  const heroWaitingTime = 2000; // 2 seconds

  // ========================================
  // FIREBASE AUTHENTICATION LISTENER
  // ========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.uid === ADMIN_UID) {
        setAdminLoggedIn(true);
      } else {
        setAdminLoggedIn(false);

        // Reject unauthorized accounts
        if (user) {
          try {
            await signOut(auth);
          } catch (error) {
            console.error("Unauthorized logout error:", error);
          }
        }
      }

      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // ========================================
  // START WEDDING EXPERIENCE
  // ========================================

  const handleStartExperience = () => {
    setExperienceStarted(true);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // ========================================
  // OPEN ADMIN
  // ========================================

  const handleOpenAdmin = () => {
    setAdminOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // ========================================
  // CLOSE ADMIN
  // ========================================

  const handleCloseAdmin = () => {
    setAdminOpen(false);
  };

  // ========================================
  // SUCCESSFUL FIREBASE LOGIN
  // ========================================

  const handleAdminSuccess = () => {
    setAdminLoggedIn(true);
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);

      setAdminLoggedIn(false);
      setAdminOpen(false);

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ========================================
  // AUTO + MANUAL SCROLL
  // ========================================

  useEffect(() => {
    if (!experienceStarted || adminOpen) return;

    let mounted = true;
    let initialTimer;
    let heroScrollTimer;

    pausedRef.current = false;
    completedRef.current = false;

    // Get maximum scroll position
    const getMaxScroll = () => {
      return Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    // AUTO-SCROLL ANIMATION
    const animateScroll = (currentTime) => {
      if (!mounted || pausedRef.current || completedRef.current) {
        return;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / scrollDuration, 1);

      const currentY =
        startYRef.current +
        (targetYRef.current - startYRef.current) * progress;

      window.scrollTo(0, currentY);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        completedRef.current = true;
      }
    };

    // START AUTO-SCROLL
    const startAutoScroll = () => {
      if (!mounted || completedRef.current) return;

      startYRef.current = window.scrollY;
      targetYRef.current = getMaxScroll();

      if (targetYRef.current <= startYRef.current + 2) {
        completedRef.current = true;
        return;
      }

      startTimeRef.current = performance.now();

      animationRef.current = requestAnimationFrame(animateScroll);
    };

    // PAUSE AUTO-SCROLL
    const pauseAutoScroll = () => {
      if (completedRef.current) return;

      pausedRef.current = true;

      cancelAnimationFrame(animationRef.current);
      clearTimeout(resumeTimerRef.current);

      // Resume after user stops scrolling
      resumeTimerRef.current = setTimeout(() => {
        if (!mounted) return;

        pausedRef.current = false;
        startAutoScroll();

      }, resumeDelay);
    };

    // DETECT MANUAL SCROLLING
    const handleWheel = () => {
      pauseAutoScroll();
    };

    const handleTouchMove = () => {
      pauseAutoScroll();
    };

    const handleKeyDown = (event) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];

      if (scrollKeys.includes(event.key)) {
        pauseAutoScroll();
      }
    };

    // ========================================
    // SHOW HERO FIRST
    // ========================================

    initialTimer = setTimeout(() => {
      if (!mounted) return;

      const hero = document.getElementById("wedding-hero");

      if (!hero) return;

      // Position at the top of Hero
      window.scrollTo({
        top: hero.offsetTop,
        behavior: "instant",
      });

      // Wait 2 seconds before auto-scroll
      heroScrollTimer = setTimeout(() => {
        if (!mounted) return;

        startAutoScroll();

      }, heroWaitingTime);

    }, 500);

    // Event listeners
    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    window.addEventListener("keydown", handleKeyDown);

    // CLEANUP
    return () => {
      mounted = false;

      clearTimeout(initialTimer);
      clearTimeout(heroScrollTimer);
      clearTimeout(resumeTimerRef.current);

      cancelAnimationFrame(animationRef.current);

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [experienceStarted, adminOpen]);

  // ========================================
  // AUTHENTICATION CHECKING
  // ========================================

  if (adminOpen && authChecking) {
    return (
      <section className="admin-access">
        <div className="admin-login-card">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  // ========================================
  // ADMIN DASHBOARD
  // ========================================

  if (adminOpen && adminLoggedIn) {
    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
      />
    );
  }

  // ========================================
  // ADMIN LOGIN
  // ========================================

  if (adminOpen && !adminLoggedIn) {
    return (
      <AdminAccess
        onBack={handleCloseAdmin}
        onSuccess={handleAdminSuccess}
      />
    );
  }

  // ========================================
  // WEDDING INVITATION
  // ========================================

  return (
    <>
      {!experienceStarted && (
        <CameraOpening
          couplePhoto={weddingData.polaroidPhoto1}
          onStartExperience={handleStartExperience}
        />
      )}

      {experienceStarted && (
        <>
          <MusicPlayer />

          <main id="wedding-invitation">

            <div id="wedding-hero">
              <WeddingHero />
            </div>

            <Invitation />

            <Couple />

            <Countdown />

            <EventDetails />

            <GuestInteraction />

            <WishesWall />

            <Closing
              onManageGuestbook={handleOpenAdmin}
            />

          </main>
        </>
      )}
    </>
  );
}
