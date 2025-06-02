export type EventCardItemType = {
  id: string;
  image: string;
  categoryId: string;
  name: string;
  quota: number;
  participants: number;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  isFree: boolean;
  owner: string;
};

export type EventDetailType = {
  event: EventCardItemType;
  description: string;
};
