
import React from 'react';
import { MOCK_MENTEES, MOCK_REPORTS, SYLLABUS_LINK } from '../../constants';
import { Role } from '../../types';
import { MOCK_USERS } from '../../constants';


const TutorAdminDashboard: React.FC = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-700">Tutor/Admin Dashboard</h2>

      {/* Batch Details */}
       <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Batch Details</h3>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Mentor</th>
                  <th className="px-4 py-3">Mentor Status</th>
                  <th className="px-4 py-3">Needs Mentor?</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {MOCK_MENTEES.map((mentee) => (
                <tr key={mentee.id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm">{mentee.name}</td>
                    {/* FIX: Changed .name to .fullName to match the User interface. */}
                    <td className="px-4 py-3 text-sm">{MOCK_USERS[Role.MENTOR].fullName}</td>
                    <td className="px-4 py-3 text-sm">
                        <select className="bg-transparent">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </td>
                    <td className="px-4 py-3 text-sm">
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Attendance Submission */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Attendance Submission</h3>
        <div className="flex items-center space-x-4">
             <input type="date" className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" defaultValue={new Date().toISOString().substring(0, 10)} />
            <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
              Upload CSV
            </button>
        </div>
        <div className="mt-4 w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
                 <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {MOCK_MENTEES.map(m => (
                    <tr key={m.id} className="text-gray-700">
                        <td className="px-4 py-3 text-sm">{m.name}</td>
                        <td className="px-4 py-3 text-sm">
                            <div className="flex items-center justify-center space-x-2">
                                <label className="flex items-center"><input type="radio" name={`att-${m.id}`} className="form-radio text-green-600" defaultChecked/> <span className="ml-2">Present</span></label>
                                <label className="flex items-center"><input type="radio" name={`att-${m.id}`} className="form-radio text-red-600"/> <span className="ml-2">Absent</span></label>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <button className="mt-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
          Submit Attendance
        </button>
      </div>

       {/* HW Submission Tracker */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Homework Submission Tracker</h3>
         <ul className="space-y-3">
           {MOCK_MENTEES.map(student => (
            <li key={student.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                <span className="text-gray-800">{student.name}</span>
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={student.hwSubmitted} className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"/>
                    <span className="ml-2 text-sm text-gray-600">Submitted</span>
                </label>
            </li>
           ))}
        </ul>
        <button className="mt-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
            Save HW Status
        </button>
      </div>
      
      <div className="grid gap-6 mt-8 md:grid-cols-2">
         {/* Syllabus */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Syllabus (View Only)</h3>
            <a href={SYLLABUS_LINK} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                View Syllabus PDF
            </a>
        </div>
        {/* Reports */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Batch Reports (View Only)</h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {MOCK_REPORTS.map(report => (
                <li key={report.id} className="text-sm p-2 bg-gray-50 rounded">
                    <span className="font-semibold">{report.menteeName} ({report.date}):</span> {report.summary}
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default TutorAdminDashboard;