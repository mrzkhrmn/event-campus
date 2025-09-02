export type EventCardItemType = {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventPrice: number;
  isFree: boolean;
  maxParticipants: number;
  currentParticipants: number;
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
  category: {
    id: number;
    name: string;
  };
  eventOwner: {
    id: number;
    email: string;
    name: string;
    surname: string;
    universityName: string;
    facultyName: string;
    departmentName: string;
    profileImage: string;
  };
  eventImages: string[];
  university: {
    id: number;
    name: string;
  };
};

export type EventDetailType = {
  event: EventCardItemType;
  description: string;
};
