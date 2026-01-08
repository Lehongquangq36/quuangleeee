
export interface AgendaItem {
  time: string;
  activity: string;
}

export interface EventData {
  title: string;
  hostName: string;
  date: string;
  time: string;
  location: string;
  address: string;
  dressCode: string;
  message: string;
  agenda: AgendaItem[];
}

export interface RSVPResponse {
  name: string;
  isAttending: boolean;
  guestsCount: number;
  note: string;
}

export interface AIGeneratedMessage {
  content: string;
  style: 'formal' | 'funny' | 'poetic' | 'warm';
}
