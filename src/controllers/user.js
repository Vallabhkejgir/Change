import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    // const { name, email, password } = req.body;
    // const user = await User.create({ name, email, password });
    // res.status(201).json({ user });
    res.status(200).json({
        message: "ok"
    })
});

export { registerUser };