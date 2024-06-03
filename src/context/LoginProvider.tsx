import { createContext, ReactNode, useContext, useState } from 'react';

interface LoginContextType {
  loginState: boolean,
  switchLogin: (flag: boolean) => void
}

const LoginContext = createContext<LoginContextType>({ loginState: false, switchLogin: () => { } });


type LoginProviderType = { children: ReactNode; }
export function LoginProvider({ children }: LoginProviderType) {
  const [loginState, setLoginState] = useState(false);

  const switchLogin = (flag: boolean) => {
    setLoginState(flag);
  }
  const LoginProviderValue: LoginContextType = { loginState, switchLogin };
  return (
    <LoginContext.Provider value={LoginProviderValue}>
      {children}
    </LoginContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  return context;
}
