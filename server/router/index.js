import express from 'express';

const router = express.Router();

/** GET : /api-status : Check service status */
router.get('/api-status', (req, res) =>
    res.json({
        status: '200',
        message: 'Successfull!!'
    })
);

export default router;