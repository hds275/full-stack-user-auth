import { Redirect, Route } from 'react-router-dom'
import isSingedIn from '../utils/is-signed-in'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isSingedIn() ? <Component {...props} /> : <Redirect to='/signIn' />}
  />
)

export default PrivateRoute
