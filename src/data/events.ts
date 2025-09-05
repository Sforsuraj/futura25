export interface Event {
  id: string;
  title: string;
  desc: string;
}

export const technicalEvents: Event[] = [
  { id: "1", title: "Coding Marathon", desc: "Compete in programming challenges." },
  { id: "2", title: "AI Workshop", desc: "Learn about AI and ML." },
  { id: "3", title: "Robotics Challenge", desc: "Build and program robots." },
];

export const nonTechnicalEvents: Event[] = [
  { id: "4", title: "Photography Contest", desc: "Show your creative skills." },
  { id: "5", title: "Debate Competition", desc: "Express your thoughts." },
];

export const allEvents: Event[] = [...technicalEvents, ...nonTechnicalEvents];
