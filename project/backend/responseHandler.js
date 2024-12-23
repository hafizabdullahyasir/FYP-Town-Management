module.exports = (res, result) => {
  if (result.error) {
    return res.status(400).json({
      status: 400,
      data: null,
      error: result.error,
    });
  }

  return res.status(200).json({
    status: 200,
    data: result.data,
    error: null,
  });
};
