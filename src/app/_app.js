// pages/_app.js
import '../styles/globals.css'
import '@nextui-org/react/style.css';


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
