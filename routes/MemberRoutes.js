const express = require('express');
const router = express.Router();
const memberController = require('../controller/member.js');
/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: integer
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: string
 *         penaltyUntil:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /members:
 *   get:
 *     summary: Retrieve a list of members
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/members', memberController.listMembers);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Add a new member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 */
router.post('/members', memberController.addMember);

module.exports = router;