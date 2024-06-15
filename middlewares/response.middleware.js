const responseMiddleware = (req, res, next) => {
  // Implement middleware that returns result of the query
  if (res.err) {
    const status = res.err.status || 500;
    const message = res.err.message || 'Internal Server Error';
    res.status(status).json({ error: true, message: message });
  } else {
    res.status(200).json(res.data);
  }
  next();
};

export { responseMiddleware };
