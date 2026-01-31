import React, { useState, useEffect } from 'react';

// ============================================
// AI TOWNSQUARE: DUBAI EDITION
// World-class civic platform website
// ============================================

// Brand Colors
const colors = {
  civicNavy: '#0B1F3B',
  navyLight: '#1A3A5C',
  signalTeal: '#1AA6A6',
  tealLight: '#2BC4C4',
  insightGold: '#F4B400',
  goldLight: '#FFD54F',
  offWhite: '#F7F9FC',
  concrete: '#DEE3EA',
  cream: '#FEFCF6',
};

// Countdown Hook
const useCountdown = (targetDate) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(targetDate) - now;
      
      if (diff > 0) {
        setTime({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  
  return time;
};

// ============================================
// COMPONENTS
// ============================================

const Navigation = () => (
  <nav style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(11, 31, 59, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        background: colors.signalTeal,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>AI</span>
      </div>
      <span style={{ 
        color: 'white', 
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '20px',
        fontWeight: '600',
        letterSpacing: '-0.5px',
      }}>
        TownSquare
      </span>
    </div>
    
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      {['About', 'Protocol', 'Host', 'Apply'].map((item, i) => (
        <a 
          key={i}
          href={`#${item.toLowerCase()}`}
          style={{
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.target.style.color = colors.signalTeal}
          onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
        >
          {item}
        </a>
      ))}
      <a 
        href="#apply"
        style={{
          background: colors.signalTeal,
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        Apply Now
      </a>
    </div>
  </nav>
);

const CountdownBox = ({ value, label }) => (
  <div style={{
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: '24px 32px',
    minWidth: '100px',
    textAlign: 'center',
  }}>
    <p style={{ 
      color: colors.insightGold, 
      fontSize: '48px', 
      fontWeight: '700', 
      margin: 0,
      fontFamily: '"Space Mono", monospace',
      lineHeight: 1,
    }}>
      {String(value).padStart(2, '0')}
    </p>
    <p style={{ 
      color: 'rgba(255,255,255,0.5)', 
      fontSize: '11px', 
      margin: '8px 0 0 0', 
      textTransform: 'uppercase', 
      letterSpacing: '2px',
      fontWeight: '500',
    }}>
      {label}
    </p>
  </div>
);

const SectionLabel = ({ children, light = false }) => (
  <p style={{ 
    color: light ? colors.insightGold : colors.signalTeal, 
    fontSize: '12px', 
    letterSpacing: '3px', 
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '16px',
  }}>
    {children}
  </p>
);

const SectionTitle = ({ children, light = false }) => (
  <h2 style={{
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: '700',
    color: light ? 'white' : colors.civicNavy,
    margin: '0 0 24px 0',
    lineHeight: '1.15',
    letterSpacing: '-1px',
  }}>
    {children}
  </h2>
);

// ============================================
// MAIN COMPONENT
// ============================================

export default function AITownSquareDubai() {
  const countdown = useCountdown('2025-02-15T18:00:00+04:00');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    reason: '',
  });

  return (
    <div style={{ 
      fontFamily: '"DM Sans", system-ui, sans-serif', 
      color: colors.civicNavy,
      overflowX: 'hidden',
    }}>
      
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      
      <Navigation />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(165deg, ${colors.civicNavy} 0%, ${colors.navyLight} 50%, #234668 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        
        {/* Accent Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.signalTeal}22 0%, transparent 70%)`,
          borderRadius: '50%',
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '140px 40px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Left Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '100px',
              marginBottom: '32px',
            }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                background: colors.insightGold, 
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: '13px', 
                fontWeight: '500',
                letterSpacing: '0.5px',
              }}>
                Dubai Edition · February 2025
              </span>
            </div>
            
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(42px, 6vw, 72px)',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 24px 0',
              lineHeight: '1.1',
              letterSpacing: '-2px',
            }}>
              "AI Is Going to<br />
              <span style={{ color: colors.insightGold }}>Take Our Jobs"</span>
            </h1>
            
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '20px',
              lineHeight: '1.6',
              margin: '0 0 40px 0',
              maxWidth: '500px',
            }}>
              Is it? And who decides what happens next? Join 25 curated voices for 60 minutes of structured civic dialogue on one of AI's most urgent questions.
            </p>
            
            {/* Countdown */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}>
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hours" />
              <CountdownBox value={countdown.minutes} label="Min" />
              <CountdownBox value={countdown.seconds} label="Sec" />
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a 
                href="#apply"
                style={{
                  background: colors.signalTeal,
                  color: 'white',
                  padding: '18px 36px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: `0 4px 20px ${colors.signalTeal}44`,
                }}
              >
                Apply for 1 of 25 Seats
                <span>→</span>
              </a>
              
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                Free · Curated Entry
              </span>
            </div>
          </div>
          
          {/* Right Column - Host Card */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '40px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '-1px',
              left: '40px',
              right: '40px',
              height: '3px',
              background: `linear-gradient(90deg, ${colors.signalTeal}, ${colors.insightGold})`,
              borderRadius: '0 0 4px 4px',
            }} />
            
            <p style={{ 
              color: colors.signalTeal, 
              fontSize: '12px', 
              letterSpacing: '2px', 
              textTransform: 'uppercase',
              marginBottom: '24px',
              fontWeight: '600',
            }}>
              Your Host
            </p>
            
            {/* Host Photo Placeholder */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.navyLight}, ${colors.civicNavy})`,
              border: `3px solid ${colors.signalTeal}`,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '14px',
            }}>
              Photo
            </div>
            
            <h3 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '28px',
              color: 'white',
              margin: '0 0 8px 0',
              fontWeight: '600',
            }}>
              [Host Name]
            </h3>
            
            <p style={{ 
              color: colors.signalTeal, 
              fontSize: '14px', 
              margin: '0 0 20px 0',
              fontWeight: '500',
            }}>
              [Title / Organization]
            </p>
            
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '15px',
              lineHeight: '1.7',
              margin: '0 0 24px 0',
            }}>
              [2-3 sentence bio about the host's expertise in AI, workforce transformation, or related fields. Why they're the right person to lead this dialogue.]
            </p>
            
            <div style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              borderLeft: `3px solid ${colors.insightGold}`,
            }}>
              <p style={{ 
                color: 'rgba(255,255,255,0.5)', 
                fontSize: '12px', 
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Venue
              </p>
              <p style={{ color: 'white', fontSize: '15px', margin: 0, fontWeight: '500' }}>
                [Venue Name], Dubai
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '4px 0 0 0' }}>
                February 15, 2025 · 6:00 PM GST
              </p>
            </div>
          </div>
        </div>
        
        {/* Social Proof Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0,0,0,0.3)',
          padding: '16px 40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            Part of a global series endorsed by:
          </span>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
            Lord Darzi, WISH
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
            UTHealth Houston
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            150+ applied for 25 seats in Doha
          </span>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE QUESTION SECTION */}
      {/* ============================================ */}
      <section style={{
        background: colors.cream,
        padding: '120px 40px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <SectionLabel>The Question</SectionLabel>
          
          <SectionTitle>
            This isn't a debate.<br />It's a civic reckoning.
          </SectionTitle>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginTop: '48px',
          }}>
            <div>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#444',
                margin: 0,
              }}>
                AI is already transforming work. Not in theory—in practice. Automating tasks, augmenting decisions, replacing roles. But the conversation about what this means for society is fragmented, polarized, and stuck.
              </p>
            </div>
            
            <div>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#444',
                margin: '0 0 24px 0',
              }}>
                In 60 minutes, 25 people from different sectors will grapple with:
              </p>
              
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {[
                  'What jobs are actually at risk—and which aren\'t?',
                  'Who benefits from AI automation—and who\'s left behind?',
                  'What should governments, companies, and individuals do now?',
                ].map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '16px',
                    color: colors.civicNavy,
                  }}>
                    <span style={{ 
                      color: colors.signalTeal, 
                      fontWeight: '700',
                      fontSize: '18px',
                    }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div style={{
            marginTop: '60px',
            padding: '32px 40px',
            background: 'white',
            borderRadius: '16px',
            borderLeft: `4px solid ${colors.insightGold}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '24px',
              fontStyle: 'italic',
              color: colors.civicNavy,
              margin: 0,
              lineHeight: '1.5',
            }}>
              "You can't regulate what you don't understand. And you can't understand what you haven't discussed—together."
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHAT IS AI TOWNSQUARE */}
      {/* ============================================ */}
      <section id="about" style={{
        background: 'white',
        padding: '120px 40px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionLabel>What Is AI TownSquare</SectionLabel>
            <SectionTitle>
              A civic protocol that turns<br />dialogue into public insight.
            </SectionTitle>
            <p style={{
              fontSize: '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}>
              Not a panel. Not a webinar. A structured format designed to produce clarity from complexity—in one hour.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '64px',
          }}>
            {[
              { number: '25', label: 'Curated Participants', desc: 'Builders, users, regulators, citizens' },
              { number: '60', label: 'Minutes', desc: 'Structured, facilitated dialogue' },
              { number: '7', label: 'Protocol Phases', desc: 'Prime to Capture' },
              { number: '48', label: 'Hour Civic Brief', desc: 'Published public record' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '32px',
                background: colors.offWhite,
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'transform 0.2s',
              }}>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '48px',
                  fontWeight: '700',
                  color: colors.signalTeal,
                  margin: '0 0 8px 0',
                  lineHeight: 1,
                }}>
                  {item.number}
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: colors.civicNavy,
                  margin: '0 0 4px 0',
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#888',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          {/* Protocol Timeline */}
          <div id="protocol" style={{
            background: colors.civicNavy,
            borderRadius: '24px',
            padding: '48px',
          }}>
            <p style={{ 
              color: colors.insightGold, 
              fontSize: '12px', 
              letterSpacing: '2px', 
              textTransform: 'uppercase',
              marginBottom: '24px',
              fontWeight: '600',
            }}>
              The 7-Phase Protocol
            </p>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '16px',
            }}>
              {[
                { phase: '1', name: 'Prime', desc: 'Frame the question' },
                { phase: '2', name: 'Complicate', desc: 'Add nuance' },
                { phase: '3', name: 'Position', desc: 'Host models thinking' },
                { phase: '4', name: 'Breakout', desc: 'Small groups explore', highlight: true },
                { phase: '5', name: 'Shareback', desc: 'Surface insights' },
                { phase: '6', name: 'Synthesize', desc: 'Extract themes' },
                { phase: '7', name: 'Capture', desc: 'Publish brief', highlight: true },
              ].map((item, i) => (
                <div key={i} style={{
                  flex: '0 0 140px',
                  padding: '20px',
                  background: item.highlight ? `${colors.signalTeal}22` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${item.highlight ? colors.signalTeal : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    color: colors.signalTeal,
                    fontSize: '12px',
                    fontWeight: '600',
                    margin: '0 0 8px 0',
                  }}>
                    Phase {item.phase}
                  </p>
                  <p style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 4px 0',
                  }}>
                    {item.name}
                  </p>
                  <p style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '12px',
                    margin: 0,
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              marginTop: '24px',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              The protocol is the product. It works regardless of who hosts, where it runs, or what the topic is.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON TABLE */}
      {/* ============================================ */}
      <section style={{
        background: colors.offWhite,
        padding: '120px 40px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionLabel>Why This Is Different</SectionLabel>
            <SectionTitle>
              Structure over spectacle.
            </SectionTitle>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: colors.civicNavy }}>
                  <th style={{ padding: '20px 24px', textAlign: 'left', color: 'white', fontWeight: '600', width: '30%' }}></th>
                  <th style={{ padding: '20px 24px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontWeight: '500' }}>Traditional Events</th>
                  <th style={{ padding: '20px 24px', textAlign: 'left', color: colors.signalTeal, fontWeight: '600' }}>AI TownSquare</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: 'Voice', traditional: 'One speaker to many listeners', townsquare: 'Many-to-many dialogue' },
                  { aspect: 'Structure', traditional: 'Ad hoc or chaotic', townsquare: '7-phase protocol' },
                  { aspect: 'Output', traditional: 'Video no one watches', townsquare: 'Civic Brief in 48 hours' },
                  { aspect: 'Participants', traditional: 'Passive audience', townsquare: 'Curated contributors' },
                  { aspect: 'Purpose', traditional: 'Brand & performance', townsquare: 'Collective readiness' },
                  { aspect: 'Scale', traditional: 'Venue-dependent', townsquare: 'Room + Zoom hybrid' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '20px 24px', fontWeight: '600', color: colors.civicNavy }}>{row.aspect}</td>
                    <td style={{ padding: '20px 24px', color: '#888' }}>{row.traditional}</td>
                    <td style={{ padding: '20px 24px', color: colors.civicNavy, fontWeight: '500' }}>{row.townsquare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE OUTPUT SECTION */}
      {/* ============================================ */}
      <section style={{
        background: 'white',
        padding: '120px 40px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}>
            <div>
              <SectionLabel>The Output</SectionLabel>
              <SectionTitle>
                Your voice becomes<br />civic intelligence.
              </SectionTitle>
              
              <p style={{
                fontSize: '18px',
                color: '#666',
                lineHeight: '1.8',
                margin: '0 0 32px 0',
              }}>
                Within 48 hours of every session, we publish a Civic Brief—a distilled document capturing what real people said, the tensions surfaced, and actionable signals for policymakers.
              </p>
              
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {[
                  'Key themes from the dialogue',
                  'Direct quotes from participants',
                  'Tensions and trade-offs identified',
                  'Signals for the Societal Readiness Index',
                ].map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '16px',
                    color: colors.civicNavy,
                  }}>
                    <span style={{ 
                      width: '24px',
                      height: '24px',
                      background: `${colors.signalTeal}22`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.signalTeal,
                      fontSize: '14px',
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Civic Brief Preview */}
            <div style={{
              background: colors.offWhite,
              borderRadius: '20px',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '40px',
                background: colors.signalTeal,
                color: 'white',
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: '600',
              }}>
                Sample Output
              </div>
              
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '32px',
                border: '1px solid #eee',
              }}>
                <p style={{ 
                  color: colors.signalTeal, 
                  fontSize: '11px', 
                  letterSpacing: '1px', 
                  textTransform: 'uppercase',
                  margin: '0 0 8px 0',
                }}>
                  Civic Brief
                </p>
                <h4 style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '22px',
                  margin: '0 0 8px 0',
                  color: colors.civicNavy,
                }}>
                  AI Is Going to Take Our Jobs
                </h4>
                <p style={{ fontSize: '13px', color: '#888', margin: '0 0 24px 0' }}>
                  Dubai · February 2025 · 25 Participants
                </p>
                
                <div style={{ 
                  borderTop: '1px solid #eee', 
                  paddingTop: '20px',
                  marginTop: '20px',
                }}>
                  <p style={{ fontSize: '13px', color: '#888', margin: '0 0 8px 0', fontWeight: '600' }}>
                    Key Theme:
                  </p>
                  <p style={{ fontSize: '14px', color: colors.civicNavy, margin: 0, lineHeight: '1.6' }}>
                    "Participants distinguished between AI replacing tasks vs. replacing jobs. Consensus: the framing itself is misleading..."
                  </p>
                </div>
                
                <div style={{ 
                  background: colors.offWhite,
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '20px',
                  borderLeft: `3px solid ${colors.insightGold}`,
                }}>
                  <p style={{ 
                    fontSize: '14px', 
                    fontStyle: 'italic', 
                    color: colors.civicNavy,
                    margin: 0,
                  }}>
                    "The question isn't whether AI takes jobs—it's whether we've prepared workers for what comes next."
                  </p>
                  <p style={{ fontSize: '12px', color: '#888', margin: '8px 0 0 0' }}>
                    — HR Director, Dubai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE SYSTEM SECTION */}
      {/* ============================================ */}
      <section style={{
        background: colors.civicNavy,
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.signalTeal}11 0%, transparent 70%)`,
          borderRadius: '50%',
        }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionLabel light>The Bigger Picture</SectionLabel>
            <SectionTitle light>
              This session feeds a global<br />accountability system.
            </SectionTitle>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}>
              AI TownSquare isn't a standalone event. It's part of a self-correcting civic infrastructure.
            </p>
          </div>
          
          {/* System Flow */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
          }}>
            {[
              { 
                icon: '💬', 
                title: 'AI TownSquare', 
                desc: 'Generates civic data on AI readiness through structured dialogue',
                color: colors.signalTeal,
              },
              { 
                icon: '📊', 
                title: 'Societal Readiness Index', 
                desc: 'Six-pillar benchmark measuring how prepared societies are for AI',
                color: colors.insightGold,
              },
              { 
                icon: '⏱️', 
                title: 'Readiness Gap Clock', 
                desc: 'Public clock tracking time since last verified readiness improvement',
                color: '#E74C3C',
              },
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `2px solid ${item.color}`,
                  borderRadius: '16px',
                  padding: '32px 40px',
                  width: '100%',
                  maxWidth: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                }}>
                  <span style={{ fontSize: '32px' }}>{item.icon}</span>
                  <div>
                    <p style={{ 
                      color: item.color, 
                      fontWeight: '700', 
                      fontSize: '18px',
                      margin: '0 0 4px 0',
                    }}>
                      {item.title}
                    </p>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.6)', 
                      fontSize: '14px',
                      margin: 0,
                      lineHeight: '1.5',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < 2 && (
                  <div style={{ 
                    width: '2px', 
                    height: '32px', 
                    background: 'rgba(255,255,255,0.2)',
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '48px',
            fontStyle: 'italic',
          }}>
            Each session makes the system smarter. Your voice contributes to resetting the clock.
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* ENDORSEMENTS SECTION */}
      {/* ============================================ */}
      <section style={{
        background: colors.cream,
        padding: '120px 40px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionLabel>Global Validation</SectionLabel>
            <SectionTitle>
              Endorsed by leaders who<br />understand the stakes.
            </SectionTitle>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}>
            {[
              { 
                quote: "I will advocate for this myself!", 
                name: "Lord Darzi", 
                title: "Executive Chair",
                org: "World Innovation Summit for Health (WISH)",
              },
              { 
                quote: "Incredibly well done and needed.", 
                name: "Dr. Jagat Narula", 
                title: "EVP & Chief Academic Officer",
                org: "UTHealth Houston",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
                display: 'flex',
                gap: '24px',
              }}>
                {/* Photo placeholder */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: colors.offWhite,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ccc',
                  fontSize: '12px',
                }}>
                  Photo
                </div>
                
                <div>
                  <p style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '22px',
                    fontStyle: 'italic',
                    color: colors.civicNavy,
                    margin: '0 0 20px 0',
                    lineHeight: '1.4',
                  }}>
                    "{item.quote}"
                  </p>
                  <p style={{ 
                    fontWeight: '700', 
                    color: colors.civicNavy,
                    margin: '0 0 4px 0',
                    fontSize: '16px',
                  }}>
                    {item.name}
                  </p>
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#888', 
                    margin: 0,
                    lineHeight: '1.4',
                  }}>
                    {item.title}<br />{item.org}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Doha Stats */}
          <div style={{
            marginTop: '48px',
            background: colors.civicNavy,
            borderRadius: '20px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '64px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '48px',
                fontWeight: '700',
                color: colors.signalTeal,
                margin: 0,
              }}>
                150+
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '8px 0 0 0' }}>
                Registered for Doha
              </p>
            </div>
            <div style={{ 
              width: '1px', 
              height: '60px', 
              background: 'rgba(255,255,255,0.2)',
            }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '48px',
                fontWeight: '700',
                color: colors.insightGold,
                margin: 0,
              }}>
                25
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '8px 0 0 0' }}>
                Seats Available
              </p>
            </div>
            <div style={{ 
              width: '1px', 
              height: '60px', 
              background: 'rgba(255,255,255,0.2)',
            }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '48px',
                fontWeight: '700',
                color: 'white',
                margin: 0,
              }}>
                48h
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '8px 0 0 0' }}>
                To Published Brief
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOST SECTION */}
      {/* ============================================ */}
      <section id="host" style={{
        background: 'white',
        padding: '120px 40px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            {/* Host Photo */}
            <div style={{
              aspectRatio: '3/4',
              background: `linear-gradient(135deg, ${colors.offWhite}, ${colors.concrete})`,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#aaa',
              fontSize: '14px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: `linear-gradient(to top, ${colors.civicNavy}88, transparent)`,
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Host Photo</span>
            </div>
            
            {/* Host Info */}
            <div>
              <SectionLabel>Your Host</SectionLabel>
              
              <h3 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '42px',
                fontWeight: '700',
                color: colors.civicNavy,
                margin: '0 0 8px 0',
              }}>
                [Host Name]
              </h3>
              
              <p style={{
                color: colors.signalTeal,
                fontSize: '18px',
                fontWeight: '500',
                margin: '0 0 24px 0',
              }}>
                [Title] · [Organization]
              </p>
              
              <p style={{
                fontSize: '17px',
                color: '#555',
                lineHeight: '1.8',
                margin: '0 0 24px 0',
              }}>
                [3-4 sentence bio about the host. Their background in AI, workforce transformation, technology policy, or related fields. Why they're uniquely qualified to facilitate this dialogue. What perspective they bring.]
              </p>
              
              <p style={{
                fontSize: '17px',
                color: '#555',
                lineHeight: '1.8',
                margin: '0 0 32px 0',
              }}>
                [A sentence about their hosting style or what participants can expect from the session. Something that humanizes them and builds trust.]
              </p>
              
              <div style={{
                display: 'flex',
                gap: '16px',
              }}>
                <a href="#" style={{
                  padding: '12px 20px',
                  background: colors.offWhite,
                  borderRadius: '8px',
                  color: colors.civicNavy,
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                }}>
                  LinkedIn ↗
                </a>
                <a href="#" style={{
                  padding: '12px 20px',
                  background: colors.offWhite,
                  borderRadius: '8px',
                  color: colors.civicNavy,
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                }}>
                  Website ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* REGISTRATION SECTION */}
      {/* ============================================ */}
      <section id="apply" style={{
        background: `linear-gradient(165deg, ${colors.civicNavy} 0%, ${colors.navyLight} 100%)`,
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${colors.signalTeal}22 0%, transparent 70%)`,
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${colors.insightGold}22 0%, transparent 70%)`,
          borderRadius: '50%',
        }} />
        
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel light>Apply Now</SectionLabel>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 16px 0',
              lineHeight: '1.2',
            }}>
              Claim Your Seat at<br />
              <span style={{ color: colors.insightGold }}>AI TownSquare Dubai</span>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '18px',
              margin: 0,
            }}>
              25 seats. Curated for cross-sector diversity.
            </p>
          </div>
          
          {/* Registration Form */}
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '24px',
            padding: '48px',
          }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontWeight: '500',
                }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontWeight: '500',
                }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontWeight: '500',
                }}>
                  Organization / Role *
                </label>
                <input 
                  type="text" 
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontWeight: '500',
                }}>
                  I am a... *
                </label>
                <select 
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="" style={{ background: colors.civicNavy }}>Select your role</option>
                  <option value="builder" style={{ background: colors.civicNavy }}>Builder (tech, AI, product)</option>
                  <option value="user" style={{ background: colors.civicNavy }}>User (business, operations)</option>
                  <option value="regulator" style={{ background: colors.civicNavy }}>Regulator (policy, government)</option>
                  <option value="academic" style={{ background: colors.civicNavy }}>Academic (research, education)</option>
                  <option value="citizen" style={{ background: colors.civicNavy }}>Citizen (general public)</option>
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '13px',
                  marginBottom: '8px',
                  fontWeight: '500',
                }}>
                  Why does this topic matter to you? *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="1-2 sentences about your perspective or stake in this question"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: colors.signalTeal,
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: `0 4px 20px ${colors.signalTeal}44`,
                }}
              >
                Submit Application →
              </button>
            </form>
            
            <p style={{ 
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '13px', 
              textAlign: 'center',
              marginTop: '24px',
              lineHeight: '1.6',
            }}>
              We curate for diversity across sectors, roles, and perspectives.<br />
              You'll hear back within 48 hours.
            </p>
          </div>
          
          {/* Event Details */}
          <div style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}>
            {[
              { icon: '📅', label: 'Date', value: 'February 15, 2025' },
              { icon: '🕕', label: 'Time', value: '6:00 PM GST' },
              { icon: '📍', label: 'Venue', value: '[Venue], Dubai' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <p style={{ 
                  color: 'rgba(255,255,255,0.5)', 
                  fontSize: '12px', 
                  margin: '8px 0 4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {item.label}
                </p>
                <p style={{ color: 'white', fontSize: '15px', margin: 0, fontWeight: '500' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer style={{
        background: colors.civicNavy,
        padding: '64px 40px 40px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: colors.signalTeal,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>AI</span>
                </div>
                <span style={{ 
                  color: 'white', 
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '20px',
                  fontWeight: '600',
                }}>
                  TownSquare
                </span>
              </div>
              <p style={{ 
                color: colors.signalTeal, 
                fontSize: '15px',
                margin: '0 0 16px 0',
                fontStyle: 'italic',
              }}>
                Global in Voice. Local in Presence. Civic by Design.
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px',
                lineHeight: '1.7',
                margin: 0,
              }}>
                A civic protocol for structured dialogue on AI's most pressing questions.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <p style={{ 
                color: 'white', 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '16px',
              }}>
                Platform
              </p>
              {['About', 'Protocol', 'Civic Briefs', 'SRI'].map((item, i) => (
                <a key={i} href="#" style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}>
                  {item}
                </a>
              ))}
            </div>
            
            <div>
              <p style={{ 
                color: 'white', 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '16px',
              }}>
                Get Involved
              </p>
              {['Apply to Attend', 'Become a Host', 'Partner With Us', 'Sponsor'].map((item, i) => (
                <a key={i} href="#" style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}>
                  {item}
                </a>
              ))}
            </div>
            
            <div>
              <p style={{ 
                color: 'white', 
                fontSize: '14px', 
                fontWeight: '600',
                marginBottom: '16px',
              }}>
                Connect
              </p>
              {['LinkedIn', 'Twitter/X', 'Contact'].map((item, i) => (
                <a key={i} href="#" style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* Bottom */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
              © 2025 AI TownSquare · Part of SafeHaven
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
              aitownsquare.org
            </p>
          </div>
        </div>
      </footer>
      
      {/* Pulse Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
    </div>
  );
}
