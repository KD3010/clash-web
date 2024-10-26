'use client'
import React, { createContext, useReducer, type ReactNode } from "react";

interface InititalSessionType {
  name: string,
  email: string,
  isVerified: boolean
}

const initialSession: InititalSessionType = {
  name: '',
  email: '',
  isVerified: false
}

export const SessionContext = createContext<InititalSessionType>(initialSession);
export const SessionDispatchContext = createContext(null);

export default function AuthProvider({children}: {children: ReactNode}) {

  const [session, dispatch] = useReducer<any>(sessionReducer, initialSession)

  return (
    <SessionContext.Provider value={session as any}>
      <SessionDispatchContext.Provider value={dispatch as any}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionContext.Provider>
  )
}

function sessionReducer(state: InititalSessionType, action: any) {
  switch(action.type) {
    case 'LOGIN': {
      return state = {
        name: action.payload.name,
        email: action.payload.email,
        isVerified: action.payload.isVerified
      }
    }
    case 'LOGOUT': {
      return state = initialSession;
    }
    default: {
      throw Error('Unknown Action : ' + action.type)
    }
  }
}