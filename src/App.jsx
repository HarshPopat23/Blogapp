import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container,Button } from './components/index'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>

         {/* <div className="w-full">
            <section 
                className="relative py-20 md:py-32 overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop')` }}
            >
             
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>

                <Container>
                    <div className="relative z-10 flex flex-wrap justify-center text-center">
                        <div className="w-full lg:w-10/12 px-4">
                            <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
                                Unleash Your Voice: <span className="text-blue-600">Write & Inspire</span>
                            </h1>

                            <div className="bg-white/60 p-8 md:p-12 rounded-4xl shadow-2xl border border-white/50 backdrop-blur-md mb-12">
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify md:text-center">
                                    Welcome to <span className="font-bold text-gray-900 italic">Blog.io</span>, the ultimate minimalist blogging sanctuary designed for modern storytellers, independent journalists, and creative thinkers. In a world cluttered with digital noise, we provide you with a high-performance, distraction-free environment where your ideas remain the sole focus. 
                                    <br /><br />
                                    Leveraging the speed of <span className="text-blue-600 font-semibold">React</span> and the rock-solid security of <span className="text-pink-500 font-semibold">Appwrite</span>, 
                                    our platform ensures that your content is not just published, but protected and optimized for global reach. Whether you are here to document your personal journey, share technical expertise, or explore fresh perspectives, you've found the perfect home. Start building your digital legacy today—publish beautifully formatted articles and connect with readers who are looking for exactly what you have to say.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button 
                                    onClick={() => navigate('/signup')}
                                    className="px-10 py-4 text-xl font-bold shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Get Started Free
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
         </div>    */}


         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App