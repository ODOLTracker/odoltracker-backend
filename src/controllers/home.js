/**
 * GET /
 * Home page
 */
export const index = (req, res) => res.send('<h1>Halo, dunia!</h1>');

/**
 * GET /health
 * Health check
 */
export const healthCheck = (req, res) => res.json({ success: true });