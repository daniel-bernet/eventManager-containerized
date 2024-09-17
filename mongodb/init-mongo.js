// Switch to the appropriate database
db = db.getSiblingDB('your_database_name');

// 1. Create 'users' collection if it doesn't exist
if (!db.getCollectionNames().includes('users')) {
    db.createCollection('users');
    print("Created 'users' collection.");
}

// 2. Create 'events' collection if it doesn't exist
if (!db.getCollectionNames().includes('events')) {
    db.createCollection('events');
    print("Created 'events' collection.");
}

// 3. Create indexes for the 'users' collection
// - Ensure the username is unique to avoid duplicates in registration
db.users.createIndex({ "username": 1 }, { unique: true });
print("Created unique index on 'username' for 'users' collection.");

// 4. Create indexes for the 'events' collection
// - A text index to enable full-text search on title, description, and category
db.events.createIndex(
    { "title": "text", "description": "text", "category": "text" },
    { name: "event_text_index", default_language: "english" }
);
print("Created text index on 'title', 'description', and 'category' fields for 'events' collection.");
