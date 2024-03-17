import { LoginUserFormSchema } from '@/components/Header/AuthModal/Login';
import { RegisterUserFormSchema } from '@/components/Header/AuthModal/Register';
import { ProfileDataFormSchema } from '@/views/Profile/Profile';

const url = `https://devapi.kacky.gg`;

// let cachedEvents: null | AvailableEvents[] = null;

export async function login(data: LoginUserFormSchema): Promise<LoginResponse> {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.user,
        pwd: data.pwd,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: LoginResponse = await response.json();
    return responseData;
  } catch (error: any) {
    // Handle errors here
    console.error('Login error:', error); // Log the error for debugging
    throw new Error(error.message || 'Error during login'); // Re-throw a user-friendly error
  }
}

export async function logoutServer(token: string) {
  const response = await fetch(`${url}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function registerUser(data: RegisterUserFormSchema): Promise<any> {
  // Change the return type based on actual response structure
  const body: RegisterUserFormSchema = {
    user: data.user,
    pwd: data.pwd,
    confirmPwd: data.confirmPwd,
    mail: data.mail,
  };

  const response = await fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function eventLiveState(): Promise<EventStatus> {
  const response = await fetch(`${url}/eventstatus`);
  return response.json();
}

export async function getAllEvents(token?: string): Promise<AvailableEvents[]> {
  // Check for cached events first
  // if (cachedEvents) return cachedEvents;
  const config: FetchEventsConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${url}/events`, config as FetchEventsConfig);
  // body: JSON.stringify({ visibility: 'true' }), this is for admin POST requests
  // cachedEvents = events; // Update cache only if successful
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getDashboardData(token?: string): Promise<DashboardData> {
  const config: {
    headers: {
      Accept: string;
      Authorization?: string;
    };
  } = {
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${url}/dashboard`, {
    headers: config.headers,
  });

  if (!response.ok) throw new Error('Network response was not ok');
  const data: DashboardData = await response.json();
  return data;
}

export async function getSpreadsheetData(
  type: string,
  edition: number,
  token?: string | undefined
): Promise<HuntingSpreadsheetResponse[]> {
  const config: {
    headers: {
      Accept: string;
      Authorization?: string;
    };
  } = {
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${url}/spreadsheet/${type}/${edition}`, {
      headers: config.headers,
    });

    if (response.status !== 200) return [];

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // const data: HuntingSpreadsheetResponse = await response.json();
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function getScheduleData(
  token?: string
): Promise<ScheduleData | []> {
  const config: {
    headers: {
      Accept: string;
      Authorization?: string;
    };
  } = {
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${url}/spreadsheet`, {
      headers: config.headers,
    });

    if (response.status !== 200) return [];

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: ScheduleData = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function postSpreadsheetData(
  data: MapDifficultyCellSubmitProps,
  eventtype: string
): Promise<void> {
  const response = await fetch(`${url}/spreadsheet/${eventtype}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Handle non-200 status codes with specific error messages (if possible)
    switch (response.status) {
      case 400:
        throw new Error('Invalid data format or missing required fields');
      case 401:
        throw new Error('Unauthorized');
      default:
        throw new Error(
          `Network response was not ok (status: ${response.status})`
        );
    }
  }

  return response.json();
}

export async function getProfileData(token: string): Promise<ProfileData> {
  const config: {
    headers: {
      Authorization: string;
      Accept: string;
      'Content-Type': string;
    };
  } = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${url}/usermgnt`, config);
    if (!response.ok) throw new Error('Network response was not ok');
    const data: ProfileData = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
}

export async function postProfileData(
  data: ProfileDataFormSchema
): Promise<void> {
  const response = await fetch(`${url}/usermgnt`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function getFinishes(token: string): Promise<FinishesResponse> {
  const response = await fetch(`${url}/fin`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const finishesResponse: FinishesResponse = await response.json();
  return finishesResponse;
}

export function getMapImageUrl(eventType: string, mapNumber: number): string {
  // Remove "[v2]" and similar (assuming only spaces separate version info)
  const cleanedMapNumber = mapNumber.toString().split(' ')[0];
  const imageUrl = `https://static.kacky.gg/${eventType}/thumbs/${cleanedMapNumber}.jpg`;
  return imageUrl;
}

export async function getPersonalBests(
  token: string,
  type: string
): Promise<PersonalBestsResponse[]> {
  const response = await fetch(`${url}/pb/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseJson = await response.json();
  return responseJson;
}

export async function getPerformance(
  token: string,
  type: string
): Promise<PerformanceResponse[]> {
  const response = await fetch(`${url}/performance/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const performanceResponse = await response.json();
  return performanceResponse;
}

export async function getLeaderBoardPage(
  token: string,
  eventtype: string,
  edition: number,
  startrank: number,
  elements: number
): Promise<LeaderBoardPlayer[]> {
  const response = await fetch(
    `${url}/records/event/leaderboard/${eventtype}/${edition}?start=${startrank}&elems=${elements}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const leaderBoardData: LeaderBoardPlayer[] = await response.json();
  return leaderBoardData;
}

export async function getLeaderBoardPlayer(
  token: string,
  eventtype: string,
  edition: number,
  searchlogin: string
): Promise<LeaderBoardPlayerSearch | null> {
  const response = await fetch(
    `${url}/records/event/leaderboard/${eventtype}/${edition}/${searchlogin}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const leaderBoardData = await response.json();

  // Check if the response is an empty array (player not found)
  if (!leaderBoardData.length) {
    return null;
  }

  const playerData: LeaderBoardPlayerSearch = leaderBoardData[0]; // Assuming the first element is the player data
  return playerData;
}

export async function getStreamInfo(token: string): Promise<StreamInfo> {
  const response = await fetch(`${url}/stream`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const streamInfo: StreamInfo = await response.json();
  return streamInfo;
}

export async function getWRHolderLeaderboard(
  token: string,
  eventtype: string
): Promise<WRHolder[]> {
  const response = await fetch(`${url}/wrleaderboard/${eventtype}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const wrHolders: WRHolder[] = await response.json();
  return wrHolders;
}

export async function getMapInfo(
  eventtype: string,
  kackyid: number
): Promise<MapInfo> {
  const response = await fetch(`${url}/mapinfo/${eventtype}/${kackyid}`, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const mapInfo: MapInfo = await response.json();
  return mapInfo;
}

export async function setMapInfo(
  token: string,
  eventtype: string,
  kackyid: number,
  data: { reset: string }
): Promise<string> {
  const response = await fetch(`${url}/mapinfo/${eventtype}/${kackyid}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 401) {
      throw new Error('Unauthorized');
    } else if (status === 404) {
      throw new Error('Map not found');
    } else {
      throw new Error('Network response was not ok');
    }
  }

  return response.json();
}

export async function setEventInfo(
  token: string,
  data: EventInfoData
): Promise<any> {
  const response = await fetch(`${url}/manage/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function setMapInfoAdmin(
  token: string,
  data: File, // Assuming data is a File object
  overwrite: boolean
): Promise<string> {
  const formData = new FormData();
  formData.append('file', data);

  if (overwrite) {
    formData.set('overwrite', new Blob(['1'], { type: 'text/plain' }));
  }

  const response = await fetch(`${url}/manage/maps`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok (status: ${response.status})`);
  }

  return response.json(); // Assuming the response is now expected as a string
}

export async function resetPasswordStep1(data: PasswordReset): Promise<string> {
  const response = await fetch(`${url}/pwdreset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: data.user,
      mail: data.mail,
    }),
  });

  if (!response.ok) {
    // Handle non-200 status codes with more specific error messages
    switch (response.status) {
      case 400:
        throw new Error('Invalid username or email address');
      case 404:
        throw new Error('User or email not found');
      default:
        throw new Error(
          `Network response was not ok (status: ${response.status})`
        );
    }
  }

  return response.json();
}

export async function resetPasswordStep2(
  data: PasswordResetToken
): Promise<string> {
  const response = await fetch(`${url}/pwdreset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: data.token,
      pwd: data.pwd,
    }),
  });

  if (!response.ok) {
    // Handle non-200 status codes with specific error messages
    switch (response.status) {
      case 400:
        throw new Error('Invalid token or password');
      case 401:
        throw new Error('Unauthorized');
      default:
        throw new Error(
          `Network response was not ok (status: ${response.status})`
        );
    }
  }

  return response.json();
}

export async function deleteAccount(token: string): Promise<string> {
  const response = await fetch(`${url}/usermgnt/delete`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Handle non-200 status codes with specific error messages
    switch (response.status) {
      case 401:
        throw new Error('Unauthorized');
      default:
        throw new Error(
          `Network response was not ok (status: ${response.status})`
        );
    }
  }

  return response.json();
}
