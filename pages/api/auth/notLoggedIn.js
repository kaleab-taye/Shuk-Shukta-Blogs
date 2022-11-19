export default function notLoggedIn(req, res) {
  res.status(401).send({ message: 'Auth required' });
}

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }
  