import { createContext,useContext,useState} from 'react';
import { activityState } from '../../Interfaces_and_types/Activity/interfaces_for_activity';

const initialState: activityState = {
    list_lezioni: [],
    list_verifiche: [],
    list_compiti: [],
    list_personali: [],
}

const ActivityContext = createContext<{state:activityState, setState: (value:activityState) => void } | undefined>(undefined)

export const ActivityProvider = ({ children }: {children: React.ReactNode}) => {
    const [state,setState] = useState<activityState>(initialState)

    return (
    <ActivityContext.Provider value={{state,setState}}> 
      {children}
    </ActivityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};