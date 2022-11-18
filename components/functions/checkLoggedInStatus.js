export default function checkLoggedInStatus() {
  try {
    let user = JSON.parse(localStorage.getItem('user'));

    // console.log('jj',typeof(Json.parse(JSON.parse(JSON.parse(user)))))
    if (user.accessToken) {
      return true;
    } else {
      throw 'user not found';
    }
  } catch (error) {
    return false;
  }
}
