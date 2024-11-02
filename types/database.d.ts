// Interface for the event state
type EventStatus = {
  status: string;
  type: string;
  edition: number;
  start: Date;
};

type AvailableEvents = {
  edition: number;
  name: string;
  type: string;
};

type LoginRequest = {
  user: string;
  pwd: string;
};

type LoginResponse = {
  access_token: string;
  expires: number;
};

type PasswordReset = {
  user: string;
  mail: string;
};

type PasswordResetToken = {
  token: string;
  pwd: string;
};

type RegisterUserForm = {
  user: string;
  pwd: string;
  confirmPwd: string;
  mail: string;
};

type RegisterUserRequest = {
  user: string;
  pwd: string;
  confirmPwd: string;
  mail: string;
};

type ProfileData = {
  discord: string;
  tm20: string;
  tmnf: string;
};

type Server = {
  serverNumber: number;
  serverDifficulty: string;
  serverJoin: string;
  maps: ServerMap[];
  timeLimit: number;
  timeLeft: number;
  isSuccess: boolean;
  isLoading: boolean;
};

type ServerMap = {
  number: number;
  author: string;
  finished: boolean;
};

type DashboardData = {
  servers: Server[];
  comptimeLeft: number;
};

type HuntingSpreadsheet = {
  type: string;
  edition: number;
  token?: string;
};

type HuntingSpreadsheetResponse = {
  author: string;
  kacky_id: number;
  kacky_id_int: number;
  rating: number;
  version: string;
  wr_holder: string;
  wr_score: number;
  upcomingIn: number;
  server: string;
  clip: string;
  default_clip: string;
  alarm: boolean;
  map_pb: number;
  map_rank: number;
};

type MapDifficultyCellSubmitProps = {
  mapid: number;
  diff?: number;
  clip?: string;
  alarm?: boolean;
  token: string;
};

type SpreadsheetDataPost = {
  kacky_id: number;
  kacky_id_int: number;
  version: string;
  author: string;
  rating: number;
  wr_score: number;
  wr_holder: string;
  token: string;
};

type ScheduleData = {
  kacky_id: number;
  kacky_id_int: number;
  version: string;
  author: string;
  rating: number;
  wr_score: number;
  wr_holder: string;
  upcomingIn: number;
  server: string;
};

type FinishesResponse = {
  finishes: number;
  mapids: number[]; // Array of numbers
};

interface MapFinsResponse {
  mapids: string[];
}

interface PersonalBest {
  date: number;
  kacky_rank: number;
  score: number;
}

interface PersonalBestsResponse {
  [key: string]: PersonalBest;
}

interface PerformanceResponse {
  edition: number;
  fins: number;
}

type LeaderBoardPlayer = {
  avg: number;
  fins: number;
  login: string;
  nick: string;
};

type LeaderBoardPlayerSearch = {
  avg: number;
  fins: number;
  login: string;
  nick: string;
};

type WRHolder = {
  nwrs: number;
  login: string;
  nickname: string;
};

type MapInfo = {
  kacky_id: number;
  kacky_id_int: number;
  version: string;
  author: string;
  rating: number;
  id: null | string; // Assuming "id" can be null
  map_diff: null | string; // Assuming "map_diff" can be null
  map_pb: null | string; // Assuming "map_pb" can be null
  map_rank: null | number; // Assuming "map_rank" can be null
  clip: null | string; // Assuming "clip" can be null
  default_clip: null | string;
  wr_score: number;
  wr_holder: string;
};

type EventInfoData = {
  create: {
    name: string;
    type: string;
    edition: number;
    startDate: string;
    endDate: string;
    minID: number;
    maxID: number;
  };
};

type StreamInfo = {
  data: string; // Assuming the "data" property is always a string
};

type FetchEventsConfig = {
  method: 'GET' | 'POST';
  headers: {
    Accept: string;
    'Content-Type': string;
    Authorization?: string; // Optional based on token presence
  };
};
