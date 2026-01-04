// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
// import {Container, PostCard} from '../components'

// function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
                       
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home
import React, { useState, useEffect } from 'react'
import { Container, Button, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { ShieldCheck, Zap, Globe, Layout } from 'lucide-react'

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
        { icon: <Zap className="text-yellow-500" />, title: "Lightning Fast", desc: "Powered by React for a lag-free experience." },
        { icon: <ShieldCheck className="text-green-500" />, title: "Secure & Private", desc: "Your data is protected by Appwrite security." },
        { icon: <Layout className="text-blue-500" />, title: "Minimalist Editor", desc: "Focus purely on your thoughts." },
        { icon: <Globe className="text-purple-500" />, title: "Global Reach", desc: "Connect with readers worldwide." }
    ]
    if (authStatus === false) {
        return (
            <div className="w-full">
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
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                        Welcome to <span className="font-bold text-gray-900 italic">Blog.io</span>, the ultimate minimalist blogging sanctuary. In a world cluttered with digital noise, we provide you with a high-performance, distraction-free environment. 
                                        <br /><br />
                                        Leveraging the speed of <span className="text-blue-600 font-semibold">React</span> and the security of <span className="text-pink-500 font-semibold">Appwrite</span>, start building your digital legacy today.
                                    </p>
                                </div>
                                
                                <Button onClick={() => navigate('/signup')} className="px-10 py-4 text-xl font-bold shadow-lg hover:-translate-y-1 transition-all">
                                    Get Started Free
                                </Button>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                                    {features.map((feature, index) => (
                                        <div key={index} className="p-6 bg-white/90 rounded-2xl shadow-xl backdrop-blur-sm">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">{feature.icon}</div>
                                            <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        )
    }

   
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home