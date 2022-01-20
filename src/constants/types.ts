interface ParticipantsType {
  current: number;
  max: number;
}

export interface TournamentType {
  game: string;
  id: string;
  name: string;
  organizer: string;
  participants: ParticipantsType;
  startDate: Date;
}

export interface TournamentsType {
  tournamentsLoading: boolean;
  tournaments: TournamentType[];
  tournamentsError: string;
}

export interface ActionType {
  type: string;
  id?: string;
  tournament?: TournamentType;
  tournaments?: TournamentType[];
  error?: string;
}
