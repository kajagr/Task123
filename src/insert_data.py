import sqlite3
import requests

# Fetch data from the API
print("1")
response = requests.get('https://jsonplaceholder.typicode.com/posts')
posts = response.json()
print("2")

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('mydatabase.db')
cursor = conn.cursor()

# Create the table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Posts (
        id INTEGER PRIMARY KEY,
        userId INTEGER,
        title TEXT,
        body TEXT
    )
''')

# Insert the data into the table
for post in posts:
    cursor.execute('''
        INSERT INTO Posts (id, userId, title, body)
        VALUES (?, ?, ?, ?)
    ''', (post['id'], post['userId'], post['title'], post['body']))

# Commit the transaction
conn.commit()

# Close the connection
conn.close()

print("Data inserted successfully.")
