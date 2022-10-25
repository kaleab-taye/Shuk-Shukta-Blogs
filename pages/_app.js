import Layout from '../components/Layout';
import '../styles/Nprogress.css';
import '../styles/globals.css';

import ReactTooltip from 'react-tooltip';



import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import { NextUIProvider } from '@nextui-org/react';
import React, { useState } from 'react';
// import 'nprogress/nprogress.css'; //styles of nprogress
//Route Events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });


function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <ReactTooltip
        padding="4px"
        delayShow={500}
        backgroundColor="primary"
        border={true}
        borderColor="secondary"
        arrowColor="secondary"
        textColor="textColor1"
        className="bg-primary"
      />
              <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// import React, { useState } from 'react';

// export const blogsContext = React.createContext();
// export const fullBlogsContext = React.createContext();
// export const setBlogContext = React.createContext();
// export default function BlogContextProvider(props) {

//   const [blogs, setBlogs] = useState(props.blogs);
//   const fullBlogs = props.blogs;
//   return (
//     <>
//       <fullBlogsContext.Provider value={fullBlogs}>
//         <setBlogContext.Provider value={setBlogs}>
//           <blogsContext.Provider value={blogs}>
//             {props.children}
//           </blogsContext.Provider>
//         </setBlogContext.Provider>
//       </fullBlogsContext.Provider>
//     </>
//   );
// }
