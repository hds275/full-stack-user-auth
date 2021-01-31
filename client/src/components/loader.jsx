import CircularProgress from '@material-ui/core/CircularProgress'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '100%',
    width: '100%'
  }
})
const Loader = () => (
  <div className={useStyles().container}>
    <CircularProgress />
  </div>
)

export default Loader
