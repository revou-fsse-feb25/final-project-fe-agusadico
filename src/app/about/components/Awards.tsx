export default function Awards() {
  const awards = [
    { year: 2023, title: "Best Pizza Restaurant", organization: "Food Critics Association" },
    { year: 2022, title: "Excellence in Customer Service", organization: "Restaurant Guild" },
    { year: 2021, title: "Most Innovative Menu", organization: "Culinary Innovation Awards" },
    { year: 2020, title: "Best Family Restaurant", organization: "Community Choice Awards" },
  ]
  
  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        We're proud to have been recognized for our commitment to excellence in food quality and customer service.
      </p>
      
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 mr-4">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold dark:text-white">{award.title} ({award.year})</h4>
              <p className="text-gray-600 dark:text-gray-300">{award.organization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}