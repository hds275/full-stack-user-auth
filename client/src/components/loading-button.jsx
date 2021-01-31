import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingButton = ({ isLoading, disabled, ...other }) => (
  <Button
    disabled={isLoading || disabled}
    startIcon={isLoading && <CircularProgress />}
    {...other}
  />
)

export default LoadingButton
