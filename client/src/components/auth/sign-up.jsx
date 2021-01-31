import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '../link'
import axios from 'axios'

import LoadingButton from '../loading-button'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup
    .string('Enter your username')
    .required('Username is required')
    .min(4, 'Username should be of minimum 4 characters length')
    .max(50, 'Username should be of maximum 50 characters length'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .max(128, 'Password should be of maximum 128 characters length')
    .required('Password is required'),
  firstName: yup
    .string('Enter your first name')
    .required('First name is required')
    .matches(/^[a-zA-Z ]+$/, {
      message: 'First name should only contain letter'
    })
    .max(50, 'First name should be of maximum 50 characters length'),
  lastName: yup
    .string('Enter your last name')
    .required('Last name is required')
    .matches(/^[a-zA-Z ]+$/, {
      message: 'Last name should only contain letter'
    })
    .max(50, 'Last name should be of maximum 50 characters length')
})

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  serverError: {
    ':first-letter': {

      textTransform: 'capitalize'
    }
  }
}))

const unexpectedErrorMessage = 'Oooppp... Something went wrong!'
const SignUp = ({ history }) => {
  const s = useStyles()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setError('')
      try {
        const result = await axios.post('/api/v1/auth/signUp', values)
        if (result.data.successful) history.push('/')
      } catch (_error) {
        setError(_error?.response?.data?.error || unexpectedErrorMessage)
      }
      setIsLoading(false)
    }
  })

  return (
    <Container component='main' maxWidth='xs' className='container'>
      <div className={s.paper}>
        <Avatar className={s.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                autoComplete='firstName'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lastName'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <LoadingButton
            disabled={isLoading}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={s.submit}
          >
            Sign Up
          </LoadingButton>
          {!!error && (
            <Typography component='div' variant='subtitle1' color='error'>
              {error === unexpectedErrorMessage
                ? (
                  <>
                    if you still cannot sign up. Please contact us{' '}
                    <a href='mailto:support@localhost.com'>
                      support@localhost.com
                    </a>
                  </>
                  )
                : (
                  <span className={s.serverError}>{error}</span>
                  )}
            </Typography>
          )}
          <Grid container justify='flex-end'>
            <Grid item>
              <Link variant='body2' to='/signIn'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignUp
