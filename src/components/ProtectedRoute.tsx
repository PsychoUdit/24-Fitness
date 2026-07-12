import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    )
  }

  return <>{children}</>
}
