// React
import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// UI & Layout
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import MainLayout from './MainLayout';

// React Query
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Cookies
import Cookies from 'universal-cookie';

// API
import { eventLiveState } from './api/api';

// Context
import AuthContext from './context/AuthContext';
import EventContext from './context/EventContext';

// Views - Dashboard
const Dashboard = lazy(() => import('./views/Dashboard/Dashboard'));
const PreEvent = lazy(() => import('./views/Dashboard/PreEvent'));
const EventEnd = lazy(() => import('./views/Dashboard/EventEnd'));
const OffSeason = lazy(() => import('./views/Dashboard/OffSeason'));

// Views - Navigation routes
const Schedule = lazy(() => import('./views/Schedule/Schedule'));
const Hunting = lazy(() => import('./views/Hunting/Hunting'));
const Profile = lazy(() => import('./views/Profile/Profile'));
const Glance = lazy(() => import('./views/Glance/Glance'));

// Views - Leaderboard
const Leaderboard = lazy(() => import('./views/Leaderboard/Leaderboard'));
const WRHolders = lazy(() => import('./views/WRHolders/WRHolders'));

// Views - Streamer Info
const StreamerInfo = lazy(() => import('./views/StreamerInfo/StreamerInfo'));

// Views - Player info
const Player = lazy(() => import('./views/Player/Player'));

// Views - Admin
const AdminIndex = lazy(() => import('./views/Admin/AdminIndex'));
const EventManager = lazy(() => import('./views/Admin/EventManager'));
const WRManager = lazy(() => import('./views/Admin/WRManager'));
const MapManager = lazy(() => import('./views/Admin/MapManager'));

// Views - Widgets
import { Widgets } from './views/Widgets/WidgetsLayout';
import { ServerWidgets } from './views/Widgets/ServerWidgets/ServerWidgets';

const cookies = new Cookies();

import theme from './utils/theme';
import '@fontsource/outfit/200.css';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';

const App = () => {
  const [authentication, setAuthentication] = useState({
    isLoggedIn: (cookies.get('token') || '') !== '',
    token: cookies.get('token') || '',
    expires: cookies.get('expires') || '',
  });

  // State hook with the initial state and type annotation
  const [event, setEvent] = useState<EventStatus>({
    status: 'active',
    type: '',
    edition: 0,
    start: new Date('2024-11-01T20:00:00.000Z'),
  });

  // EventSwitcher component with typed props and return type
  const EventSwitcher: React.FC<{ event: EventStatus }> = ({ event }) => {
    if (isSuccessEventStatus) {
      switch (event.status) {
        case 'active':
          return <Dashboard />;
        case 'post':
          return <EventEnd />;
        case 'pre':
          return <PreEvent />;
        default:
          return <OffSeason />;
      }
    }
    return null; // Add a default return for when isSuccessEventStatus is false
  };
  // Fetch servers data
  const { data: eventStatus, isSuccess: isSuccessEventStatus } = useQuery({
    queryKey: ['eventstatus'],
    queryFn: async () => await eventLiveState(),
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (isSuccessEventStatus) {
      if (import.meta.env.DEV) {
        setEvent({
          status: localStorage.getItem('eventLiveStatus') || eventStatus.status,
          type: eventStatus.type?.toLowerCase() || '',
          edition: eventStatus.edition || 0,
          start: new Date(eventStatus.start) || Date.now(),
        });
      } else {
        setEvent({
          status: eventStatus.status,
          type: eventStatus.type?.toLowerCase() || '',
          edition: eventStatus.edition || 0,
          start: new Date(eventStatus.start) || Date.now(),
        });
      }
    }
  }, [isSuccessEventStatus]);

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      <AuthContext.Provider value={{ authentication, setAuthentication }}>
        <ChakraProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<EventSwitcher event={event} />} />
              <Route path='schedule' element={<Schedule />} />
              <Route path='hunting' element={<Hunting />} />
              <Route path='wrs' element={<WRHolders />} />
              <Route path='leaderboard' element={<Leaderboard />} />
              <Route path='profile' element={<Profile />} />
              <Route path='glance' element={<Glance />} />
              {/* map fins  */}
              <Route path='player/:playerName' element={<Player />} />
              {/* Move admin to separate Route path group and add new layout */}
              <Route path='/kackend' element={<AdminIndex />} />
              <Route path='/kackend/events' element={<EventManager />} />
              <Route path='/kackend/wrs' element={<WRManager />} />
              <Route path='/kackend/maps' element={<MapManager />} />
              <Route path='/streamerstuff' element={<StreamerInfo />} />
              <Route path='/widgets' element={<Widgets />}>
                <Route index element={<ServerWidgets />} />
              </Route>
              <Route path='*' element={<div>Nothing here</div>} />
            </Route>
          </Routes>
          </Suspense>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContext.Provider>
    </EventContext.Provider>
  );
};

export default App;
