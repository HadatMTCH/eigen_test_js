const express = require('express');
const router = express.Router();
const borrowController = require('../controller/borrow.js');

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - bookId
 *             properties:
 *               memberId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 */
router.post('/borrow', borrowController.borrowBook);

/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - bookId
 *             properties:
 *               memberId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 */
router.post('/return', borrowController.returnBook);

/**
 * @swagger
 * /check-books:
 *   get:
 *     summary: Check all books and their quantities
 *     responses:
 *       200:
 *         description: A list of books with their quantities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/check-books', borrowController.checkBooks);

/**
 * @swagger
 * /check-members:
 *   get:
 *     summary: Check all members and their borrowed books
 *     responses:
 *       200:
 *         description: A list of members with their borrowed books count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Member'
 *                   - type: object
 *                     properties:
 *                       borrowedBooksCount:
 *                         type: integer
 */
router.get('/check-members', borrowController.checkMembers);

module.exports = router;