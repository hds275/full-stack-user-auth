import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './components/auth/sign-in'
import SignUp from './components/auth/sign-up'
import Dashboard from './components/dashboard'
import PrivateRoute from './components/private-route'
import Copyright from './components/copyright'
import SignOut from './components/auth/sign-out'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import isSingedIn from './utils/is-signed-in'

const theme = createMuiTheme({})
const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className='app__container'>
          <main className='app__main'>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute exact path='/signOut' component={SignOut} />
              {!isSingedIn() && (
                <>
                  <Route exact path='/signIn' component={SignIn} />
                  <Route exact path='/signUp' component={SignUp} />
                </>
              )}
              <Route render={() => <Redirect to='/' />} />
            </Switch>
          </main>
          <footer className='app__footer'>
            <Copyright />
          </footer>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
