import { AppProps } from 'next/app';
import './styles.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme/theme';
import '@fontsource/montserrat';
import { Swibc } from '../layouts/sidebar';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout): any => {
    const getLayout = Component.getLayout;

    if (getLayout) {
        return getLayout(<Component {...pageProps} />);
    }

    return (
        <ChakraProvider theme={theme}>
            <Swibc>
                <Component {...pageProps} />
            </Swibc>
        </ChakraProvider>
    );
};

export default CustomApp;
