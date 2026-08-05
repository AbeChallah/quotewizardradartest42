import { useState, useEffect, useCallback, useMemo } from 'react'
import { Zap, Check, Wifi, Clock, TrendingUp, BarChart3, FileText, LayoutDashboard, Users, Calendar, LogOut, Bell, Search, Plus, ChevronDown, ChevronUp, ExternalLink, Target, Sparkles, Menu, X, CheckCircle2, AlertCircle, Loader } from 'lucide-react'

const BASE = window.__BACKEND_URL__ || ''

async function apiFetch(path, opts = {}) {
  const BASE = window.__BACKEND_URL__ || '';
  for (let i = 0; i < 5; i++) {
    try {
      const r = await fetch(BASE + path, opts);
      if (r.ok) return r.json();
    } catch (_) {}
    await new Promise(r => setTimeout(r, 1500));
  }
  return null;
}

function LandingPage({ onGetStarted, onLogin }) {
  const [visible, setVisible] = useState({})
  
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `

      * { font-family: 'DM Sans', sans-serif; }
      h1, h2, h3, h4 { font-family: 'Sora', sans-serif; }
      .fade-up { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
      .fade-up.show { opacity: 1; transform: translateY(0); }
      .float-btn { transition: all 0.2s ease; }
      .float-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(10, 61, 98, 0.15); }
      @keyframes pulse-glow { 0%,100% {box-shadow: 0 0 20px rgba(243,156,18,0.2);} 50% {box-shadow: 0 0 35px rgba(243,156,18,0.4);} }
    `
    document.head.appendChild(style)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({...v, [e.target.dataset.id]: true})) })
    }, { threshold: 0.15 })
    document.querySelectorAll('[data-id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: <FileText size={28} />, title: 'Smart Form', desc: 'AI-guided intake that adapts questions based on service type, location, and scope.' },
    { icon: <Zap size={28} />, title: 'AI Quote Generation', desc: 'Instantly calculates labor, materials, and margin — then formats a professional PDF.' },
    { icon: <CheckCircle2 size={28} />, title: 'One-Click Acceptance', desc: 'Clients approve with a single click. The job is scheduled automatically with no back-and-forth.' },
    { icon: <Calendar size={28} />, title: 'Job Scheduling', desc: 'Accepted quotes auto-populate your calendar with crew, equipment, and time blocks.' }
  ]

  const testimonials = [
    { name: 'Marcus Johnson', role: 'IT Services Director', company: 'TechFlow Solutions', quote: 'We went from 4-hour quotes to under a minute. 35% more deals closed, period.' },
    { name: 'Sarah Chen', role: 'Owner', company: 'Chen Plumbing Co.', quote: 'The AI catches details I used to miss. My close rate jumped 28% in one month.' },
    { name: 'Roberto Alvarez', role: 'Operations Manager', company: 'GreenScape Landscaping', quote: 'Clients love how fast they get answers. It makes us look like a billion-dollar company.' }
  ]

  return (
    <div className="bg-[#F8F9FA]" style={{ minHeight: '100vh', color: '#0A3D62' }}>
      {/* NAVBAR */}
      <nav className="bg-[#0A3D62]" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="flex items-center gap-3">
            <div style={{ background: '#F39C12', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} color="#fff" fill="#fff" />
            </div>
            <span className="text-white" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20 }}>QuoteWizardRadar</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-white" style={{ opacity: 0.85 }}>Features</a>
            <a href="#pricing" className="text-white" style={{ opacity: 0.85 }}>Pricing</a>
            <button onClick={onLogin} className="float-btn" style={{ background: 'transparent', border: '1px solid #F39C12', color: '#F39C12', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Sign in</button>
            <button onClick={onGetStarted} className="float-btn bg-[#F39C12] text-[#0A3D62]" style={{ padding: '10px 22px', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer', animation: 'pulse-glow 2s infinite' }}>Start Free Trial</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #0A3D62 0%, #0A3D62 60%, #F8F9FA 100%)', padding: '80px 24px 120px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }} className="fade-up show">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(243,156,18,0.15)', border: '1px solid #F39C12', borderRadius: 40, padding: '8px 20px', marginBottom: 32 }}>
            <Sparkles size={18} color="#F39C12" />
            <span style={{ color: '#F39C12', fontSize: 14, fontWeight: 600 }}>New: AI Quote Generation Engine v2</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            AI-Powered Quotes in <span style={{ color: '#F39C12' }}>30 Seconds</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', maxWidth: 700, margin: '0 auto 40px' }}>
            Close 35% more deals with instant, professional quotes. QuoteWizardRadar transforms your smart form into a polished PDF quote — and one click schedules the job.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onGetStarted} className="float-btn bg-[#F39C12] text-[#0A3D62]" style={{ padding: '16px 40px', borderRadius: 12, border: 'none', fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>
              Generate Your First Quote →
            </button>
            <button onClick={onLogin} style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: '#fff', padding: '14px 32px', borderRadius: 12, cursor: 'pointer', fontWeight: 600, fontSize: 16 }}>See How It Works</button>
          </div>
          
          {/* KPI STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ marginTop: 80, maxWidth: 900, margin: '80px auto 0' }}>
            {[
              { icon: <Clock size={18} color="#F39C12" />, value: '30s', label: 'Avg. Quote Generation' },
              { icon: <TrendingUp size={18} color="#F39C12" />, value: '35%', label: 'Increase in Close Rate' },
              { icon: <Wifi size={18} color="#F39C12" />, value: '24/7', label: 'Quote Availability' }
            ].map((stat, i) => (
              <div key={i} className="float-btn" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: 24, backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>{stat.icon}</div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', fontFamily: "'Sora', sans-serif" }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#F8F9FA]" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 className="text-center text-[#0A3D62]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>Built for Speed, Engineered for Precision</h2>
          <p className="text-center" style={{ color: 'rgba(10,61,98,0.7)', fontSize: 18, maxWidth: 800, margin: '0 auto 60px' }}>Everything you need to turn inquiries into scheduled jobs — without the 3-hour quoting marathon.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(features || []).map((f, i) => (
              <div key={i} data-id={`feat-${i}`} className={`fade-up ${visible[`feat-${i}`] ? 'show' : ''} float-btn`} style={{ background: '#fff', border: '1px solid rgba(10,61,98,0.1)', borderRadius: 16, padding: 32, cursor: 'default' }}>
                <div style={{ background: 'rgba(243,156,18,0.12)', borderRadius: 12, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <span style={{ color: '#0A3D62' }}>{f.icon}</span>
                </div>
                <h3 className="text-[#0A3D62]" style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: 'rgba(10,61,98,0.7)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'linear-gradient(180deg, #F8F9FA, #0A3D62)' }} className="bg-[#F8F9FA]">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <h2 className="text-center text-white" style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: 50 }}>Trusted by Service Pros Nationwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(testimonials || []).map((t, i) => (
              <div key={i} className="float-btn" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: 28 }}>
                <div style={{ marginBottom: 16 }}>{'★★★★★'.split('').map((s, j) => <span key={j} style={{ color: '#F39C12' }}>{s}</span>)}</div>
                <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F39C12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0A3D62' }}>{t.name[0]}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: '#0A3D62', padding: '100px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 12 }}>Simple, Flat Pricing</h2>
          <p className="text-white" style={{ opacity: 0.85, fontSize: 18, marginBottom: 50 }}>No per-quote fees. No hidden costs. One plan that does everything.</p>
          <div className="float-btn" style={{ background: 'linear-gradient(135deg, #F39C12, #e08706)', borderRadius: 20, padding: 44, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 20, right: 20, background: '#0A3D62', color: '#F39C12', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>MOST POPULAR</div>
            <div style={{ fontSize: 18, color: '#0A3D62', fontWeight: 600, marginBottom: 8 }}>Pro Plan</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0A3D62', fontFamily: "'Sora', sans-serif" }}>$59<span style={{ fontSize: '1rem', marginLeft: 8 }}>/month</span></div>
            <div style={{ color: '#0A3D62', opacity: 0.8, margin: '20px 0 30px', fontSize: 15 }}>Unlimited quotes · AI generation · Job scheduling included</div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 30, textAlign: 'center' }}>
              {['Unlimited Smart Form quotes', 'AI-powered PDF generation', 'One-click client acceptance', 'Auto job scheduling & calendar', 'Email support · 99.9% uptime SLA'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12, fontSize: 15, color: '#0A3D62' }}>
                  <Check size={18} color="#0A3D62" /> {item}
                </li>
              ))}
            </ul>
            <button onClick={onGetStarted} className="float-btn" style={{ background: '#0A3D62', color: '#fff', border: 'none', padding: '16px 48px', borderRadius: 10, fontWeight: 700, fontSize: 17, cursor: 'pointer', width: '100%', maxWidth: 300 }}>
              Start Free 14-Day Trial
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0A3D62', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <Zap size={18} color="#F39C12" />
            <span style={{ fontWeight: 700, color: '#fff' }}>QuoteWizardRadar</span>
          </div>
          <div style={{ display: 'flex', gap: 30, justifyContent: 'center', marginBottom: 24, fontSize: 14 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Terms</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact</a>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>© 2024 QuoteWizardRadar. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

function ProductApp({ user, onLogout }) {
  const [metrics, setMetrics] = useState({ totalQuotes: 0, avgTime: '--', closeRate: '--' })
  const [quotes, setQuotes] = useState([])
  const [jobs, setJobs] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDir, setSortDir] = useState('desc')
  const [toast, setToast] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ customer: '', email: '', details: '' })
  const [search, setSearch] = useState('')
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch('/api/metrics'),
      apiFetch('/api/quotes'),
      apiFetch('/api/jobs'),
      apiFetch('/api/customers')
    ]).then(([m, q, j, c]) => {
      setMetrics(m || { totalQuotes: 0, avgTime: '--', closeRate: '--' })
      setQuotes(Array.isArray(q) ? q : (q?.quotes ?? []))
      setJobs(Array.isArray(j) ? j : (j?.jobs ?? []))
      setCustomers(Array.isArray(c) ? c : (c?.customers ?? []))
      setLoading(false)
    })
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const sortedQuotes = useMemo(() => {
    const arr = [...(quotes || [])]
    if (search) {
      const s = search.toLowerCase()
      return (arr || []).filter(q => (q.customer || '').toLowerCase().includes(s))
    }
    return arr.sort((a, b) => {
      const va = a[sortField] || ''
      const vb = b[sortField] || ''
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [quotes, sortField, sortDir, search])

  const submitQuote = async (e) => {
    e.preventDefault()
    if (!form.customer || !form.email) return
    const res = await apiFetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res) {
      setQuotes(q => [res, ...(q || [])])
      setForm({ customer: '', email: '', details: '' })
      setFormOpen(false)
      showToast('Quote created successfully!')
    } else {
      showToast('Failed to create quote', 'error')
    }
  }

  const acceptQuote = async (id) => {
    const res = await apiFetch(`/api/quotes/${id}/accept`, { method: 'POST' })
    if (res) {
      setQuotes(qs => (qs || []).map(q => q.id === id ? { ...q, status: 'accepted' } : q))
      showToast(`Quote accepted! Job #${res.jobId} scheduled.`)
      apiFetch('/api/jobs').then(d => setJobs(Array.isArray(d) ? d : (d?.jobs ?? [])))
    }
  }

  const kpis = [
    { label: 'Total Quotes', value: metrics.totalQuotes || 0, icon: <FileText size={18} color="#F39C12" />, bg: 'rgba(243,156,18,0.12)' },
    { label: 'Avg. Generation Time', value: typeof metrics.avgTime === 'string' ? metrics.avgTime : `${Math.round(metrics.avgTime || 0)}s`, icon: <Clock size={18} color="#F39C12" />, bg: 'rgba(243,156,18,0.12)' },
    { label: 'Close Rate', value: `${metrics.closeRate || 0}%`, icon: <TrendingUp size={18} color="#F39C12" />, bg: 'rgba(243,156,18,0.12)' },
    { label: 'Jobs Scheduled', value: (jobs || []).length, icon: <Calendar size={18} color="#F39C12" />, bg: 'rgba(243,156,18,0.12)' }
  ]

  return (
    <div className="bg-[#F8F9FA]" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 999, background: toast.type === 'error' ? '#e74c3c' : '#0A3D62', color: '#fff', padding: '14px 24px', borderRadius: 10, boxShadow: '0 5px 20px rgba(0,0,0,0.15)' }}>
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <nav style={{ background: '#0A3D62', boxShadow: '0 2px 10px rgba(10,61,98,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#F39C12', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#0A3D62" fill="#0A3D62" />
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>QuoteWizardRadar</span>
            <span style={{ background: '#F39C12', color: '#0A3D62', padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>PRO</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative' }}>
              <Bell size={18} color="rgba(255,255,255,0.8)" />
              <span style={{ position: 'absolute', top: -4, right: -4, background: '#F39C12', width: 8, height: 8, borderRadius: '50%' }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>{user.email}</span>
            <button onClick={onLogout} className="flex items-center gap-2" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {showWelcome && (
        <div style={{ background: 'linear-gradient(135deg, #0A3D62, #155a8a)', color: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <strong className="text-[#F39C12]" style={{ fontSize: 15 }}>Welcome, {user.name}!</strong>
            <span style={{ marginLeft: 12, opacity: 0.85, fontSize: 14 }}>Your account is ready. Generate your first quote below.</span>
          </div>
          <button onClick={() => setShowWelcome(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.7 }}><X size={16} /></button>
        </div>
      )}

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: 240, background: '#fff', borderRight: '1px solid rgba(10,61,98,0.1)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
            { id: 'quotes', icon: <FileText size={16} />, label: 'Quotes' },
            { id: 'jobs', icon: <Calendar size={16} />, label: 'Jobs' },
            { id: 'customers', icon: <Users size={16} />, label: 'Customers' }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className="flex items-center gap-3" style={{ background: activeTab === item.id ? '#0A3D62' : 'transparent', color: activeTab === item.id ? '#fff' : '#0A3D62', border: 'none', padding: '12px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 500, fontSize: 14, transition: 'all 0.15s' }}>
              {item.icon} {item.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: 32, background: '#F8F9FA', maxHeight: 'calc(100vh - 73px)', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
              <Loader size={32} color="#0A3D62" className="animate-spin" />
            </div>
          ) : activeTab === 'dashboard' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{ marginBottom: 32 }}>
                {(kpis || []).map((k, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid rgba(10,61,98,0.08)' }}>
                    <div style={{ background: k.bg, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{k.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0A3D62', fontFamily: "'Sora', sans-serif" }}>{k.value}</div>
                    <div style={{ color: 'rgba(10,61,98,0.6)', fontSize: 13 }}>{k.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 className="text-[#0A3D62]" style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Quote Generation Trend</h3>
                  <svg viewBox="0 0 400 180" style={{ width: '100%', height: 'auto' }}>
                    <polygon fill="rgba(10,61,98,0.08)" points="0,140 50,120 100,100 150,85 200,70 250,55 300,40 350,30 400,20 400,180 0,180" />
                    <polyline fill="none" stroke="#0A3D62" strokeWidth="3" points="0,140 50,120 100,100 150,85 200,70 250,55 300,40 350,30 400,20" />
                    <circle cx="400" cy="20" r="4" fill="#F39C12" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>Jan</span>
                    <span style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>Feb</span>
                    <span style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>Mar</span>
                    <span style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>Apr</span>
                    <span style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>May</span>
                  </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 className="text-[#0A3D62]" style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Activity</h3>
                  {sortedQuotes.slice(0, 5).length ? sortedQuotes.slice(0, 5).map(q => (
                    <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A3D62' }}>{q.customer}</div>
                        <div style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>{q.status}</div>
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(10,61,98,0.5)' }}>{q.createdAt}</div>
                    </div>
                  )) : <div style={{ color: 'rgba(10,61,98,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}><AlertCircle size={16} /> No activity yet — create your first quote.</div>}
                </div>
              </div>
            </>
          ) : activeTab === 'quotes' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 className="text-[#0A3D62]" style={{ fontSize: 22, fontWeight: 800 }}>Quotes</h2>
                <button onClick={() => setFormOpen(o => !o)} className="bg-[#F39C12] text-[#0A3D62]" style={{ border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Plus size={16} /> {formOpen ? 'Close' : 'New Quote'}
                </button>
              </div>

              {formOpen && (
                <form onSubmit={submitQuote} style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input required placeholder="Customer name" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(10,61,98,0.2)', fontSize: 14 }} />
                    <input required placeholder="Customer email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(10,61,98,0.2)', fontSize: 14 }} />
                    <input placeholder="Job details" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid rgba(10,61,98,0.2)', fontSize: 14 }} />
                  </div>
                  <button type="submit" className="bg-[#0A3D62] text-white" style={{ padding: '10px 28px', borderRadius: 6, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Generate AI Quote</button>
                </form>
              )}

              <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <Search size={16} color="rgba(10,61,98,0.5)" />
                  <input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: 14, flex: 1 }} />
                </div>
                {sortedQuotes.length ? (
                  <table style={{ width: '100%', fontSize: 14 }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid rgba(10,61,98,0.1)' }}>
                        {['customer', 'status', 'createdAt'].map(f => (
                          <th key={f} onClick={() => { if (sortField === f) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortField(f); setSortDir('asc') } }} style={{ textAlign: 'left', padding: '12px 8px', color: '#0A3D62', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                            {f.charAt(0).toUpperCase() + f.slice(1)} {sortField === f ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
                          </th>
                        ))}
                        <th style={{ textAlign: 'right', padding: '12px 8px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(sortedQuotes || []).map(q => (
                        <tr key={q.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#0A3D62' }}>{q.customer}</td>
                          <td style={{ padding: '12px 8px' }}>
                            <span style={{ background: q.status === 'accepted' ? 'rgba(10,61,98,0.1)' : 'rgba(243,156,18,0.15)', color: q.status === 'accepted' ? '#0A3D62' : '#F39C12', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{q.status || 'pending'}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: 'rgba(10,61,98,0.7)' }}>{q.createdAt}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                            {q.status !== 'accepted' && (
                              <button onClick={() => acceptQuote(q.id)} className="bg-[#F39C12] text-[#0A3D62]" style={{ border: 'none', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                                Accept & Schedule
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(10,61,98,0.5)' }}>
                    <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                    <p style={{ fontSize: 16, marginBottom: 8 }}>No quotes yet</p>
                    <button onClick={() => setFormOpen(true)} style={{ background: 'transparent', border: '1px solid #F39C12', color: '#F39C12', padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Create Your First Quote</button>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'jobs' ? (
            <div>
              <h2 className="text-[#0A3D62]" style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Scheduled Jobs</h2>
              {jobs.length ? (
                <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  {(jobs || []).map(j => (
                    <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0A3D62' }}>{j.customer}</div>
                        <div style={{ fontSize: 13, color: 'rgba(10,61,98,0.6)' }}>{j.scheduledDate} · {j.status}</div>
                      </div>
                      <CheckCircle2 size={20} color="#0A3D62" />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: '#fff', borderRadius: 12, padding: '60px 20px', textAlign: 'center', color: 'rgba(10,61,98,0.5)' }}>
                  <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                  <p>No jobs scheduled yet — accept a quote to auto-schedule.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-[#0A3D62]" style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Customers</h2>
              {customers.length ? (
                <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  {(customers || []).map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(243,156,18,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#F39C12' }}>{c.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0A3D62' }}>{c.name}</div>
                          <div style={{ fontSize: 13, color: 'rgba(10,61,98,0.6)' }}>{c.company}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(10,61,98,0.6)' }}>{c.email}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: '#fff', borderRadius: 12, padding: '60px 20px', textAlign: 'center', color: 'rgba(10,61,98,0.5)' }}>
                  <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                  <p>No customers yet.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function AuthGate({ onAuth, onClose }) {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const _ip = { width: '100%', padding: '11px 13px', margin: '6px 0', borderRadius: 9, border: '1px solid #2a3350', background: '#0b1020', color: '#e6eaf2', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true); setError('');
    const _b = window.__NC_BASE__ || ''; const _s = window.__COMPANY_SLUG__ || '';
    const body = JSON.stringify({ email: form.email, password: form.password, name: form.name });
    const _call = () => fetch(`${_b}/api/c/${_s}/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    try {
      let res; try { res = await _call(); } catch { await new Promise(r => setTimeout(r, 2500)); res = await _call(); }
      const json = await res.json();
      if (!json.ok) { setError(json.error || 'Authentication failed — please try again'); setLoading(false); return; }
      onAuth(json);
    } catch { setError('Connection error — please try again in a moment.'); setLoading(false); }
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,18,.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} style={{ background: '#0f1424', border: '1px solid #232b45', padding: 28, borderRadius: 16, width: 360, maxWidth: '90vw', color: '#e6eaf2' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
        {mode === 'signup' && <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={_ip} />}
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Work email" type="email" required style={_ip} />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (min 6 chars)" type="password" required style={_ip} />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: '6px 0 0' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: 10, padding: '12px', borderRadius: 9, border: 'none', background: loading ? '#4b50b8' : '#6366f1', color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'default' : 'pointer' }}>
          {loading ? '…' : mode === 'signup' ? 'Get started free' : 'Log in'}
        </button>
        <p onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} style={{ marginTop: 14, fontSize: 13, color: '#9aa6bd', cursor: 'pointer', textAlign: 'center' }}>
          {mode === 'signup' ? 'Already have an account? Log in' : 'New here? Create an account'}
        </p>
      </form>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(() => {
    try {
      if (localStorage.getItem('nc_user') && !localStorage.getItem('nc_auth')) localStorage.removeItem('nc_user');
      const a = JSON.parse(localStorage.getItem('nc_auth') || 'null');
      return (a && a.token && a.user && typeof a.user.email === 'string') ? a : null;
    } catch { return null; }
  });
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    if (!auth?.token) return;
    const _b = window.__NC_BASE__ || ''; const _s = window.__COMPANY_SLUG__ || '';
    fetch(`${_b}/api/c/${_s}/auth/me`, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(r => r.json()).then(d => { if (!d.ok) { localStorage.removeItem('nc_auth'); setAuth(null); } }).catch(() => {});
  }, []);
  const onAuth = (data) => { localStorage.setItem('nc_auth', JSON.stringify(data)); setAuth(data); setShowAuth(false); };
  const onLogout = () => { localStorage.removeItem('nc_auth'); setAuth(null); };
  if (auth?.user) return <ProductApp user={auth.user} token={auth.token} onLogout={onLogout} />;
  return (
    <>
      <LandingPage onGetStarted={() => setShowAuth(true)} onSignup={() => setShowAuth(true)} onLogin={() => setShowAuth(true)} />
      {/* Fallback entry point (bottom-right so it never overlaps the nav) — guarantees a
          working login even if the landing's own buttons aren't wired to the auth modal. */}
      <button onClick={() => setShowAuth(true)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999, background: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(99,102,241,.45)' }}>Sign in</button>
      {showAuth && <AuthGate onAuth={onAuth} onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default App;
