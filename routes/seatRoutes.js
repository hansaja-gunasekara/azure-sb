const express = require("express");

const {
  getByTheaterIdEvent,
  createSeatEvent,
  createMultipleSeatsEvent,
  getSeatByIdEvent,
  deleteSeatEvent,
} = require("../controllers/seatController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: API for managing theater seats
 */

/**
 * @swagger
 * /seats/{theaterId}:
 *   get:
 *     summary: Get all seats for a specific theater
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: theaterId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the theater
 *     responses:
 *       200:
 *         description: List of seats for the theater
 *       500:
 *         description: Server error
 */
router.get("/:theaterId", getByTheaterIdEvent);

/**
 * @swagger
 * /seats:
 *   post:
 *     summary: Book seats in a theater
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theaterId:
 *                 type: string
 *               selectedSeats:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               theaterId: "60d21b4667d0d8992e610c85"
 *               selectedSeats: ["A-1", "A-2"]
 *     responses:
 *       200:
 *         description: Seats booked successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", createSeatEvent);

/**
 * @swagger
 * /seats/create:
 *   post:
 *     summary: Create multiple seats for a theater
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theater:
 *                 type: string
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     layout:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: boolean
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Image URL for the theater layout
 *     responses:
 *       201:
 *         description: Seats created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", createMultipleSeatsEvent);

/**
 * @swagger
 * /seats/{id}:
 *   get:
 *     summary: Get a seat by ID
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seat
 *     responses:
 *       200:
 *         description: Details of the seat
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getSeatByIdEvent);

/**
 * @swagger
 * /seats/{id}:
 *   delete:
 *     summary: Delete a seat by ID
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seat
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSeatEvent);


module.exports = router;
