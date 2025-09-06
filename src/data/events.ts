export interface Event {
  id: string;
  title: string;
  desc: string;
}

export const technicalEvents: Event[] = [
  { id: "1", title: "Cinelytics", desc: "Data analytics" },
  { id: "2", title: "power point padam", desc: "Ppt" },
  { id: "3", title: "coder dhinam", desc: "Coding" },
  { id: "4", title: "Jolly oh Gymkhana", desc: "Game" },
];

export const nonTechnicalEvents: Event[] = [
  { id: "5", title: "mystic reels and logic wheels", desc: "Decription" },
  { id: "6", title: "Cine Citizens", desc: "Music and movie event name" },
];

export const allEvents: Event[] = [...technicalEvents, ...nonTechnicalEvents];
