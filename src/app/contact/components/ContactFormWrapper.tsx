'use client'

import ContactForm from './ContactForm'

export default function ContactFormWrapper() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
      <ContactForm />
    </div>
  )
}