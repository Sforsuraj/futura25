export interface Event {
  id: string;
  title: string;
  desc: string;
}

export const technicalEvents: Event[] = [
  { id: "1", title: "CINELYTICS", desc: "Data Analytics" },
  { id: "2", title: "SCRIPT2SCREEN", desc: "Power Point Presentation" },
  { id: "3", title: "CODE MASTER", desc: "Coding" },
  { id: "4", title: "MYSTIC REELS AND LOGIC WHEELS", desc: "Decryption" },
];

export const nonTechnicalEvents: Event[] = [
  
  { id: "5", title: "PUDHIRODU VILAIYADU", desc: "Game" },
  { id: "6", title: "CINE CITIZENS", desc: "Music and Movie" },
];

export const allEvents: Event[] = [...technicalEvents, ...nonTechnicalEvents];
