import User from '../model/userModel.js';


// create user
export const create = async (req, res) => {
    try {
        const {email} = req.body;

        const userExist = await User .findOne({email});
        if (userExist) {
            return res.status(400).json({errorMessage: "User already exists"});
        }
        const newUser = await User.create(req.body);
        const savedUser = await newUser.save();
        // res.status(201).json({message: "User Created Successfully", user: savedUser});
        res.status(200).json({message: "User created sucessfully"});
    } catch (error) {
        res.status(400).json({errorMessage : error.message});
    }         
};

//getall users
export const getAllUsers=async(req,res)=>{
    try {
        const userData = await User.find();
        if(!userData || userData.length === 0) {
            return res.status(404).json({errorMessage: "404 No users found"});
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}


//get all users by id(view user)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

//update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ errorMessage: "404 User not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        // res.status(200).json({ message: "User updated successfully", user: updatedUser });
        res.status(200).json({message: "User Updated Sucessfully"});
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ errorMessage: "404 User not found" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" }); 
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};              
