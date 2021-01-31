import Typography from '@material-ui/core/Typography'
import Link from './link'

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link to='/' color='inherit'>
        Localhost
      </Link>
      &nbsp;
      {new Date().getFullYear()}
      .
    </Typography>
  )
}

export default Copyright
