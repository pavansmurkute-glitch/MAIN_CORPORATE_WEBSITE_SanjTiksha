import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TradingSection from './components/TradingSection';
import ITSection from './components/ITSection';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [data, setData] = useState({
    hero: null,
    about: null,
    trading: null,
    itservices: null,
    testimonials: null,
    contact: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [heroRes, aboutRes, tradingRes, itservicesRes, testimonialsRes, contactRes] = await Promise.all([
          fetch('/data/hero.json').then(res => res.json()),
          fetch('/data/about.json').then(res => res.json()),
          fetch('/data/trading.json').then(res => res.json()),
          fetch('/data/itservices.json').then(res => res.json()),
          fetch('/data/testimonials.json').then(res => res.json()),
          fetch('/data/contact.json').then(res => res.json())
        ]);

        setData({
          hero: heroRes,
          about: aboutRes,
          trading: tradingRes,
          itservices: itservicesRes,
          testimonials: testimonialsRes,
          contact: contactRes
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load website data. Please refresh the page.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading SanjTiksha...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        color: 'white',
        overflow: 'visible'
      }}>
        <style>{`
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          section {
            overflow: visible !important;
            position: relative;
          }
          
          .container {
            overflow: visible !important;
          }
          
          /* Responsive Grid Layout */
          @media (max-width: 1024px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              padding: 40px 20px !important;
            }
          }
          
          @media (max-width: 768px) {
            section {
              padding: 60px 20px !important;
            }
            
            h1, h2 {
              font-size: 2rem !important;
              line-height: 1.2 !important;
            }
            
            p {
              font-size: 1rem !important;
              line-height: 1.5 !important;
            }
            
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
              padding: 30px 15px !important;
            }
          }
        `}</style>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
              <Route path="/" element={
                <>
                  <Header />
                  <main style={{ position: 'relative' }}>
                    <Hero data={data.hero} />
                    <About data={data.about} />
                    <TradingSection data={data.trading} />
                    <ITSection data={data.itservices} />
                    <Testimonials data={data.testimonials} />
                    <Contact data={data.contact} />
                  </main>
                  <Footer />
                </>
              } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;