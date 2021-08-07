import { Provider } from 'react-redux'
import store from '../redux/store'

import { NavMenu,Footer } from '../components'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/nav-menu.css'
import logo from './logo-notext.svg'


function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<NavMenu logo={logo} />
			<Component {...pageProps} />
			<Footer />
		</Provider>
	)
}

export default MyApp
