// React
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// UI & Layout
import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from './MainLayout';
import { motion } from 'framer-motion';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Cookies
import Cookies from 'universal-cookie';

// API
import { eventLiveState } from './api/api';

// Context
import AuthContext from './context/AuthContext';
import EventContext from './context/EventContext';

// Views - Dashboard
import Dashboard from './views/Dashboard/Dashboard';
import PreEvent from './views/Dashboard/PreEvent';
import EventEnd from './views/Dashboard/EventEnd';
import OffSeason from './views/Dashboard/OffSeason';

// Views - Navigation routes
import Schedule from './views/Schedule/Schedule';
import Hunting from './views/Hunting/Hunting';
import Profile from './views/Profile/Profile';
import Glance from './views/Glance/Glance';

// Views - Leaderboard
import Leaderboard from './views/Leaderboard/Leaderboard';
import WRHolders from './views/WRHolders/WRHolders';

// Views - Streamer Info
import StreamerInfo from './views/StreamerInfo/StreamerInfo';

// Views - Admin
import AdminIndex from './views/Admin/AdminIndex';
import EventManager from './views/Admin/EventManager';
import WRManager from './views/Admin/WRManager';
import MapManager from './views/Admin/MapManager';

// Views - Widgets
import { Widgets } from './views/Widgets/WidgetsLayout';
import { ServerWidgets } from './views/Widgets/ServerWidgets/ServerWidgets';

const cookies = new Cookies();

const queryClient = new QueryClient();

import theme from './utils/theme';
import '@fontsource/outfit/200.css';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';

const App = () => {
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const [authentication, setAuthentication] = useState({
    isLoggedIn: (cookies.get('token') || '') !== '',
    token: cookies.get('token') || '',
    expires: cookies.get('expires') || '',
  });

  // Interface for the event state
  interface EventState {
    isLive: string;
    name: string;
    type: string;
    edition: number;
  }

  // State hook with the initial state and type annotation
  const [event, setEvent] = useState<EventState>({
    isLive: 'offseason',
    name: '',
    type: '',
    edition: 0,
  });

  const Loader = () => (
    // Think about better skeleton
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    ></motion.div>
  );

  // EventSwitcher component with typed props and return type
  const EventSwitcher: React.FC<{ event: EventState }> = ({ event }) => {
    if (isLoadingEvents) {
      return <Loader />;
    }
    switch (event.isLive) {
      case 'active':
        return <Dashboard />;
      case 'post':
        return <EventEnd />;
      case 'pre':
        return <PreEvent />;
      default:
        return <OffSeason />;
    }
  };

  useEffect(() => {
    eventLiveState()
      .then(
        (data: {
          status: string;
          type?: string;
          edition?: number;
          name?: string;
        }) => {
          setEvent({
            isLive: data.status,
            type: data.type?.toLowerCase() || 'e',
            edition: data.edition || 0,
            name: data.name || 'over',
          });
          setIsLoadingEvents(false); // Indicate loading completion
        }
      )
      .catch(error => {
        setEvent({
          isLive: 'offseason',
          name: '',
          type: '',
          edition: 0,
        });
        setIsLoadingEvents(false); // Indicate loading completion
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <EventContext.Provider value={{ event, setEvent }}>
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
          <ChakraProvider theme={theme}>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<EventSwitcher event={event} />} />
                <Route path='schedule' element={<Schedule />} />
                <Route path='hunting' element={<Hunting />} />
                <Route path='wrs' element={<WRHolders />} />
                <Route path='leaderboard' element={<Leaderboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='glance' element={<Glance />} />
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
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContext.Provider>
      </EventContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
