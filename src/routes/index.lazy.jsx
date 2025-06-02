import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import '../App.css'
import { useState } from 'react'
// import Button from '../components/Button.jsx';

export const Route = createLazyFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const navigate = useNavigate()
  const [showTooltip, setShowTooltip] = useState(false)
  const [isProvider, setIsProvider] = useState(false)

  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches

  return (
    <div style={{
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f3f0ff 0%, #e0e7ff 100%)',
      padding: 0,
    }}>
      {/* Animation keyframes for pulse */}
      <style>{`
        @keyframes acutePulse {
          0% { box-shadow: 0 0 0 0 rgba(123,44,191,0.18); }
          70% { box-shadow: 0 0 0 12px rgba(123,44,191,0); }
          100% { box-shadow: 0 0 0 0 rgba(123,44,191,0.18); }
        }
      `}</style>
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 24,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        padding: '48px 32px 40px 32px',
        maxWidth: 440,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}>
        <h1 style={{
          fontSize: '2.6rem',
          fontWeight: 800,
          color: '#7B2CBF',
          margin: 0,
          letterSpacing: '-1px',
          textAlign: 'center',
          textShadow: '0 2px 8px #7B2CBF11',
        }}>
          SCiPP Chest Pain Pathway
        </h1>
        <div style={{
          fontSize: '1.15rem',
          color: '#444',
          fontWeight: 500,
          textAlign: 'center',
          marginBottom: 8,
        }}>
          Evidence-based, stepwise guidance for chest pain in the ED
        </div>
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 18,
          }}>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#222',
              margin: 0,
              letterSpacing: '-0.5px',
            }}>
              I am a healthcare provider
            </span>
            <button
              aria-label="Toggle healthcare provider"
              onClick={() => setIsProvider(v => !v)}
              style={{
                width: 48,
                height: 28,
                background: isProvider ? '#222' : '#eee',
                borderRadius: 16,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isProvider ? 'flex-end' : 'flex-start',
                padding: 3,
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: isProvider ? '0 2px 8px #2222' : '0 1px 3px #bbb2',
              }}
            >
              <span style={{
                width: 22,
                height: 22,
                background: '#fff',
                borderRadius: '50%',
                display: 'block',
                transition: 'box-shadow 0.2s',
                boxShadow: isProvider ? '0 2px 8px #2222' : '0 1px 3px #bbb2',
              }} />
            </button>
          </div>
          <div style={{ fontSize: '1.08rem', color: '#222', marginBottom: 18 }}>
            <b>Disclosure:</b> This app is meant as a decision pathway based on national and international guidelines but is not meant to supplant clinical judgment.
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24, marginTop: 12 }}>
          <button
            onClick={() => navigate({ to: '/acute-one' })}
            style={{
              width: '100%',
              padding: '28px 0',
              background: 'linear-gradient(90deg, #7B2CBF 0%, #1976d2 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.25rem',
              border: 'none',
              borderRadius: 12,
              boxShadow: '0 2px 12px #7B2CBF22',
              cursor: 'pointer',
              marginBottom: 0,
              transition: 'background 0.2s, box-shadow 0.2s',
              letterSpacing: '0.01em',
              outline: 'none',
              animation: 'acutePulse 1.5s infinite',
            }}
            onMouseDown={e => e.currentTarget.style.filter = 'brightness(0.97)'}
            onMouseUp={e => e.currentTarget.style.filter = 'none'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}
          >
            Acute Chest Pain
          </button>
          <div style={{ position: 'relative', width: '100%' }}>
            <button
              style={{
                width: '100%',
                padding: '28px 0',
                background: '#e0e0e0',
                color: '#222',
                fontWeight: 600,
                fontSize: '1.22rem',
                border: 'none',
                borderRadius: 12,
                boxShadow: '0 2px 8px #bbb3',
                cursor: 'not-allowed',
                opacity: 0.85,
                position: 'relative',
                outline: 'none',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={() => !isMobile && setShowTooltip(true)}
              onMouseLeave={() => !isMobile && setShowTooltip(false)}
              onTouchStart={() => isMobile && setShowTooltip(true)}
              onTouchEnd={() => isMobile && setShowTooltip(false)}
              tabIndex={-1}
            >
              Chronic Chest Pain
            </button>
            {showTooltip && (
              <div style={{
                position: 'absolute',
                left: '50%',
                top: isMobile ? '100%' : '50%',
                transform: isMobile ? 'translate(-50%, 12px)' : 'translate(-50%, -120%)',
                background: '#222',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 12px #0002',
                zIndex: 10,
                pointerEvents: 'none',
              }}>
                Still in development
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
