const express = require("express");
const { default: mongoose } = require("mongoose");
const {
  getAllShowTimesEvent,
  createShowTimeEvent,
  getShowTimeByTheaterAndDateEvent,
  getShowTimeByIdEvent,
  deleteShowTimeByIdEvent,
  updateShowTimeByIdEvent,
  getShowTimesByEventId,
} = require("../controllers/showTimeController");

const router = express.Router();

router.get("/", getShowTimeByTheaterAndDateEvent);

/**
 * @swagger
 * tags:
 *   name: Showtimes
 *   description: Showtime management API
 */

/**
 * @swagger
 * /available:
 *   get:
 *     summary: Retrieve all showtimes
 *     tags: [Showtimes]
 *     responses:
 *       200:
 *         description: A list of showtimes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     description: Showtime date.
 *                     example: "2024-12-25"
 */
router.get("/available", getAllShowTimesEvent);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new showtime
 *     tags: [Showtimes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theater:
 *                 type: string
 *                 description: Theater ID for the showtime.
 *                 example: "64812f04cd28f4b9e7f84bde"
 *               date:
 *                 type: string
 *                 description: Date for the showtime.
 *                 example: "2024-12-25"
 *               times:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of available showtimes.
 *                 example: ["14:00", "18:00"]
 *     responses:
 *       201:
 *         description: Showtime created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post("/", createShowTimeEvent);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The showtime ID.
 *     responses:
 *       200:
 *         description: Showtime details.
 *       404:
 *         description: Showtime not found.
 */
router.get("/:id", getShowTimeByIdEvent);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The showtime ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2024-12-31"
 *               times:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["16:00", "20:00"]
 *     responses:
 *       200:
 *         description: Showtime updated.
 *       404:
 *         description: Showtime not found.
 */
router.put("/:id", updateShowTimeByIdEvent);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The showtime ID.
 *     responses:
 *       200:
 *         description: Showtime deleted.
 *       404:
 *         description: Showtime not found.
 */
router.delete("/:id", deleteShowTimeByIdEvent);

router.get("/events/:id", getShowTimesByEventId);


module.exports = router;
