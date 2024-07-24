const fs = require('fs').promises;

async function getPreferences(email) {
    try {
        console.log(email);
        const data = await fs.readFile('static.json', 'utf-8');
        const response = JSON.parse(data);
        const user = response.users.find(user => user.email === email);
        if (!user) {
            return {
                status: 404,
                message: "User not found",
            };
        }
        return {
            status: 200,
            message: "Preferences fetched successfully",
            preferences: user.preferences
        }
    } catch (error) {
        throw new Error("Cannot fetch user preferences !!!" + error);
    }
}

async function updatePreferences(body, email) {
    const {preferences} = body;
    console.log(email, "This is the Email");
    console.log(preferences, "This is the preferences");
    const data = await fs.readFile('static.json', 'utf-8');
    const response = JSON.parse(data);
    const user = response.users.find(user => user.email === email);
    if (!user) {
        return {
            status: 404,
            message: "User not found",
        };
    }
    else {
        user.preferences = preferences;
        fs.writeFile('static.json', JSON.stringify(response), (err) => {
            if (err) {
                return {
                    status: 500,
                    message: "Error in writing file",
                };
            }
        });
        return {
            status: 200,
            message: "Preferences updated successfully",
        }
    }
}

module.exports = {
    getPreferences, updatePreferences
}