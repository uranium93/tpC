/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/css/global.css';

export default function MyApp({ Component, pageProps }): JSX.Element {
    return <Component {...pageProps} />;
}
