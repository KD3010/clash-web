'use client'
import React, { createContext, useReducer, type ReactNode } from "react";
import axios from 'axios';

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

const SessionContext = createContext<InititalSessionType>(initialSession);
const SessionDispatchContext = createContext(null);

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

const API_BASE_PATH = 'http://localhost:8000/api';

export const registerUser = async (data: {name: string, email: string, password: string, confirm_password: string}, callbackFn: Function) => {
  axios.post(API_BASE_PATH + '/auth/register', data)
  .then(response => {
    callbackFn && callbackFn(response);
  }).catch(error => {
    callbackFn && callbackFn(error.response);
  })
}
