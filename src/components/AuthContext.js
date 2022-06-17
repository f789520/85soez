import React, { createContext, useContext } from "react";

const AuthContext = React.createContext();
export const LoadingContext = createContext(null);

export function AuthProvider({ children, value }) {
  const isLoading = value.isLoading;
  const setIsLoading = value.setIsLoading;
  const isLoadingGetMe = value.isLoadingGetMe;
  return (
    <AuthContext.Provider value={value}>
      <LoadingContext.Provider
        value={{ isLoading, setIsLoading, isLoadingGetMe }}
      >
        {children}
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
