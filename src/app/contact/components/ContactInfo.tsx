export default function ContactInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
      
      <div className="space-y-6">
        <p className="text-gray-700">
          Your satisfaction is always our priority.
        </p>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <p className="text-gray-800 font-medium mb-2">
            For complaints regarding orders, contact: <span className="font-bold">14045</span>.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">Consumer Complaint Services</h3>
          <p className="text-gray-700 mb-4">
            Directorate General of Consumer Protection and Trade Compliance<br />
            Ministry of Trade of the Republic of Indonesia<br />
            Building I, 3rd Floor, Jl. M.I Ridwan Rais No.5, Jakarta
          </p>
          
          <div className="space-y-1">
            <div className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span className="text-gray-700">Phone: +62-21-3858171 / 3451692</span>
            </div>
            <div className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span className="text-gray-700">WhatsApp: 0853 1111 1010</span>
            </div>
            <div className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span className="text-gray-700">Email: pengaduan.konsumen@kemendag.go.id</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700">
          For further inquiries, please feel free to contact us using the form below. We will get back to you as soon as possible.
        </p>
      </div>
    </div>
  )
}