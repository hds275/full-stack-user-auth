import MLink from '@material-ui/core/Link'
import { Link as RLink } from 'react-router-dom'

const Link = (props) => <MLink component={RLink} {...props} />

export default Link
