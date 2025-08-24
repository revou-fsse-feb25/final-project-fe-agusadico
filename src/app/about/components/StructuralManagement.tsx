export default function StructuralManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-3 flex items-center justify-center">
            <span className="text-4xl">👨‍💼</span>
          </div>
          <h4 className="font-bold dark:text-white">Agus Adi</h4>
          <p className="text-gray-600 dark:text-gray-300">Chief Executive Officer</p>
        </div>
        
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-3 flex items-center justify-center">
            <span className="text-4xl">👩‍💼</span>
          </div>
          <h4 className="font-bold dark:text-white">Dadang Smith</h4>
          <p className="text-gray-600 dark:text-gray-300">Chief Operations Officer</p>
        </div>
        
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-3 flex items-center justify-center">
            <span className="text-4xl">👨‍🍳</span>
          </div>
          <h4 className="font-bold dark:text-white">Dudung Johnson</h4>
          <p className="text-gray-600 dark:text-gray-300">Executive Chef</p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">
          Our management team brings over 50 years of combined experience in the restaurant industry, ensuring the highest standards of quality and service.
        </p>
      </div>
    </div>
  )
}