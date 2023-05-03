export const profileView = (req, res) => {
  res.render('profile', {
    pageTitle: 'Profile',
    user: req.session.user
  })
}
