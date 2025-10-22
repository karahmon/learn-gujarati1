
import React from 'react';
import { MOCK_MENTEES, MOCK_REPORTS, MOCK_SEVA_SUMMARY, MOCK_USERS } from '../../constants';
import { Role } from '../../types';

const MentorMonitorDashboard: React.FC = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-700">Mentor Monitor Dashboard</h2>
      
      {/* Current Batch Details */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Batch Details</h3>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Mentee Name</th>
                  <th className="px-4 py-3">Batch</th>
                  <th className="px-4 py-3">Mentor</th>
                  <th className="px-4 py-3">Mentor Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {MOCK_MENTEES.map((mentee) => (
                <tr key={mentee.id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm">{mentee.name}</td>
                    <td className="px-4 py-3 text-sm">{mentee.batch}</td>
                    {/* FIX: Changed .name to .fullName to match the User interface. */}
                    <td className="px-4 py-3 text-sm">{MOCK_USERS[Role.MENTOR].fullName}</td>
                    <td className="px-4 py-3 text-sm">
                        <select className="bg-transparent">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Current Batch Reports */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Batch Reports (View Only)</h3>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                    <th className="px-4 py-3">Mentee</th>
                    <th className="px-4 py-3">Submitted By</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Summary</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {MOCK_REPORTS.map((report) => (
                    <tr key={report.id} className="text-gray-700">
                        <td className="px-4 py-3 text-sm">{report.menteeName}</td>
                        <td className="px-4 py-3 text-sm">{report.submittedBy}</td>
                        <td className="px-4 py-3 text-sm">{report.date}</td>
                        <td className="px-4 py-3 text-sm">{report.summary}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Seva Summary */}
       <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Seva Summary</h3>
            <ul className="space-y-2">
                {MOCK_SEVA_SUMMARY.map(seva => (
                    <li key={seva.batch} className="text-sm text-gray-600">
                        Batch <span className="font-semibold">{seva.batch}</span> seva complete.
                    </li>
                ))}
                 <li className="text-sm text-gray-600">
                        Batch <span className="font-semibold">Summer 2024</span> seva in progress.
                    </li>
            </ul>
        </div>
    </div>
  );
};

export default MentorMonitorDashboard;