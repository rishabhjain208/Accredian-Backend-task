const prisma = require("../prismaClient/connection");

module.exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: e.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: e.message,
    });
  }
};
