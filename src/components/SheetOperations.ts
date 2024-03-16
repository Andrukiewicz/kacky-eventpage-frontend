// TODO: merge mergeSpreadsheetAndPBs and mergeScheduleAndPBs into one function
interface SheetItem {
  finished?: boolean;
  kacky_id: number;
  version: string;
  author: string;
  map_diff?: number;
  kacky_id_int: number;
  rating: number;
  map_pb: number;
  map_rank: number;
  clip: string;
  default_clip: string;
  alarm: boolean;
  wr_score: number;
  wr_holder: string;
  upcomingIn: number;
  server: string;
}

interface PBItem {
  date: number;
  kacky_rank: number;
  score: number;
}

interface PBData {
  [key: number]: PBItem;
  score?: number;
  kacky_rank?: number;
}

export interface FormattedMap {
  finished: boolean;
  number: number;
  version: string;
  author: string;
  difficulty: number;
  rating: number;
  personalBest: number;
  kackyRank: number;
  clip: string;
  default_clip: string;
  discordPing: boolean;
  wrScore: number;
  wrHolder: string;
  upcomingIn?: number; // Optional for Schedule-specific data
  server?: string; // Optional for Schedule-specific data
}

// Merges sheet and personal bests for both Spreadsheet and Schedule formats
export function mergeSheetsAndPBs(
  sheet: SheetItem[],
  pb: PBData[]
): FormattedMap[] {
  const formattedData: FormattedMap[] = [];

  sheet.forEach(map => {
    const formattedMap: FormattedMap = {
      finished: map.finished || false,
      number: map.kacky_id, // .toString()
      version: map.version || '',
      author: map.author,
      difficulty: map.map_diff || 0,
      rating: map.rating || 0,
      personalBest: 0,
      kackyRank: 0,
      clip: map.clip || '',
      default_clip: map.default_clip || '',
      discordPing: map.alarm || false,
      wrScore: map.wr_score,
      wrHolder: map.wr_holder,
      ...(map.upcomingIn && { upcomingIn: map.upcomingIn }), // Spread optional properties
      ...(map.server && { server: map.server }), // Spread optional properties
    };

    if (
      pb !== null &&
      pb !== undefined &&
      pb[formattedMap.number] !== undefined
    ) {
      formattedMap.finished = true;
      formattedMap.personalBest = Number(pb[formattedMap.number].score);
      formattedMap.kackyRank = Number(pb[formattedMap.number].kacky_rank);
    }

    if (formattedMap.difficulty === 0) {
      if (formattedMap.rating !== 0) {
        // make a 1-5 difficulty out of the 1-100 rating
        formattedMap.difficulty = Math.floor(formattedMap.rating / 20) + 1;
      } else {
        formattedMap.difficulty = 0;
      }
    }
    if (formattedMap.difficulty > 5) {
      // clip difficulty to 5 (happens when rating === 100)
      // also handles illegal difficulty values from backend
      formattedMap.difficulty = 5;
    }

    formattedData.push(formattedMap);
  });

  return formattedData;
}
