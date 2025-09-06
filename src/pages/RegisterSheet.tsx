import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue, off } from "firebase/database";
import * as XLSX from "xlsx";

interface Member {
  name: string;
  email: string;
  dept: string;
  college: string;
}

interface TeamRegistration {
  eventId: string;
  eventName: string;
  teamName: string;
  timestamp: string;
  members: Member[];
}

const RegisterSheet = () => {
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);

  useEffect(() => {
    const dbRef = ref(database, "/registrations");

    const listener = onValue(dbRef, (snapshot) => {
      const val = snapshot.val() as Record<string, any>;
      const tableData: TeamRegistration[] = [];

      if (val) {
        Object.entries(val).forEach(([eventId, teams]) => {
          Object.entries(teams as Record<string, any>).forEach(([teamName, info]) => {
            tableData.push({
              eventId,
              eventName: info.eventName,
              teamName,
              timestamp: info.timestamp,
              members: info.members,
            });
          });
        });
      }

      setRegistrations(tableData);
    });

    return () => off(dbRef);
  }, []);

  // Group registrations by eventId
  const groupedRegistrations = registrations.reduce((acc, team) => {
    if (!acc[team.eventId]) acc[team.eventId] = [];
    acc[team.eventId].push(team);
    return acc;
  }, {} as Record<string, TeamRegistration[]>);

  // Export to Excel function for given event teams
  const exportToExcel = (eventId: string, teams: TeamRegistration[], eventName: string) => {
    const data = teams.map((team) => {
      const row: Record<string, string> = {
        "Event ID": team.eventId,
        "Event Name": team.eventName,
        "Team Name": team.teamName,
        Timestamp: new Date(team.timestamp).toLocaleString(),
      };

      team.members.forEach((m, i) => {
        row[`Member ${i + 1} Name`] = m.name;
        row[`Member ${i + 1} Email`] = m.email;
        row[`Member ${i + 1} Dept`] = m.dept;
        row[`Member ${i + 1} College`] = m.college;
      });

      for (let i = team.members.length; i < 4; i++) {
        row[`Member ${i + 1} Name`] = "-";
        row[`Member ${i + 1} Email`] = "-";
        row[`Member ${i + 1} Dept`] = "-";
        row[`Member ${i + 1} College`] = "-";
      }

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    XLSX.writeFile(workbook, `${eventId}_${eventName}_registrations.xlsx`);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Event Registrations Sheets</h1>

      {Object.entries(groupedRegistrations).map(([eventId, teams]) => (
        <div key={eventId} style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h2 style={{ margin: 0 }}>
              Event ID: <span style={{ color: "#787171ff" }}>{eventId}</span> — {teams[0]?.eventName || ""}
            </h2>
            <button
              onClick={() => exportToExcel(eventId, teams, teams[0]?.eventName || "Event")}
              style={buttonStyle}
              disabled={teams.length === 0}
              title={teams.length === 0 ? "No data to export" : "Download as Excel"}
            >
              Download as Excel
            </button>
          </div>

          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Event ID</th>
                  <th style={thStyle}>Event Name</th>
                  <th style={thStyle}>Team Name</th>
                  {[1, 2, 3, 4].map((num) => (
                    <React.Fragment key={num}>
                      <th style={thStyle}>Member {num} Name</th>
                      <th style={thStyle}>Member {num} Email</th>
                      <th style={thStyle}>Member {num} Dept</th>
                      <th style={thStyle}>Member {num} College</th>
                    </React.Fragment>
                  ))}
                  <th style={thStyle}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 && (
                  <tr>
                    <td colSpan={15} style={noDataStyle}>
                      No registrations found.
                    </td>
                  </tr>
                )}
                {teams.map((team, idx) => (
                  <tr key={idx} style={trStyle}>
                    <td style={tdStyle}>{team.eventId}</td>
                    <td style={tdStyle}>{team.eventName}</td>
                    <td style={tdStyle}>{team.teamName}</td>
                    {[0, 1, 2, 3].map((i) => {
                      const member = team.members[i];
                      return (
                        <React.Fragment key={i}>
                          <td style={tdStyle}>{member?.name || "-"}</td>
                          <td style={tdStyle}>{member?.email || "-"}</td>
                          <td style={tdStyle}>{member?.dept || "-"}</td>
                          <td style={tdStyle}>{member?.college || "-"}</td>
                        </React.Fragment>
                      );
                    })}
                    <td style={tdStyle}>{new Date(team.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {registrations.length === 0 && <p style={{ textAlign: "center", marginTop: "2rem" }}>No registrations available.</p>}
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  padding: "2rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#f5f7fa",
  minHeight: "100vh",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "2rem",
  color: "#333",
  fontWeight: "700",
  fontSize: "2.2rem",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: 10,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  padding: "1rem 1.5rem 2rem 1.5rem",
  marginBottom: "2rem",
  display: "flex",
  flexDirection: "column",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#7f7f7fff",
  border: "none",
  color: "white",
  padding: "0.5rem 1.25rem",
  borderRadius: 5,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "background-color 0.3s ease",
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: "auto",
  maxHeight: 400,
  overflowY: "auto",
  borderRadius: 6,
  border: "1px solid #ddd",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: 900,
  fontSize: "0.9rem",
};

const thStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  backgroundColor: "#686d72ff",
  color: "white",
  padding: "10px 12px",
  borderBottom: "2px solid #797b7dff",
  textAlign: "left",
  whiteSpace: "nowrap",
  zIndex: 10,
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid #ddd",
  whiteSpace: "nowrap",
};

const trStyle: React.CSSProperties = {
  transition: "background-color 0.2s ease",
  cursor: "default",
};

const noDataStyle: React.CSSProperties = {
  padding: "1rem",
  textAlign: "center",
  color: "#999",
  fontStyle: "italic",
};

export default RegisterSheet;
