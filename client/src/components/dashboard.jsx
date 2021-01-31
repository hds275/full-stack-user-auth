import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@material-ui/core/Button'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Loader from './loader'

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: 'right',
    marginTop: theme.spacing(1)
  }
}))

const Dashboard = () => {
  const s = useStyles()
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    async function fetchUser () {
      try {
        const result = await axios.get('/api/v1/dashboard')
        if (result.data.successful) {
          setUser(result.data.user)
        }
      } catch (error) {
        setError(true)
      }
    }
    fetchUser()
  }, [])

  const handleSignOut = () => {
    history.push('/signOut')
  }

  if (error) {
    return (
      <div className='container'>
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          component='p'
        >
          Oooppss... Something went wrong. Please inform us of your problem.{' '}
          <a href='mailto:support@localhost.com'>support@localhost.com</a>
        </Typography>
      </div>
    )
  }

  if (!user) {
    return <Loader />
  }

  return (
    <div className='container'>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='textPrimary'
        gutterBottom
      >
        Hello, {user.username}
      </Typography>
      <Typography
        variant='h5'
        align='center'
        color='textSecondary'
        component='p'
      >
        What have you been up to?
      </Typography>
      <div className={s.buttonContainer}>
        <Button onClick={handleSignOut} variant='outlined'>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
