import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Smartphone, ArrowRight, Zap, ShieldCheck, Tag, Star, Sparkles } from 'lucide-react';

const DISPLAY_DURATION_MS = 6500;
const EXIT_DURATION_MS = 280;

export const AppInstallModal: React.FC = () => {
  // Session check to avoid repeatedly displaying on every internal page transition
  const [shouldShow] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('haatza_welcome_dismissed');
    } catch {
      return true;
    }
  });

  const [phase, setPhase] = useState<'entering' | 'visible' | 'exiting' | 'hidden'>(() => {
    return shouldShow ? 'entering' : 'hidden';
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(DISPLAY_DURATION_MS);

  const handleDismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    try {
      sessionStorage.setItem('haatza_welcome_dismissed', 'true');
    } catch {
      // ignore
    }
    setPhase('exiting');
    exitTimerRef.current = setTimeout(() => {
      setPhase('hidden');
    }, EXIT_DURATION_MS);
  }, []);

  // Pause timer on hover so interested users aren't interrupted while clicking
  const handleMouseEnter = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(1500, remainingTimeRef.current - elapsed);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (phase === 'visible' && !timerRef.current) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        handleDismiss();
      }, remainingTimeRef.current);
    }
  }, [phase, handleDismiss]);

  useEffect(() => {
    if (!shouldShow) return;

    // Trigger visible state on next frame for entrance animation
    const rafId = requestAnimationFrame(() => {
      setPhase((prev) => (prev === 'entering' ? 'visible' : prev));
    });

    startTimeRef.current = Date.now();
    remainingTimeRef.current = DISPLAY_DURATION_MS;

    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, DISPLAY_DURATION_MS);

    return () => {
      cancelAnimationFrame(rafId);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [shouldShow, handleDismiss]);

  const handleOpenApp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.haatzaindia.haatza';
    const appStoreUrl = 'https://apps.apple.com/in/app/haatza-shop-house-help/id6743952409';
    const fallbackUrl = isIOS ? appStoreUrl : playStoreUrl;

    let appOpened = false;
    const onBlur = () => {
      appOpened = true;
    };
    window.addEventListener('blur', onBlur, { once: true });

    if (isAndroid) {
      window.location.href = 'intent://open#Intent;scheme=haatza;package=com.haatzaindia.haatza;end';
    } else {
      window.location.href = 'haatza://open';
    }

    setTimeout(() => {
      window.removeEventListener('blur', onBlur);
      if (!appOpened && document.hasFocus()) {
        window.location.href = fallbackUrl;
      }
    }, 800);

    handleDismiss();
  };

  if (phase === 'hidden' || !shouldShow) return null;

  const isVisible = phase === 'visible';
  const isExiting = phase === 'exiting';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Experience Haatza on the App"
      className="haatza-welcome-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleDismiss();
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        backgroundColor: isExiting ? 'transparent' : 'rgba(11, 23, 44, 0.42)',
        backdropFilter: isExiting ? 'none' : 'blur(6px)',
        WebkitBackdropFilter: isExiting ? 'none' : 'blur(6px)',
        transition: 'background-color 280ms ease, backdrop-filter 280ms ease',
        userSelect: 'none',
      }}
    >
      {/* Centered High-Conversion Luxury Welcome Card */}
      <div
        className="haatza-welcome-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#FFFFFF',
          backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)',
          borderRadius: '26px',
          padding: '32px 26px 22px',
          boxShadow: `
            0 24px 60px -12px rgba(15, 30, 66, 0.28),
            0 8px 24px -4px rgba(29, 78, 216, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 1)
          `,
          border: '1px solid rgba(29, 78, 216, 0.18)',
          overflow: 'hidden',
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateY(0) scale(1)'
            : isExiting
            ? 'translateY(-12px) scale(0.97)'
            : 'translateY(18px) scale(0.96)',
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Soft Ambient Radial Glow Behind Logo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            height: '170px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 70%)',
            filter: 'blur(24px)',
            pointerEvents: 'none',
          }}
        />

        {/* Animated Prismatic Top Shimmer Bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            overflow: 'hidden',
            background: 'rgba(226, 232, 240, 0.6)',
          }}
        >
          <div
            className="haatza-app-shimmer"
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, #2563EB 25%, #38BDF8 50%, #2563EB 75%, transparent 100%)',
            }}
          />
        </div>

        {/* Crisp Circular Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '32px',
            height: '32px',
            borderRadius: '9999px',
            color: '#64748B',
            backgroundColor: '#F1F5F9',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 180ms ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0F172A';
            e.currentTarget.style.backgroundColor = '#E2E8F0';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
            e.currentTarget.style.backgroundColor = '#F1F5F9';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Close welcome banner"
        >
          <X style={{ width: '15px', height: '15px', strokeWidth: 2.3 }} />
        </button>

        {/* Card Main Body */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {/* App Icon Container with Verified 4.8 Badge */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <div
              style={{
                position: 'relative',
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                background: 'linear-gradient(145deg, #1D4ED8 0%, #1E40AF 55%, #172554 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                boxShadow: `
                  0 12px 28px -4px rgba(29, 78, 216, 0.45),
                  0 4px 10px rgba(0, 0, 0, 0.12),
                  inset 0 1px 0 rgba(255, 255, 255, 0.45)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* App Icon Top Glass Specular Arc */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  borderRadius: '17px 17px 60px 60px',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 100%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Official Haatza Monogram with Sparkle */}
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="11" y="13" width="6.5" height="22" rx="3.25" fill="#FFFFFF" />
                <rect x="25.5" y="13" width="6.5" height="22" rx="3.25" fill="#FFFFFF" />
                <rect x="13.5" y="21" width="16" height="6" rx="2" fill="#FFFFFF" />
                <path d="M37 5C37 8 38.8 9.8 41.5 9.8C38.8 9.8 37 11.6 37 14.6C37 11.6 35.2 9.8 32.5 9.8C35.2 9.8 37 8 37 5Z" fill="#38BDF8" />
              </svg>
            </div>

            {/* Floating Verified 4.8★ Rating Micro-Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2.5px',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: '#0F172A',
                border: '1.5px solid #FFFFFF',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.25)',
                color: '#FBBF24',
                fontSize: '10.5px',
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              <Star style={{ width: '10px', height: '10px', fill: '#FBBF24', stroke: '#FBBF24' }} />
              <span style={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 800 }}>4.8</span>
            </div>
          </div>

          {/* Eye-Catchy Eyebrow Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(29, 78, 216, 0.08)',
              border: '1px solid rgba(29, 78, 216, 0.18)',
              color: '#1D4ED8',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <Sparkles style={{ width: '11px', height: '11px', color: '#2563EB' }} />
            <span>Official Haatza App</span>
          </div>

          {/* Headline - "For a Better Experience, Use the App" */}
          <h2
            style={{
              fontSize: '21px',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.25,
              marginBottom: '6px',
              letterSpacing: '-0.025em',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            For a Better Experience,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #0284C7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Use the App
            </span>
          </h2>

          {/* Trustworthy & Engaging Supporting Message */}
          <p
            style={{
              fontSize: '13px',
              color: '#475569',
              fontWeight: 400,
              lineHeight: 1.45,
              maxWidth: '350px',
              margin: '0 0 16px 0',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Unlock 10-minute ultra-fast delivery, live order tracking, and exclusive app-only member discounts.
          </p>

          {/* 3 High-Trust Benefit Pills */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              width: '100%',
              marginBottom: '18px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 6px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 246, 255, 0.7)',
                border: '1px solid rgba(219, 234, 254, 0.9)',
              }}
            >
              <Zap style={{ width: '14px', height: '14px', color: '#2563EB', marginBottom: '3px' }} />
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#1E3A8A', lineHeight: 1.2 }}>10-15 Min</span>
              <span style={{ fontSize: '9px', color: '#64748B', fontWeight: 500 }}>Express Delivery</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 6px',
                borderRadius: '12px',
                backgroundColor: 'rgba(236, 253, 245, 0.7)',
                border: '1px solid rgba(209, 250, 229, 0.9)',
              }}
            >
              <Tag style={{ width: '14px', height: '14px', color: '#059669', marginBottom: '3px' }} />
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#064E3B', lineHeight: 1.2 }}>App Deals</span>
              <span style={{ fontSize: '9px', color: '#64748B', fontWeight: 500 }}>Extra Discounts</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 6px',
                borderRadius: '12px',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
              }}
            >
              <ShieldCheck style={{ width: '14px', height: '14px', color: '#0284C7', marginBottom: '3px' }} />
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0C4A6E', lineHeight: 1.2 }}>100% Safe</span>
              <span style={{ fontSize: '9px', color: '#64748B', fontWeight: 500 }}>Verified & Secure</span>
            </div>
          </div>

          {/* Prominent, Eye-Catchy Primary CTA Button */}
          <button
            type="button"
            onClick={handleOpenApp}
            className="haatza-install-app-btn"
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 55%, #1E40AF 100%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
              boxShadow: '0 10px 24px -4px rgba(29, 78, 216, 0.42), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1.5px)';
              e.currentTarget.style.boxShadow = '0 14px 30px -4px rgba(29, 78, 216, 0.52), 0 4px 10px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(29, 78, 216, 0.42), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.35)';
            }}
            aria-label="Open or install Haatza App"
          >
            {/* Button Inner Ambient Sweeper */}
            <div
              className="haatza-btn-sweep"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '60%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
              }}
            />

            <Smartphone style={{ width: '17px', height: '17px', strokeWidth: 2.3 }} />
            <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.01em' }}>
              Open / Install Haatza App
            </span>
            <ArrowRight className="haatza-cta-arrow" style={{ width: '15px', height: '15px', strokeWidth: 2.4, transition: 'transform 200ms ease' }} />
          </button>

          {/* Subtext and Subtle "Continue on Web" Link */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '12px',
              width: '100%',
            }}
          >
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
              Free on Google Play & App Store
            </span>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px 0',
                color: '#64748B',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition: 'color 160ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1D4ED8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
              }}
            >
              Continue on web
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes haatzaAppShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes haatzaBtnSweep {
          0% {
            left: -100%;
          }
          50%, 100% {
            left: 150%;
          }
        }
        .haatza-app-shimmer {
          animation: haatzaAppShimmer 3000ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .haatza-btn-sweep {
          animation: haatzaBtnSweep 3500ms ease-in-out infinite;
        }
        .haatza-install-app-btn:hover .haatza-cta-arrow {
          transform: translateX(3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .haatza-welcome-backdrop,
          .haatza-welcome-card {
            transition: opacity 200ms linear !important;
            transform: none !important;
          }
          .haatza-app-shimmer,
          .haatza-btn-sweep {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AppInstallModal;
