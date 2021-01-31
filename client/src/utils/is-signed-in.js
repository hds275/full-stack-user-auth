import Cookies from 'js-cookie'

const isSingedIn = () => Cookies.get('is-signed-in') === 'true'

export default isSingedIn
