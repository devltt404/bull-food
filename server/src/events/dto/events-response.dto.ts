export class EventsResponseDto {
  id: string;
  title: string;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  image: string;
  location: string;
  going: number;
}

export class EventResponseDto {
  id: string;
  image: string;
  title: string;
  timeInfo1: string;
  timeInfo2?: string;
  location: {
    name: string;
    address?: string;
  };
  tags: string[];
  organizer: string;
  going: number;
  details: {
    image?: string;
    description: string;
  };
}
