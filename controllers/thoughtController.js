const { Thought, User } = require('../models');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought.id } },
      { runValidators: true, new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// const updateThought = async (req, res) => {
//   try {
//     let thought = await Thought.findOneAndUpdate(
//       { id: req.params.id },
//       req.body
//     );

//     thought = await Thought.findById(req.params.id);
//     res.send(thought);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.id });
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addReaction = async (req, res) => {
  try {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    const thought = await Thought.findById(req.params.thoughtId);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const removeReaction = async (req, res) => {
  try {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    );

    const thought = await Thought.findById(req.params.thoughtId);
    res.send(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
