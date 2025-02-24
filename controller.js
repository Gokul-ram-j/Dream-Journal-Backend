import User from "./modal.js";

// endPoint->           /userdreamsDB/addUser?userEmail=<value>&userName=<value>
export const createUser = async (req, res) => {
  console.log("from create user", req.query);
  try {
    const newUser = new User(req.query);
    const savedUser = await newUser
      .save()
      .then((savedUser) => {
        return res.status(200).json(savedUser);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// endPoint->           /userdreamsDB/getUserDreams?userEmail=<value>
export const getUserDreams = async (req, res) => {
  try {
    console.log(req.query); // Debugging

    const user = await User.findOne({ userEmail: req.query.userEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json(
        user.dreams.length > 0 ? user.dreams : { msg: "No record of dreams" }
      );
  } catch (error) {
    console.error("Error fetching user dreams:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// endPoint->           /userdreamsDB/addUserDream?userEmail=<value>&dreamData={title:<value>,desc:<value>,category:<value>}

export const addUserDream = async (req, res) => {
  try {
    const { userEmail, dreamData } = req.query;
    console.log("from add user Dream", dreamData);
    if (!userEmail || !dreamData) {
      return res
        .status(400)
        .json({ msg: "userEmail and dreamData are required" });
    }

    // Decode and parse dreamData correctly
    const parsedDreamData = JSON.parse(decodeURIComponent(dreamData));
    console.log(parsedDreamData);
    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { $push: { dreams: parsedDreamData } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Dream Data Added Successfully", updatedUser });
  } catch (error) {
    console.error("Error in addUserDream:", error);
    return res.status(500).json({
      msg: "Internal server error from add user dreams",
      err: error.message,
    });
  }
};
// editing userDream

export const editUserDream = async (req, res) => {
  try {
    const { email, dreamDataId, updatedData } = req.body;
    const { title, category, description } = updatedData;

    console.log("Updated Data:", updatedData);
    console.log("Dream ID:", dreamDataId);

    const updateResponse = await User.updateOne(
      { userEmail: email, "dreams._id": dreamDataId }, // Use dreamDataId as a string
      {
        $set: {
          "dreams.$.dreamTitle": title,
          "dreams.$.dreamDesc": description,
          "dreams.$.dreamEmotion": category,
        },
      }
    );

    console.log("Update Response:", updateResponse);

    if (updateResponse.matchedCount === 0) {
      console.log('not match')
      return res.status(404).json({ error: "Dream not found" });
    }
    if (updateResponse.modifiedCount === 0) {
      return res.status(400).json({ error: "Dream found but no changes made" });
    }

    return res.status(200).json({ msg: "Successfully updated", data: updateResponse });
  } catch (error) {
    console.error("Error updating dream:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// getting all user dreams

export const getAllUserDreams= async(req, res) => {
  try {
    console.log('called')
    // Retrieve only the `dreams` field from all documents
    const users = await User.find({}, "dreams");
    // Extract dreams from all users and flatten the array
    const allDreams = users.flatMap((user) => user.dreams);
    return res.json({ success: true, dreams: allDreams });
  } catch (error) {
    console.error("Error fetching dreams:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// deleting user details

export const deleteUserDream = async (req, res) => {
  try {
    const { userEmail, dreamId } = req.body;

    const updateResponse = await User.updateOne(
      { userEmail },
      { $pull: { dreams: { _id: dreamId } } } 
    );

    console.log("Delete Response:", updateResponse);

    if (updateResponse.modifiedCount === 0) {
      return res.status(404).json({ error: "Dream not found or already deleted" });
    }

    return res.status(200).json({ msg: "Dream successfully deleted" });
  } catch (error) {
    console.error("Error deleting dream:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
