import React from 'react'
import appwriteService from "../appwrite/config"

function PostCard({ title, featuredimage }) {
  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
      {featuredimage && (
        <img
          src={appwriteService.getFilePreview(featuredimage).href}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <h2 className="p-3 text-white font-semibold">{title}</h2>
    </div>
  )
}

export default PostCard
