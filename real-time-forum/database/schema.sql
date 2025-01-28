PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    post_id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category_name TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Reactions (
    user_id INTEGER NOT NULL,
    post_id TEXT,
    comment_id TEXT,
    reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'dislike')),
    created_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    PRIMARY KEY (user_id, post_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (comment_id)
);

CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    expired_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    message_id TEXT PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS user_status (
    user_id INTEGER PRIMARY KEY,
    status TEXT CHECK (status IN ('online', 'offline')) DEFAULT 'offline',
    last_seen TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS websocket_connections (
    connection_id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    connected_at TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO categories (category_name) VALUES
    ('Technology'),
    ('Sport'),
    ('Health'),
    ('Lifestyle'),
    ('Education');