const express = require("express");
const {
  createBookingEvent,
  getAllBookingsEvent,
  getBookingByCustomerIdEvent,
  getBookingByIdEvent,
  updateBookingEvent,
  deleteBookingEvent,
} = require("../controllers/bookingController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         theater:
 *           type: string
 *         seats:
 *           type: array
 *           items:
 *             type: string
 *         customerName:
 *           type: string
 *         customerEmail:
 *           type: string
 *         totalAmount:
 *           type: number
 *         bookingDate:
 *           type: string
 *           format: date
 *         bookingTime:
 *           type: string
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createBookingEvent);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A list of bookings
 *       500:
 *         description: Server error
 */
router.get("/", getAllBookingsEvent);

/**
 * @swagger
 * /api/bookings/customer:
 *   post:
 *     summary: Get bookings by customer email
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of bookings by customer
 *       400:
 *         description: Bad request, customer email required
 *       500:
 *         description: Failed to fetch bookings
 */
router.post("/customer", getBookingByCustomerIdEvent);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: A single booking
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getBookingByIdEvent);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateBookingEvent);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteBookingEvent);

module.exports = router;
