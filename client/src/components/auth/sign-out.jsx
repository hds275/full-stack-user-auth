import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import Loader from '../loader'

const SignOutButton = () => {
  const history = useHistory()
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await axios.get('/api/v1/auth/signOut')
      } catch (error) {}
      history.push('/signIn')
    }
    handleSignOut()
  }, [history])
  return <Loader />
}

export default SignOutButton
