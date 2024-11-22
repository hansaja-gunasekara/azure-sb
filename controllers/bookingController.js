const { Theater } = require("../models/theater");
const { Booking } = require("../models/booking");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const { Seat } = require("../models/seat");

exports.createBookingEvent = async (req, res) => {
  try {
    const {
      theater,
      seats, // Array of seat identifiers (can be seat IDs or names)
      customerName,
      customerEmail,
      totalAmount,
      bookingDate,
      bookingTime,
      event,
    } = req.body;

    const theaterData = await Theater.findById(theater);
    if (!theaterData)
      return res.status(404).json({ error: "Theater not found" });

    const theaterName = theaterData.name;
    // Create a new booking
    const newBooking = new Booking({
      theater: theater, // Cast the theater ID to ObjectId
      event: event,
      seats: seats.map((seat) => seat),
      customerName,
      customerEmail,
      totalAmount,
      bookingDate,
      bookingTime,
      theaterName,
    });

    console.log("New booking:", newBooking);

    const savedBooking = await newBooking.save();

    if (savedBooking) {
      const qrData = JSON.stringify({
        bookingId: savedBooking._id,
        customerName,
        theaterName,
        seats,
        bookingDate,
        bookingTime,
      });

      // Generate the QR code as a buffer
      const qrCodePath = path.join(__dirname, "qrcode.png");
      await QRCode.toFile(qrCodePath, qrData);

      let config = {
        service: "gmail",
        auth: {
          user: "reservefor.now@gmail.com",
          pass: "uyel eomc oouz iaux",
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "ReserveNow",
          link: "https://mailgen.js/",
        },
      });

      let response = {
        body: {
          name: customerName,
          intro: "Your booking has been confirmed!",
          table: {
            data: [
              {
                name: customerName,
                Location: theaterName,
                time: bookingTime,
                payment: totalAmount + " LKR",
              },
            ],
          },
          outro: "Looking forward to serving you",
        },
      };

      let mailContent = MailGenerator.generate(response);

      let message = {
        from: "reservefor.now@gmail.com",
        to: customerEmail,
        subject: "Booking Confirmation",
        html: `${mailContent}<p><strong>Your QR Code:</strong></p><img src="cid:qrcode" alt="QR Code" />`,
        attachments: [
          {
            filename: "qrcode.png",
            path: qrCodePath,
            cid: "qrcode", // same as the cid used in the HTML
          },
        ],
      };

      transporter
        .sendMail(message)
        .then(() => {
          // Delete the QR code file after sending the email
          fs.unlinkSync(qrCodePath);
          return res
            .status(201)
            .json({ message: "Booking created successfully", savedBooking });
        })
        .catch((error) => {
          console.log("Error sending email:", error.message);
          res.status(500).json({ error: "Failed to send confirmation email" });
        });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookingsEvent = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingByCustomerIdEvent = async (req, res) => {
  const { customerEmail } = req.body;

  if (!customerEmail) {
    return res.status(400).json({ error: "Customer email is required" });
  }

  try {
    const bookings = await Booking.find({ customerEmail });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.getBookingByIdEvent = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBookingEvent = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBookingEvent = async (req, res) => {
  try {
    // Step 1: Find the booking by ID
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Step 2: Extract theater ID and seats array from the booking
    const theaterId = booking.theater;
    const seats = booking.seats; // Example: ["VIP-1-12", "VIP-1-13"]

    // Step 3: Iterate over each seat in the booking and update availability
    const updatePromises = seats.map(async (seatIdentifier) => {
      // Split the seatIdentifier (e.g., "VIP-1-12") into section, row, and number
      const [section, row, number] = seatIdentifier.split("-");

      // Find the seat by theater, section, row, and number, and set isAvailable to true
      await Seat.findOneAndUpdate(
        { theater: theaterId, section, row, number },
        { isAvailable: true }
      );
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

    // Step 4: Delete the booking
    await Booking.findByIdAndUpdate(req.params.id, { state: "released" });

    res.json({ message: "Booking deleted and seats released successfully" });
  } catch (error) {
    console.error("Error deleting booking and updating seats:", error);
    res.status(500).json({ error: "Server error" });
  }
};


