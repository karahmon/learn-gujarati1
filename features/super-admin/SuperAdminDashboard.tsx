import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { User, Role } from '../../types';

interface DatabaseTableProps {
  title: string;
  data: any[];
  columns: string[];
  isLoading: boolean;
}

const DatabaseTable: React.FC<DatabaseTableProps> = ({ title, data, columns, isLoading }) => (
    <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">{title} DB</h3>
            <div className="space-x-2">
                <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-md active:bg-gray-800 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray">
                    Import CSV
                </button>
                 <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-md active:bg-gray-800 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray">
                    Export CSV
                </button>
                 <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
                    Add New
                </button>
            </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  {columns.map(col => <th key={col} className="px-4 py-3">{col}</th>)}
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {isLoading ? (
                    <tr><td colSpan={columns.length + 1} className="text-center py-4">Loading...</td></tr>
                ) : data.length === 0 ? (
                    <tr><td colSpan={columns.length + 1} className="text-center py-4">No data found.</td></tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.uid} className="text-gray-700">
                            {columns.map(col => <td key={`${item.uid}-${col}`} className="px-4 py-3 text-sm">{item[col]}</td>)}
                            <td className="px-4 py-3">
                                <div className="flex items-center space-x-4 text-sm">
                                    <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-gray-800 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                        Edit
                                    </button>
                                    <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-gray-800 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
);


const SuperAdminDashboard: React.FC = () => {
    const [students, setStudents] = useState<User[]>([]);
    const [tutors, setTutors] = useState<User[]>([]);
    const [mentors, setMentors] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const usersCollectionRef = db.collection("users");
                const allUsersSnapshot = await usersCollectionRef.get();
                const allUsers = allUsersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User));

                setTutors(allUsers.filter(u => u.role === Role.TUTOR_ADMIN || u.role === Role.SUPER_TUTOR));
                setMentors(allUsers.filter(u => u.role === Role.MENTOR || u.role === Role.MENTOR_MONITOR));

                // A simple way to define students for now
                // NOTE: In a real app, students might have their own role or be in a separate collection.
                const staffRoles = [Role.MENTOR, Role.MENTOR_MONITOR, Role.TUTOR_ADMIN, Role.SUPER_TUTOR, Role.SUPER_ADMIN];
                setStudents(allUsers.filter(u => !staffRoles.includes(u.role)));

            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-gray-700">Super Admin Dashboard (Live Data)</h2>
      <p className="text-sm text-gray-600">
        This dashboard now displays real user data from your Firestore 'users' collection.
      </p>
      
      <DatabaseTable title="Student" data={students} columns={['fullName', 'email', 'mhtId', 'country']} isLoading={isLoading} />
      <DatabaseTable title="Tutor" data={tutors} columns={['fullName', 'email', 'role']} isLoading={isLoading} />
      <DatabaseTable title="Mentor" data={mentors} columns={['fullName', 'email', 'role']} isLoading={isLoading} />

       {/* NOTE: Role Management UI is for demonstration. Implementation would require
           updating user roles in Firestore and potentially Firebase Custom Claims for security. */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Role Management</h3>
         <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Add/Update Role</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input placeholder="Role Name" className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md sm:text-sm" />
                <div className="col-span-2">
                    <h5 className="text-sm font-medium mb-2">Permissions</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['View Reports', 'Edit Reports', 'Manage Users', 'Edit Syllabus', 'Take Attendance', 'View Attendance', 'Export Data', 'Manage Batches'].map(perm => (
                            <label key={perm} className="flex items-center text-sm">
                                <input type="checkbox" className="form-checkbox text-gray-800 rounded" />
                                <span className="ml-2">{perm}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
             <button className="mt-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-gray-800 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray">
                Save Role
            </button>
         </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;