import Image from 'next/image'
import Link from 'next/link'
import LikeButton from './LikeButton'

export type EventCardProps = {
  id: string
  title: string
  date: string
  imageUrl: string
  //pictureCount: number
  likes: number
}

export default function EventCard({ id, title, date, imageUrl, likes }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/event/${id}`} className="block group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 -mt-2">
        <LikeButton initialLikes={likes} />
      </div>
    </div>
  )
}