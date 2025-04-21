import React, { useState } from 'react';
import { Users, Search, UserPlus, UserMinus, ChevronDown, Upload, Download } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// Sample student data
const allStudentsData = [
  { id: '1', name: 'John Smith', grade: '10', gender: 'M', sports: ['Soccer', 'Basketball'] },
  { id: '2', name: 'Emily Johnson', grade: '11', gender: 'F', sports: ['Basketball', 'Volleyball'] },
  { id: '3', name: 'Michael Brown', grade: '9', gender: 'M', sports: ['Swimming'] },
  { id: '4', name: 'Jessica Williams', grade: '12', gender: 'F', sports: ['Track', 'Swimming'] },
  { id: '5', name: 'David Jones', grade: '10', gender: 'M', sports: ['Soccer'] },
  { id: '6', name: 'Sarah Miller', grade: '11', gender: 'F', sports: ['Basketball'] },
  { id: '7', name: 'James Davis', grade: '9', gender: 'M', sports: ['Track'] },
  { id: '8', name: 'Emma Wilson', grade: '10', gender: 'F', sports: ['Swimming', 'Volleyball'] },
  { id: '9', name: 'Robert Taylor', grade: '12', gender: 'M', sports: ['Basketball', 'Soccer'] },
  { id: '10', name: 'Olivia Anderson', grade: '9', gender: 'F', sports: ['Track'] },
  { id: '11', name: 'Thomas Martinez', grade: '11', gender: 'M', sports: ['Swimming'] },
  { id: '12', name: 'Sophia Garcia', grade: '10', gender: 'F', sports: ['Volleyball'] }
];

// Sample team data
const teamsData = [
  { id: '1', name: 'Junior Boys Soccer', coach: 'John Smith', students: ['1', '5'] },
  { id: '2', name: 'Senior Girls Basketball', coach: 'Emily Johnson', students: ['2', '6'] },
  { id: '3', name: 'Swim Team', coach: 'Michael Davis', students: ['3', '4', '8', '11'] },
  { id: '4', name: 'Track & Field', coach: 'Sarah Williams', students: ['4', '7', '10'] },
  { id: '5', name: 'Volleyball', coach: 'Robert Wilson', students: ['2', '8', '12'] }
];

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState(teamsData);
  const [students] = useState(allStudentsData);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter students that are not in the selected team
  const availableStudents = students.filter(student => 
    !selectedTeam.students.includes(student.id) && 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get students in the selected team
  const teamStudents = students.filter(student => 
    selectedTeam.students.includes(student.id)
  );
  
  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    // Drop outside a droppable area
    if (!destination) return;
    
    // No movement
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;
    
    // Moving within the same team
    if (source.droppableId === destination.droppableId && 
        source.droppableId === 'teamStudents') {
      const newTeamStudents = Array.from(selectedTeam.students);
      const movedStudentId = teamStudents[source.index].id;
      
      // Reorder within team
      newTeamStudents.splice(
        newTeamStudents.findIndex(id => id === movedStudentId),
        1
      );
      
      const destinationIndex = newTeamStudents.findIndex(
        id => id === teamStudents[Math.min(destination.index, teamStudents.length - 1)].id
      );
      
      newTeamStudents.splice(
        destinationIndex !== -1 ? destinationIndex : newTeamStudents.length,
        0,
        movedStudentId
      );
      
      // Update teams state
      const newTeams = teams.map(team => 
        team.id === selectedTeam.id 
          ? { ...team, students: newTeamStudents } 
          : team
      );
      
      setTeams(newTeams);
      setSelectedTeam({ ...selectedTeam, students: newTeamStudents });
      
      return;
    }
    
    // Moving from available students to team
    if (source.droppableId === 'availableStudents' && 
        destination.droppableId === 'teamStudents') {
      const studentId = availableStudents[source.index].id;
      const newTeamStudents = Array.from(selectedTeam.students);
      
      // Add to team
      newTeamStudents.push(studentId);
      
      // Update teams state
      const newTeams = teams.map(team => 
        team.id === selectedTeam.id 
          ? { ...team, students: newTeamStudents } 
          : team
      );
      
      setTeams(newTeams);
      setSelectedTeam({ ...selectedTeam, students: newTeamStudents });
      
      return;
    }
    
    // Moving from team to available students (removing from team)
    if (source.droppableId === 'teamStudents' && 
        destination.droppableId === 'availableStudents') {
      const studentId = teamStudents[source.index].id;
      const newTeamStudents = selectedTeam.students.filter(id => id !== studentId);
      
      // Update teams state
      const newTeams = teams.map(team => 
        team.id === selectedTeam.id 
          ? { ...team, students: newTeamStudents } 
          : team
      );
      
      setTeams(newTeams);
      setSelectedTeam({ ...selectedTeam, students: newTeamStudents });
    }
  };

  return (
    <div className="teams-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" data-aos="fade-right">Team Management</h1>
        <div className="d-flex" data-aos="fade-left">
          <button className="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#newTeamModal">
            <UserPlus size={18} className="me-1" />
            New Team
          </button>
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle d-flex align-items-center" type="button" id="exportDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <Download size={18} className="me-1" />
              Export
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="exportDropdown">
              <li><a className="dropdown-item" href="#">Export as CSV</a></li>
              <li><a className="dropdown-item" href="#">Export as PDF</a></li>
              <li><a className="dropdown-item" href="#">Print Roster</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="row g-4">
        {/* Teams Selection */}
        <div className="col-lg-3" data-aos="fade-right">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent">
              <h5 className="card-title mb-0">Teams</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {teams.map((team, index) => (
                  <button
                    key={team.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedTeam.id === team.id ? 'active' : ''}`}
                    onClick={() => setSelectedTeam(team)}
                    data-aos="fade-right"
                    data-aos-delay={index * 50}
                  >
                    <div>
                      <div className="fw-medium">{team.name}</div>
                      <small className={selectedTeam.id === team.id ? 'text-light' : 'text-muted'}>
                        Coach: {team.coach}
                      </small>
                    </div>
                    <span className={`badge ${selectedTeam.id === team.id ? 'bg-light text-primary' : 'bg-primary'} rounded-pill`}>
                      {team.students.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="card-footer bg-transparent">
              <button className="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#newTeamModal">
                <UserPlus size={16} className="me-1" />
                New Team
              </button>
            </div>
          </div>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Team Roster */}
          <div className="col-lg-5" data-aos="fade-up">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{selectedTeam.name} Roster</h5>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="teamOptionsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="teamOptionsDropdown">
                    <li><a className="dropdown-item" href="#">Edit Team</a></li>
                    <li><a className="dropdown-item" href="#">Export Roster</a></li>
                    <li><a className="dropdown-item" href="#">Send Message</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#">Delete Team</a></li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h6 className="mb-0">Team Members ({teamStudents.length})</h6>
                    <small className="text-muted">Coach: {selectedTeam.coach}</small>
                  </div>
                  <button className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editRosterModal">
                    <Users size={16} className="me-1" />
                    Edit Roster
                  </button>
                </div>
                
                <Droppable droppableId="teamStudents">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="team-roster mb-3 border rounded"
                      style={{ minHeight: '300px' }}
                    >
                      {teamStudents.length > 0 ? (
                        <div className="list-group list-group-flush">
                          {teamStudents.map((student, index) => (
                            <Draggable key={student.id} draggableId={student.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`list-group-item d-flex justify-content-between align-items-center ${snapshot.isDragging ? 'bg-light' : ''}`}
                                  data-aos="fade-right"
                                  data-aos-delay={index * 30}
                                >
                                  <div>
                                    <div className="fw-medium">{student.name}</div>
                                    <small className="text-muted">Grade {student.grade} | {student.gender === 'M' ? 'Male' : 'Female'}</small>
                                  </div>
                                  <button className="btn btn-sm btn-outline-danger" onClick={() => {
                                    const newTeamStudents = selectedTeam.students.filter(id => id !== student.id);
                                    const newTeams = teams.map(team => 
                                      team.id === selectedTeam.id 
                                        ? { ...team, students: newTeamStudents } 
                                        : team
                                    );
                                    setTeams(newTeams);
                                    setSelectedTeam({ ...selectedTeam, students: newTeamStudents });
                                  }}>
                                    <UserMinus size={14} />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted">
                          <Users size={32} className="mb-2" />
                          <p>No students in this team yet</p>
                          <p className="small">Drag students from the available list or click Add Students</p>
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <div>
                    <div className="fw-medium">Drag and Drop</div>
                    <small>Drag students between the lists to manage team roster</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Available Students */}
          <div className="col-lg-4" data-aos="fade-left">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-transparent">
                <h5 className="card-title mb-0">Available Students</h5>
                <div className="mt-2">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <Search size={16} />
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search students..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Droppable droppableId="availableStudents">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="available-students border rounded"
                      style={{ minHeight: '400px', maxHeight: '400px', overflowY: 'auto' }}
                    >
                      {availableStudents.length > 0 ? (
                        <div className="list-group list-group-flush">
                          {availableStudents.map((student, index) => (
                            <Draggable key={student.id} draggableId={student.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`list-group-item d-flex justify-content-between align-items-center ${snapshot.isDragging ? 'bg-light' : ''}`}
                                  data-aos="fade-left"
                                  data-aos-delay={index * 30}
                                >
                                  <div>
                                    <div className="fw-medium">{student.name}</div>
                                    <small className="text-muted">
                                      Grade {student.grade} | {student.gender === 'M' ? 'Male' : 'Female'}
                                    </small>
                                    <div>
                                      {student.sports.map(sport => (
                                        <span key={sport} className="badge bg-secondary me-1">{sport}</span>
                                      ))}
                                    </div>
                                  </div>
                                  <button 
                                    className="btn btn-sm btn-outline-primary" 
                                    onClick={() => {
                                      const newTeamStudents = [...selectedTeam.students, student.id];
                                      const newTeams = teams.map(team => 
                                        team.id === selectedTeam.id 
                                          ? { ...team, students: newTeamStudents } 
                                          : team
                                      );
                                      setTeams(newTeams);
                                      setSelectedTeam({ ...selectedTeam, students: newTeamStudents });
                                    }}
                                  >
                                    <UserPlus size={14} />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted">
                          <Search size={32} className="mb-2" />
                          <p>No students found</p>
                          <p className="small">Try adjusting your search</p>
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#addStudentsModal">
                  <UserPlus size={16} className="me-1" />
                  Add New Student
                </button>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
      
      {/* New Team Modal */}
      <div className="modal fade" id="newTeamModal" tabIndex={-1} aria-labelledby="newTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newTeamModalLabel">Create New Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Team Name</label>
                  <input type="text" className="form-control" id="teamName" placeholder="Enter team name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="coachName" className="form-label">Coach</label>
                  <input type="text" className="form-control" id="coachName" placeholder="Enter coach name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamType" className="form-label">Sport Type</label>
                  <select className="form-select" id="teamType">
                    <option value="">Select sport</option>
                    <option value="soccer">Soccer</option>
                    <option value="basketball">Basketball</option>
                    <option value="volleyball">Volleyball</option>
                    <option value="swimming">Swimming</option>
                    <option value="track">Track & Field</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="teamLevel" className="form-label">Team Level</label>
                  <select className="form-select" id="teamLevel">
                    <option value="">Select level</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="varsity">Varsity</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="teamGender" className="form-label">Team Gender</label>
                  <select className="form-select" id="teamGender">
                    <option value="">Select gender</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Create Team</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Students Modal */}
      <div className="modal fade" id="addStudentsModal" tabIndex={-1} aria-labelledby="addStudentsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addStudentsModalLabel">Add New Student</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="studentName" placeholder="Enter student name" />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="studentGrade" className="form-label">Grade</label>
                    <select className="form-select" id="studentGrade">
                      <option value="">Select grade</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="studentGender" className="form-label">Gender</label>
                    <select className="form-select" id="studentGender">
                      <option value="">Select gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Sports Interests</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sportSoccer" />
                        <label className="form-check-label" htmlFor="sportSoccer">Soccer</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sportBasketball" />
                        <label className="form-check-label" htmlFor="sportBasketball">Basketball</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sportVolleyball" />
                        <label className="form-check-label" htmlFor="sportVolleyball">Volleyball</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sportSwimming" />
                        <label className="form-check-label" htmlFor="sportSwimming">Swimming</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sportTrack" />
                        <label className="form-check-label" htmlFor="sportTrack">Track & Field</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="studentNotes" className="form-label">Additional Notes</label>
                  <textarea className="form-control" id="studentNotes" rows={2}></textarea>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="addToCurrentTeam" />
                  <label className="form-check-label" htmlFor="addToCurrentTeam">
                    Add to {selectedTeam.name}
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Add Student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;