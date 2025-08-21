'use client'

import { useState, useEffect } from 'react'
import { ContactSubmission } from '@/types/contact'

export default function SubmissionList() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' })
  
  // Fetch submissions with pagination and filters
  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      
      if (selectedTopic) {
        params.append('topic', selectedTopic);
      }
      
      if (dateRange.startDate) {
        params.append('startDate', dateRange.startDate);
      }
      
      if (dateRange.endDate) {
        params.append('endDate', dateRange.endDate);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const response = await fetch(`/api/contact/submissions?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }
      
      const data = await response.json();
      setSubmissions(data.submissions);
      setTotalPages(data.totalPages);
      setTotalItems(data.total);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      setError(error.message || 'Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch submissions when page or filters change
  useEffect(() => {
    fetchSubmissions();
  }, [currentPage, selectedTopic, dateRange, searchTerm]);
  
  // Handle view submission details
  const handleViewSubmission = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/submissions/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch submission details');
      }
      
      const data = await response.json();
      setSelectedSubmission(data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error fetching submission details:', error);
    }
  };
  
  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setSubmissionToDelete(id);
    setShowDeleteModal(true);
  };
  
  // Handle actual deletion
  const handleDeleteConfirm = async () => {
    if (!submissionToDelete) return;
    
    try {
      const response = await fetch(`/api/contact/submissions/${submissionToDelete}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }
      
      // Show success message
      setDeleteSuccess(true);
      
      // Hide modals
      setShowDeleteModal(false);
      setSubmissionToDelete(null);
      
      // Refresh submissions
      fetchSubmissions();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchSubmissions();
  };
  
  // Handle filter changes
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Message Submissions</h3>
      
      {/* Success Message */}
      {deleteSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Submission deleted successfully!
        </div>
      )}
      
      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Topic
          </label>
          <select
            id="topic"
            value={selectedTopic}
            onChange={handleTopicChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Topics</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="birthday">Birthday Party</option>
            <option value="gathering">Gathering</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="franchise">Franchise</option>
            <option value="question">Question</option>
            <option value="others">Others</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Submissions Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      ) : submissions.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No submissions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {submission.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {submission.topic}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(submission.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewSubmission(submission.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteClick(submission.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && submissions.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(currentPage * 10, totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Submission Detail Modal */}
      {showDetailModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Message Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="mt-1">{selectedSubmission.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Topic</p>
                    <p className="mt-1">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {selectedSubmission.topic}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1">{selectedSubmission.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submitted Date</p>
                    <p className="mt-1">{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <div className="mt-1 p-4 bg-gray-50 rounded-md">
                    {selectedSubmission.message}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-gray-700 mb-6">Are you sure you want to delete this submission? This action cannot be undone.</p>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}