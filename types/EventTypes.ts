export type EventCardItemType = {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  price: number;
  isFree: boolean;
  maxParticipants: number;
  currentParticipantCount: number;
  latitude: number;
  longitude: number;
  isActive: boolean;
  isEventEnded: boolean;
  isEventStarted: boolean;
  isPublic: boolean;
  isRegistrationOpen: boolean;
  isUserParticipant: boolean;
  createdAt: string;
  updatedAt: string | null;
  category: any; // Object tipinde geldiği için any olarak tanımladım
  createdByUser: {
    id: number;
    email: string;
    name: string;
    surname: string;
    universityName: string;
    facultyName: string;
    departmentName: string;
  };
  eventImages: any[]; // Array tipinde geldiği için any[] olarak tanımladım
  university: any; // Object tipinde geldiği için any olarak tanımladım
};

export type EventDetailType = {
  event: EventCardItemType;
  description: string;
};
