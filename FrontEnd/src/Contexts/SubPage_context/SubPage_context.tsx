import { createContext,useContext,useState } from 'react';
import { subPageState } from '../../Interfaces_and_types/Activity/interfaces_and_types_for_data';

const initialState: subPageState = {
    modeToOpenBox: undefined,
}

const SubPageContext = createContext<{state: subPageState, setState: (value: subPageState) => void} | undefined>(undefined)

export const SubPageProvider = ({ children }: {children: React.ReactNode}) => {
    const [state,setState] = useState<subPageState>(initialState)

    return (
    <SubPageContext.Provider value={{state,setState}}> 
      {children}
    </SubPageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSubPage = () => {
  const context = useContext(SubPageContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};