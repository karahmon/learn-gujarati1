
import React, { useState } from 'react';
import { MOCK_TUTORS, SYLLABUS_LINK, MOCK_MENTEES } from '../../constants';
import { Tutor } from '../../types';

const SuperTutorDashboard: React.FC = () => {
  const [syllabusLink, setSyllabusLink] = useState(SYLLABUS_LINK);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-700">Super Tutor Dashboard</h2>
      
      {/* Tutor Management */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Tutors</h3>
         <div className="flex justify-end mb-4">
            <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
                Add New Tutor
            </button>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Tutor Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Assigned Batches</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {MOCK_TUTORS.map((tutor) => (
                <tr key={tutor.id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm">{tutor.name}</td>
                    <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 font-semibold leading-tight ${tutor.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-full`}>
                            {tutor.status}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{tutor.assignedBatches.join(', ')}</td>
                    <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                            <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                Edit
                            </button>
                            <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-indigo-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                Remove
                            </button>
                        </div>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
       {/* Syllabus Edit */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Syllabus Link (Edit Access)</h3>
        <div className="flex items-center space-x-2">
            <input 
                type="text" 
                value={syllabusLink}
                onChange={(e) => setSyllabusLink(e.target.value)}
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
                Save
            </button>
        </div>
      </div>

       {/* Attendance & HW Tracker (View Only) */}
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Attendance Tracker (View Only)</h3>
             <ul className="space-y-2 max-h-48 overflow-y-auto">
               {MOCK_MENTEES.map(student => (
                <li key={student.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <span className="text-gray-800">{student.name}</span>
                     <span className={`px-2 py-1 text-xs font-semibold leading-tight ${student.attendance === 'Present' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-full`}>
                        {student.attendance}
                    </span>
                </li>
               ))}
            </ul>
        </div>
         <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">HW Submission Tracker (View Only)</h3>
             <ul className="space-y-2 max-h-48 overflow-y-auto">
               {MOCK_MENTEES.map(student => (
                <li key={student.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <span className="text-gray-800">{student.name}</span>
                     <span className={`text-sm ${student.hwSubmitted ? 'text-green-500' : 'text-red-500'}`}>
                        {student.hwSubmitted ? 'Submitted' : 'Pending'}
                    </span>
                </li>
               ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperTutorDashboard;
