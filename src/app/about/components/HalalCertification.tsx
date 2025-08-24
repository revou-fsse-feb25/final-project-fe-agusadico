export default function HalalCertification() {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
          <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold dark:text-white">Certified Halal</h3>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300">
        We are proud to announce that all our restaurants have received Halal certification from the Islamic Food and Nutrition Council. This certification ensures that our food preparation methods and ingredients comply with Islamic dietary laws.
      </p>
      
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <h4 className="font-bold mb-2 dark:text-white">Our Commitment</h4>
        <p className="text-gray-700 dark:text-gray-300">
          We are committed to maintaining the highest standards of Halal compliance in all our restaurants. Our staff undergoes regular training to ensure proper food handling and preparation according to Halal guidelines.
        </p>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300">
          Certificate Number: HAL-12345-ID<br />
          Valid Until: December 31, 2024
        </p>
      </div>
    </div>
  )
}