import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [teamMembers, setTeamMembers] = React.useState([{
      name: "steve",
      email: "steve@whatever.com",
      role: "dishwasher"
    },
    {
      name: "ellie",
      email: "elili@jfkldasj.com",
      role: "cook"
    }
  ])


  const [isEditing, setIsEditing] = React.useState(false)
  const [teamMemberToBeEdited, setTeamMemberToBeEdited] = React.useState({})

  const handleEdit = (teamMember) => {
    setIsEditing(true)
    setTeamMemberToBeEdited(teamMember)
  }
  const handleDelete = (teamMemberToDelete) => {
    setTeamMembers(teamMembers.filter(member =>  member.name !== teamMemberToDelete.name ))
  }

  return (
    <div className="App">
      <h1>My team</h1>

      <NewTeamMemberForm 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        teamMembers={teamMembers} 
        setTeamMembers={setTeamMembers}
        teamMemberToBeEdited={teamMemberToBeEdited}
        setTeamMemberToBeEdited={setTeamMemberToBeEdited}
      />

      <TeamMembers 
        teamMembers={teamMembers} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
       />
    </div>
  );
}

function NewTeamMemberForm(props) {
  const [newTeamMember, setNewTeamMember] = React.useState({
    name: "",
    email: "",
    role: ""
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (props.isEditing) {
      props.setTeamMembers(props.teamMembers.map(member => {
        return (member.name === props.teamMemberToBeEdited.name) 
                ? newTeamMember
                : member
      }))

      props.setIsEditing(false)
    } else {
        // add a new team member
        props.setTeamMembers([...props.teamMembers, newTeamMember])
    }
    setNewTeamMember({
      name: "",
      email: "",
      role: ""
    })
  }

  const handleChange = (event) => {
    setNewTeamMember({...newTeamMember, [event.target.name]: event.target.value })
  }

  return (

    <form onSubmit={handleSubmit}>
    <div className="inputContainer">
      <input 
        type="text"
        name="name"
        placeholder="enter your first and last names"
        onChange={handleChange}
        value={newTeamMember.name}
      />
      </div>

      <div className="inputContainer">
        <input 
          type="text"
          name="email"
          placeholder="someone@example.com"
          onChange={handleChange}
          value={newTeamMember.email}
        />
   
      </div>

      <div className="inputContainer">
        <input 
          type="text"
          name="role"
          placeholder="what do you do?"
          onChange={handleChange}
          value={newTeamMember.role}
        />
      </div>

    {props.isEditing ? <button role="submit">Edit team member</button> : <button role="submit">Add new team member</button>}
  </form>
  )
}

function TeamMember({member, handleEdit, handleDelete}) { return (
  <div className="team-member">
    <span><strong>Name:</strong> <p>{member.name}</p></span>
    <span><strong>Email:</strong>  <p>{member.email}</p></span>
    <span><strong>Role:</strong><p>{member.role}</p></span>

    <div className="edit/delete">
      <button onClick={handleEdit.bind(null, member)}>Edit</button>
      <button onClick={() => handleDelete(member)}>Delete</button>
    </div>
  </div>
)}

function TeamMembers(props) {
  const renderTeamMember = function mapperFn(member) {
    return <TeamMember 
              member={member}
              handleEdit={props.handleEdit} 
              handleDelete={props.handleDelete}
            />
  }

  return (
    <div className="team-members">
      {props.teamMembers.map(renderTeamMember)}
    </div>
  )
}


export default App;
