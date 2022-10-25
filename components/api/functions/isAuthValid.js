import * as jose from 'jose';
export default async function isAuthValid(authorization) {
  try {
    const secret = new TextEncoder().encode(process.env.jwtAccessToken);
    const accessToken = authorization.split(' ')[1];
    let result = await jose.jwtVerify(accessToken, secret);
    console.log('token check',await result.id);
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
  // console.log('ttt')
}
