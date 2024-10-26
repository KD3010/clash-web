import React, { type ReactNode } from 'react'
import AuthProvider from './AuthProvider'

export default function AppProvider({children}: {children: ReactNode}) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}
