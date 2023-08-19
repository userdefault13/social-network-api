const mongoose = require("mongoose");
const db = require("./models");

mongoose.connect("mongodb://localhost/socialnetworkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    const seedData = async () => {
    try {
        // Clear existing data
        await db.Thought.deleteMany({});
        await db.User.deleteMany({});

        // Create users
        const user1 = await db.User.create({
        username: "user1",
        email: "user1@example.com",
        });

        const user2 = await db.User.create({
        username: "user2",
        email: "user2@example.com",
        });

        // Create thoughts
        const thought1 = await db.Thought.create({
        thoughtText: "This is the first thought.",
        username: user1.username,
        });

        const thought2 = await db.Thought.create({
        thoughtText: "A second thought here.",
        username: user2.username,
        });

        // Add reactions to thoughts
        await thought1.reactions.push({
        reactionBody: "This is a reaction to the first thought.",
        username: user2.username,
        });

        await thought1.save();

        await thought2.reactions.push({
        reactionBody: "Reacting to the second thought.",
        username: user1.username,
        });

        await thought2.save();

        console.log("Seed data inserted successfully!");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
