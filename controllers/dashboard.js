exports.getDashboardData = (req, res, next) => {
  res.status(200).json({
    successful: true,
    user: {
      username: req.user.username
    }
  })
}
