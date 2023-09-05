const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// add users 

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route: POST /students (Create a new student)

router.post("/students/", verifyTokenAndAdmin, async (req, res) => {
  const newStudent = new Student(req.body);

  try {
    const savedStudent = await newStudent.save();
    res.status(200).json(savedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE students

router.put("/students/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE students

router.delete("/students/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET STUDENT
router.get("/students/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const { password, ...others } = student._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Students
router.get("/students/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Student.find().sort({ _id: -1 }).limit(5)
      : await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route: POST /Faculty (Create a new Faculty)


router.post("/faculty/", verifyTokenAndAdmin, async (req, res) => {
  const newFaculty = new Faculty(req.body);

  try {
    const savedFaculty = await newFaculty.save();
    res.status(200).json(savedFaculty);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE Faculty

router.put("/faculty/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFaculty);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
