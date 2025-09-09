export interface Event {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export const technicalEvents: Event[] = [
  { id: "1", title: "CINELYTICS", desc: "Data Analytics", image: "/src/assets/events/1.jpg" },
  { id: "2", title: "SCRIPT2SCREEN", desc: "Power Point Presentation", image: "/src/assets/events/2.jpg" },
  { id: "3", title: "CODE MASTER", desc: "Coding", image: "src/assets/events/3.jpg" },
  { id: "4", title: "MYSTIC REELS AND LOGIC WHEELS", desc: "Decryption", image: "src/assets/events/4.jpg" },
];

export const nonTechnicalEvents: Event[] = [
  
  { id: "5", title: "PUDHIRODU VILAIYADU", desc: "Game", image: "src/assets/events/1.jpg" },
  { id: "6", title: "CINE CITIZENS", desc: "Music and Movie", image: "src/assets/events/2.jpg" },
];

export const allEvents: Event[] = [...technicalEvents, ...nonTechnicalEvents];
