import EventCard, { EventCardProps } from './EventCard'

type EventGalleryProps = {
  events: EventCardProps[]
}

export default function EventGallery({ events }: EventGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
      {events.map((event, index) => {
        // Create a masonry effect by making some cards span 2 rows
        const spanClass = index % 5 === 0 || index % 7 === 0 ? 'row-span-2' : ''
        
        // Create a masonry effect by making some cards span 2 columns on larger screens
        const colSpanClass = index % 8 === 0 ? 'sm:col-span-2' : ''
        
        return (
          <div key={event.id} className={`${spanClass} ${colSpanClass}`}>
            <EventCard {...event} />
          </div>
        )
      })}
    </div>
  )
}