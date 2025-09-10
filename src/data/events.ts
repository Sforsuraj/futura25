import img1 from "../assets/events/1.jpg";
import img2 from "../assets/events/2.jpg";
import img3 from "../assets/events/3.jpg";
import img4 from "../assets/events/4.jpg";
import img5 from "../assets/events/1.jpg";
import img6 from "../assets/events/6.jpg";  

export interface Event {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export const technicalEvents: Event[] = [
  { id: "1", title: "CINELYTICS", desc: "Data Analytics", image: img1 },
  { id: "2", title: "SCRIPT2SCREEN", desc: "Power Point Presentation", image: img2 },
  { id: "3", title: "CODE MASTER", desc: "Coding", image: img3 },
  { id: "4", title: "MYSTIC REELS AND LOGIC WHEELS", desc: "Decryption", image: img4 },
];

export const nonTechnicalEvents: Event[] = [
  
  { id: "5", title: "PUDHIRODU VILAIYADU", desc: "Game", image:  img5 },
  { id: "6", title: "CINE CITIZENS", desc: "Music and Movie", image: img6 },
];

export const allEvents: Event[] = [...technicalEvents, ...nonTechnicalEvents];
