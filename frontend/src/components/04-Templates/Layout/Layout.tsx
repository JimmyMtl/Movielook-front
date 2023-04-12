import React, {useEffect} from 'react';
import Navbar from "@components/03-Organisms/Navbar/Navbar";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Router} from 'next/dist/client/router'
import Footer from "@components/03-Organisms/Footer/Footer";
import AuthProvider from "@reducer/Auth/AuthContext"
// NProgress?.configure({
//     showSpinner: false,
// })
Router.events.on('routeChangeStart', () => NProgress?.start())
Router.events.on('routeChangeComplete', () => NProgress?.done())
Router.events.on('routeChangeError', () => NProgress?.done())
const Layout = ({children}) => {
    return (
        <AuthProvider>
            <Navbar/>
            {children}
            <Footer/>
            <ToastContainer theme={'dark'}/>
        </AuthProvider>
    );
};

export default Layout;