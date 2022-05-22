export interface ISpeaker {
  name: string;
  room: number;
  email: string;
  company: string;
  bio: string;
}

export interface IAttendee {
  name: string;
  company: string;
  email: number;
}

export interface IPresentation {
  id: string;
  details: string;
  room: number;
  speaker: ISpeaker
  attendees?: IAttendee[]
}