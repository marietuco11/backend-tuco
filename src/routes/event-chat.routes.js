const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const requireAuth = require('../middlewares/auth.middleware');
const { getEventMessages, sendEventMessage, getFriendsAttending } = require('../controllers/event-chat.controller');

router.use(cookieParser());

// Mensajes del chat de un evento (público — cualquiera puede leer)
router.get('/:eventId/messages', getEventMessages);

// Enviar mensaje (requiere auth)
router.post('/:eventId/messages', requireAuth, sendEventMessage);

// Amigos que van al evento (requiere auth)
router.get('/:eventId/friends', requireAuth, getFriendsAttending);

module.exports = router;