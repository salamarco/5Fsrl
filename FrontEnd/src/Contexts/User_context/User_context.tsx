import React, { createContext,useReducer,useContext } from 'react';
import { signUpData,userState } from '../../Interfaces_and_types/Manage_account/interfaces_and_types_for_access';

interface AuthAction{
    type: 'LOGIN' | 'LOGOUT'
    data?: signUpData
}

const initialState: userState = {
  isLoggedIn: false,
};

const AuthContext = createContext<{ state: userState; dispatch: React.Dispatch<AuthAction> } | undefined > (undefined);

function authReducer(state: userState, action: AuthAction): userState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true,userData:(action.data && action.data) };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}> 
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

