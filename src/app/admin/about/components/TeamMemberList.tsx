'use client'

import { useState, useEffect } from 'react'
import { TeamMember } from '../../../../types/about'
import TeamMemberForm from './TeamMemberForm'

export default function TeamMemberList() {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/about');
      
      if (!response.ok) {
        throw new Error('Failed to fetch about content');
      }
      
      const data = await response.json();
      setTeamMembers(data.teamMembers || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setActionError('Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    setActionSuccess('Team member added successfully');
    fetchTeamMembers();
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setActionSuccess('');
    }, 3000);
  };

  const handleEditSuccess = () => {
    setEditingMember(null);
    setActionSuccess('Team member updated successfully');
    fetchTeamMembers();
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setActionSuccess('');
    }, 3000);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/about/team-members/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete team member');
      }
      
      setActionSuccess('Team member deleted successfully');
      setDeleteConfirm(null);
      fetchTeamMembers();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setActionSuccess('');
      }, 3000);
    } catch (error: any) {
      console.error('Error deleting team member:', error);
      setActionError(error.message || 'Failed to delete team member');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setActionError('');
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Success/Error Messages */}
      {actionSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {actionSuccess}
        </div>
      )}
      
      {actionError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {actionError}
        </div>
      )}
      
      {/* Add/Edit Form */}
      {(showAddForm || editingMember) && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">
            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
          </h3>
          <TeamMemberForm 
            member={editingMember} 
            onSuccess={editingMember ? handleEditSuccess : handleAddSuccess} 
            onCancel={() => {
              setShowAddForm(false);
              setEditingMember(null);
            }}
          />
        </div>
      )}
      
      {/* Team Members List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg font-medium">Team Members</h3>
          {!showAddForm && !editingMember && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Add Team Member
            </button>
          )}
        </div>
        
        {teamMembers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No team members found. Add your first team member.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  {member.profileImage ? (
                    <img 
                      src={member.profileImage} 
                      alt={member.name} 
                      className="object-cover w-full h-48"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-400">
                      <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="font-bold text-lg">{member.name}</h4>
                  <p className="text-gray-600">{member.position}</p>
                  <p className="text-gray-500 mt-2 text-sm">{member.description}</p>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(member.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    >
                      Delete
                    </button>
                  </div>
                  
                  {/* Delete Confirmation */}
                  {deleteConfirm === member.id && (
                    <div className="mt-4 p-3 bg-red-50 rounded-md">
                      <p className="text-sm text-red-700 mb-2">Are you sure you want to delete this team member?</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}