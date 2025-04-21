import React, { useState } from 'react';
import { Users, UserPlus, X } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  grade: string;
  assigned: boolean;
}

interface Team {
  id: number;
  name: string;
  sport: string;
  students: number[];
}

const TeamSelector: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Alex Johnson', grade: '9th', assigned: false },
    { id: 2, name: 'Sarah Williams', grade: '10th', assigned: false },
    { id: 3, name: 'Michael Brown', grade: '9th', assigned: false },
    { id: 4, name: 'Emma Davis', grade: '11th', assigned: false },
    { id: 5, name: 'James Wilson', grade: '10th', assigned: false },
    { id: 6, name: 'Olivia Martinez', grade: '12th', assigned: false },
    { id: 7, name: 'Daniel Anderson', grade: '11th', assigned: false },
    { id: 8, name: 'Sophia Thompson', grade: '9th', assigned: false },
  ]);

  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Eagles', sport: 'Basketball', students: [] },
    { id: 2, name: 'Sharks', sport: 'Swimming', students: [] },
    { id: 3, name: 'Lions', sport: 'Football', students: [] },
  ]);

  const [activeTeam, setActiveTeam] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToTeam = (studentId: number) => {
    if (activeTeam === null) return;
    
    // Update team's student list
    setTeams(teams.map(team => {
      if (team.id === activeTeam) {
        return { ...team, students: [...team.students, studentId] };
      }
      return team;
    }));
    
    // Mark student as assigned
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return { ...student, assigned: true };
      }
      return student;
    }));
  };

  const handleRemoveFromTeam = (teamId: number, studentId: number) => {
    // Remove student from team
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return { ...team, students: team.students.filter(id => id !== studentId) };
      }
      return team;
    }));
    
    // Mark student as unassigned
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return { ...student, assigned: false };
      }
      return student;
    }));
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !student.assigned
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Team Selection</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map(team => (
              <div 
                key={team.id} 
                className={`p-4 rounded-lg shadow-sm border-2 transition-all duration-300 ${
                  activeTeam === team.id 
                    ? 'border-blue-500 shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
                } bg-white dark:bg-gray-800`}
                onClick={() => setActiveTeam(team.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg dark:text-white">{team.name}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                    {team.sport}
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <Users size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    {team.students.length} students
                  </span>
                </div>
                
                {team.students.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Assigned Students:</p>
                    <ul className="space-y-1">
                      {team.students.map(studentId => {
                        const student = students.find(s => s.id === studentId);
                        return student ? (
                          <li key={studentId} className="flex justify-between items-center text-sm">
                            <span className="dark:text-gray-300">{student.name}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromTeam(team.id, studentId);
                              }}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              aria-label="Remove student"
                            >
                              <X size={16} />
                            </button>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Student Selection */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          {activeTeam === null ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Users size={40} className="mx-auto mb-2 opacity-50" />
              <p>Select a team to assign students</p>
            </div>
          ) : (
            <>
              <h3 className="font-medium mb-3 dark:text-white">
                Available Students
              </h3>
              {filteredStudents.length > 0 ? (
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredStudents.map(student => (
                    <li 
                      key={student.id}
                      className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex justify-between items-center"
                      onClick={() => handleAddToTeam(student.id)}
                    >
                      <div>
                        <p className="font-medium dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Grade: {student.grade}</p>
                      </div>
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        aria-label="Add to team"
                      >
                        <UserPlus size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No available students found
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSelector;