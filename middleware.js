// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as jose from 'jose';
import { useRouter } from 'next/router';
import isAuthValid from './components/api/functions/isAuthValid';
import NextCors from 'nextjs-cors';

export async function middleware(NextRequest) {
  //working with the api
  if (
    NextRequest.nextUrl.pathname.split('/')[1] === 'api' &&
    NextRequest.nextUrl.pathname.split('/')[2] === 'user'
    // NextRequest.nextUrl.pathname.split('/')[3] === ''
  ) {
    // server log display
    console.log(
      NextResponse.next().status +
        ' ' +
        NextRequest.method +
        ' ' +
        NextRequest.url
    );
    if (!(await isAuthValid(NextRequest.headers.get('Authorization')))) {
      NextRequest.nextUrl.pathname = '/api/auth/notLoggedIn';
      console.log('token failed');
      return NextResponse.redirect(NextRequest.nextUrl);
    } else {
      return NextResponse.next();
    }
  }
  // else {
  //   await NextCors(NextRequest, NextResponse, {
  //     // Options
  //     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  //     origin: '*',
  //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //  });
  // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!static|_next|favicon.ico).*)',
  ],
};

// if (NextRequest.url.includes('/api/upload')) {
//   console.log('found')
//   try {
//     const mongoDb_url = process.env.mongoDb_url;

//     const conn = mongoose.createConnection(mongoDb_url);

//     conn.once('open', () => {
//       // init stream
//       let gfs = Grid(conn.db, mongoose.mongo);
//       gfs.collection('uploads');
//     });

//     //Create Storage Engine
//     const storage = new GridFsStorage({
//       url: mongoDb_url,
//       file: (req, file) => {
//         return new Promise((resolve, reject) => {
//           crypto.randomBytes(16, (err, buf) => {
//             if (err) {
//               return reject(err);
//             }
//             const filename =
//               buf.toString('hex') + path.extname(file.originalname);
//             const fileInfo = {
//               filename: filename,
//               bucketName: 'uploads',
//             };
//             resolve(fileInfo);
//           });
//         });
//       },
//     });

//     const upload = multer({ storage });
//     upload.single('file');

//     // const secret = new TextEncoder().encode(process.env.jwtAccessToken);
// const accessToken = NextRequest.headers.get('Authorization').split(' ')[1];
//     // let result = await jose.jwtVerify(accessToken, secret);
//   } catch (error) {
//     console.log(error);
//     // console.log('err')
//     // NextResponse.redirect('/user/login')
//   }
// }
