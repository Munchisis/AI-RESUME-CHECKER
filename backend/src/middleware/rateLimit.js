const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  standardHeaders: "draft-7", // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => req.user?._id?.toString() || ipKeyGenerator(req, res),
  message: {
    error: { message: "Too many analyses - please wait a minute and retry" }
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: "draft-7", // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => ipKeyGenerator(req, res),
  message: {
    error: { message: "Too many auth attempts - please wait and retry" }
  },
});

module.exports = {
  analyzeLimiter,
  authLimiter,
};