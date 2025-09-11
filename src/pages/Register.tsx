import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allEvents } from "../data/events";
import { database } from "../firebase";
import { ref, get, set } from "firebase/database";

interface Member {
  name: string;
  email: string;
  dept: string;
  college: string;
}

const MAX_MEMBERS = 2;

const Register: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = allEvents.find((e) => e.id === id);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { name: "", email: "", dept: "", college: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleMemberChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [e.target.name]: e.target.value };
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length >= MAX_MEMBERS) return;
    setMembers([...members, { name: "", email: "", dept: "", college: "" }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || members.length === 0) return;

    setLoading(true);

    try {
      const safeTeamName = teamName.replace(/[.$#[\]/]/g, "_");
      const eventNode = `registrations/event_${id}`;
      const eventRef = ref(database, `${eventNode}/${safeTeamName}`);

      const snapshot = await get(eventRef);
      if (snapshot.exists()) {
        alert("Team name already exists! Please choose a different name.");
        setLoading(false);
        return;
      }

      await set(eventRef, {
        eventName: event?.title || "Symposium 2025",
        members,
        timestamp: new Date().toISOString(),
      });

      alert(`Team "${teamName}" registered successfully for ${event?.title}`);
      setTeamName("");
      setMembers([{ name: "", email: "", dept: "", college: "" }]);
    } catch (error) {
      console.error("Error saving registration:", error);
      alert("Failed to register. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Back button outside container */}
      

      <section className="register-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
        <h2>Register for {event?.title || "Symposium 2025"}</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            value={teamName}
            onChange={handleTeamChange}
            required
          />

          {members.map((member, index) => (
            <div key={index} className="member-container">
              <h3>Member {index + 1}</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={member.name}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              <input
                type="text"
                name="dept"
                placeholder="Department"
                value={member.dept}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={member.college}
                onChange={(e) => handleMemberChange(index, e)}
                required
              />
              {members.length > 1 && (
                <button
                  type="button"
                  className="remove-member"
                  onClick={() => removeMember(index)}
                >
                  Remove Member
                </button>
              )}
            </div>
          ))}

          {members.length < MAX_MEMBERS && (
            <button
              type="button"
              className="add-member"
              onClick={addMember}
            >
              + Add Member
            </button>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Submit Registration"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
