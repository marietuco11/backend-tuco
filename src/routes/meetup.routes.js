const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const requireAuth = require('../middlewares/auth.middleware');
const validateRequest = require('../middlewares/validateRequest');

const {
  createMeetup,
  getOrganizedMeetups,
  getInvitedMeetups,
  respondToMeetup,
  cancelMeetup,
  getPendingMeetupInvitationsCount
} = require('../controllers/meetup.controller');

const {
  createMeetupValidator,
  meetupIdValidator,
  respondMeetupValidator
} = require('../validators/meetup.validators');

/**
 * @swagger
 * tags:
 *   name: Quedadas
 *   description: Gestión de quedadas entre amigos
 */

router.use(cookieParser());
router.use(requireAuth);

/**
 * @swagger
 * /api/meetups:
 *   post:
 *     summary: Crear una quedada
 *     tags: [Quedadas]
 */
router.post('/', createMeetupValidator, validateRequest, createMeetup);

/**
 * @swagger
 * /api/meetups/organized:
 *   get:
 *     summary: Obtener mis quedadas organizadas
 *     tags: [Quedadas]
 */
router.get('/organized', getOrganizedMeetups);

/**
 * @swagger
 * /api/meetups/invited:
 *   get:
 *     summary: Obtener quedadas a las que me han invitado
 *     tags: [Quedadas]
 */
router.get('/invited', getInvitedMeetups);

/**
 * @swagger
 * /api/meetups/{meetupId}/respond:
 *   put:
 *     summary: Responder a una quedada
 *     tags: [Quedadas]
 */
router.put('/:meetupId/respond', respondMeetupValidator, validateRequest, respondToMeetup);

/**
 * @swagger
 * /api/meetups/{meetupId}/cancel:
 *   put:
 *     summary: Cancelar una quedada
 *     tags: [Quedadas]
 */
router.put('/:meetupId/cancel', meetupIdValidator, validateRequest, cancelMeetup);

/**
 * @swagger
 * /api/meetups/pending-invitations-count:
 *   get:
 *     summary: Obtener el conteo de invitaciones pendientes a quedadas
 *     tags: [Quedadas]
 */
router.get('/pending-invitations-count', getPendingMeetupInvitationsCount);

module.exports = router;