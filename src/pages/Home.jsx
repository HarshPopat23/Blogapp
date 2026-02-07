import React, { useState, useEffect } from 'react'
import { Container, Button, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { ShieldCheck, Zap, Globe, Layout } from 'lucide-react'
import styles from './Home.module.css'

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

  const features = [
    {
      icon: "🤖",
      title: "AI Doubt Solver Bot",
      desc: "Get instant answers to your academic questions with our intelligent AI assistant. Available 24/7 to help you learn.",
      tags: ["Instant responses", "Multi-subject support", "Context-aware answers"]
    },
    {
      icon: "📖",
      title: "Resource Library",
      desc: "Access a comprehensive collection of educational materials including videos, PDFs, and images all in one place.",
      tags: ["Curated content", "Easy navigation", "Offline access"]
    },
    {
      icon: "🏆",
      title: "Smart Quizzes",
      desc: "Test your knowledge with topic-wise quizzes featuring instant feedback and detailed explanations.",
      tags: ["Adaptive difficulty", "Progress tracking", "Detailed analytics"]
    },
    {
      icon: "📊",
      title: "Personal Dashboard",
      desc: "Track your learning progress, view recommendations, and manage your educational journey effectively.",
      tags: ["Progress insights", "Study recommendations", "Goal tracking"]
    }
  ]
    if (authStatus === false) {
        return (
            <div className={styles.homeWrapper}>
      
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.badge}>✨ AI-Powered Learning Platform</div>
            <h1 className={styles.title}>
              Learn Smarter with <span className={styles.highlight}>AI-Powered</span> Education
            </h1>
            <p className={styles.description}>
              Get instant answers with our AI bot, access curated learning resources, 
              take interactive quizzes, and track your progress — all in one personalized platform.
            </p>
            <div className={styles.btnGroup}>
              <button className={styles.primaryBtn} onClick={() => navigate('/signup')}>
                Get Started →
              </button>
              <button className={styles.secondaryBtn} onClick={() => navigate('/features')}>
                ▷ Explore Features
              </button>
            </div>
          </div>
        </Container>
      </section>

    

  
      <section className={styles.featuresSection} id="features">
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Everything You Need To <span className={styles.highlight}>Excel</span>
            </h2>
            <p className={styles.sectionDesc}>
              Our platform combines AI technology with comprehensive learning resources to create the ultimate educational experience.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((f, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.cardIcon}>{f.icon}</div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
                <div className={styles.tagGroup}>
                  {f.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      
      <section className={styles.aiTutorSection}>
        <Container>
          <div className={styles.aiTutorContainer}>
          
            <div className={styles.chatBoxWrapper}>
              <div className={styles.chatHeader}>
                <div className={styles.botIcon}>🤖</div>
                <div>
                  <h4 className={styles.botName}>EduSpark AI</h4>
                  <span className={styles.onlineStatus}>🟢 Online</span>
                </div>
              </div>
              <div className={styles.chatBody}>
                <div className={styles.botMessage}>
                  Hi! I'm your AI learning assistant. Ask me anything about your studies!
                </div>
              </div>
              <div className={styles.chatInputArea}>
                <div className={styles.mockInput}>Ask anything...</div>
                <button className={styles.sendIcon}>✈️</button>
              </div>
            </div>

            
            <div className={styles.aiTutorContent}>
              <div className={styles.miniBadge}>AI Assistant</div>
              <h2 className={styles.aiTitle}>Your Personal <span className={styles.aiHighlight}>AI Tutor</span></h2>
              <p className={styles.aiDesc}>
                Get instant help with any academic question. Our AI assistant understands context, 
                provides step-by-step explanations, and adapts to your learning style.
              </p>
              
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.fIcon}>⚡</div>
                  <div>
                    <strong>Instant Answers</strong>
                    <p>Get help in seconds</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.fIcon}>🛡️</div>
                  <div>
                    <strong>Accurate Info</strong>
                    <p>Verified content</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.fIcon}>🕒</div>
                  <div>
                    <strong>24/7 Available</strong>
                    <p>Learn anytime</p>
                  </div>
                </div>
              </div>
              <button className={styles.aiTryBtn}>✨ Try AI Bot Free</button>
            </div>
          </div>
        </Container>
      </section>
    </div>
    )
}
}
export default Home

