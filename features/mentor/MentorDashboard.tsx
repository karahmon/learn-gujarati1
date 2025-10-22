
import React from 'react';
import { MOCK_MENTEES, MOCK_REPORTS, MOCK_SEVA_SUMMARY, SYLLABUS_LINK } from '../../constants';

const MentorDashboard: React.FC = () => {
  const myMentees = MOCK_MENTEES.filter(m => m.mentorId === 1);

  const handleShareReport = (menteeName: string) => {
    const message = `Report for ${menteeName}:\nReading submission complete. Good progress this week.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-700">Mentor Dashboard</h2>

      {/* Current Mentee Details */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Mentees</h3>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          {myMentees.map(mentee => (
            <div key={mentee.id} className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="font-bold text-lg text-gray-800">{mentee.name}</h4>
              <p className="text-sm text-gray-600">Batch: {mentee.batch}</p>
              
              <div className="mt-4">
                <label htmlFor={`report-${mentee.id}`} className="block text-sm font-medium text-gray-700">Reading Submission Report</label>
                <textarea
                  id={`report-${mentee.id}`}
                  rows={3}
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  defaultValue={mentee.readingSubmission || ''}
                  placeholder="Enter report details..."
                ></textarea>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
                  Submit Report
                </button>
                <button 
                  onClick={() => handleShareReport(mentee.name)}
                  className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
                  Share via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Syllabus */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Syllabus</h3>
            <a href={SYLLABUS_LINK} download className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
                Download PDF
            </a>
        </div>

        {/* Seva Summary */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Seva Summary</h3>
            <ul className="space-y-2">
                {MOCK_SEVA_SUMMARY.map(seva => (
                    <li key={seva.batch} className="text-sm text-gray-600">
                        <span className="font-semibold">{seva.batch}:</span> Mentored {seva.menteeName}
                    </li>
                ))}
            </ul>
        </div>
      </div>

       {/* Previous Reports */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Previous Reports</h3>
         <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Mentee</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Summary</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {MOCK_REPORTS.map((report) => (
                <tr key={report.id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm">{report.menteeName}</td>
                    <td className="px-4 py-3 text-sm">{report.date}</td>
                    <td className="px-4 py-3 text-sm">{report.summary}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
