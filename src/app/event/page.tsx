export const dynamic = 'force-static'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventGallery from './components/EventGallery'
import { EventCardProps } from './components/EventCard'

// Sample event data - in a real app, this could come from an API or CMS
const eventData: EventCardProps[] = [
  {
    id: '1',
    title: 'Wedding Celebration',
    date: 'June 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 24,
    likes: 53
  },
  {
    id: '2',
    title: 'Corporate Dinner',
    date: 'August 3, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    //pictureCount: 18,
    likes: 42
  },
  {
    id: '3',
    title: 'Birthday Party',
    date: 'September 12, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 15,
    likes: 37
  },
  {
    id: '4',
    title: 'Street Art Festival',
    date: 'December 22, 2022',
    imageUrl: 'https://images.unsplash.com/photo-1551913902-c92207136625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 12,
    likes: 53
  },
  {
    id: '5',
    title: 'Food Tasting Event',
    date: 'October 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    //pictureCount: 20,
    likes: 48
  },
  {
    id: '6',
    title: 'Music Concert',
    date: 'July 18, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 30,
    likes: 65
  },
  {
    id: '7',
    title: 'Product Launch',
    date: 'November 8, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1412&q=80',
    //pictureCount: 16,
    likes: 39
  },
  {
    id: '8',
    title: 'Charity Gala',
    date: 'May 25, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    //pictureCount: 22,
    likes: 51
  },
  {
    id: '9',
    title: 'Tech Conference',
    date: 'April 14, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 28,
    likes: 57
  },
  {
    id: '10',
    title: 'Fashion Show',
    date: 'March 30, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
    //pictureCount: 25,
    likes: 62
  },
  {
    id: '11',
    title: 'Art Exhibition',
    date: 'February 12, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 19,
    likes: 45
  },
  {
    id: '12',
    title: 'Sports Tournament',
    date: 'January 20, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    //pictureCount: 32,
    likes: 58
  }
]

export default function EventPage() {
  return (
    <div className="min-h-screen flex flex-col content-body">
      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
      <div className="restaurant-bg text-white py-16 mt-25">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Our Events</h1>
          <p className="text-xl">Explore our gallery of memorable events and celebrations</p>
        </div>
      </div>
      
      {/* Event Gallery */}
      <div className="container mx-auto px-4 py-12">
        <EventGallery events={eventData} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}