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
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .max(128, 'Password should be of maximum 128 characters length')
    .required('Password is required')
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
const SignIn = ({ history }) => {
  const s = useStyles()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      setError(false)
      try {
        const result = await axios.post('/api/v1/auth/signIn', values)
        if (result?.data?.successful) {
          history.push('/')
        } else {
          setError(true)
        }
      } catch (error) {
        setError(true)
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
          Sign in
        </Typography>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <LoadingButton
            disabled={isLoading}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={s.submit}
          >
            Sign In
          </LoadingButton>
          {error && (
            <Typography component='div' variant='subtitle1' color='error'>
              Your email and password are incorrect
            </Typography>
          )}
          <Grid container>
            <Grid item>
              <Link variant='body2' to='/signUp'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignIn
