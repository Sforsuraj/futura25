export interface Event {
  id: string;
  title: string;
  desc: string;
}

export const technicalEvents: Event[] = [
  { id: "1", title: "DATA AVATHARAM", desc: "Data Analytics" },
  { id: "2", title: "power point padam", desc: "Ppt" },
  { id: "3", title: "Coder Dhinam", desc: "Coding" },
  { id: "4", title: "mystic reels and logic wheels", desc: "Decryption" },
];

export const nonTechnicalEvents: Event[] = [
  
  { id: "5", title: "Jolly oh Gymkhana", desc: "Game" },
  { id: "6", title: "Cine Citizens", desc: "Music and movie event name" },
];

export const allEvents: Event[] = [...technicalEvents, ...nonTechnicalEvents];
