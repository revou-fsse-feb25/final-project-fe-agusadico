'use client'

import { useState } from 'react'

type LikeButtonProps = {
  initialLikes: number
}

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking the like button
    
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    
    setIsLiked(!isLiked)
  }

  return (
    <button 
      onClick={handleLike}
      className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <span className={`${isLiked ? "text-red-500" : "text-gray-400"}`}>❤️</span>
      <span>{likes}</span>
    </button>
  )
}