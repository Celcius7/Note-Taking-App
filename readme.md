# Note-Taking API

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd note-taking-api

   ```

2. Install Dependencies:
   npm install

3. Start the server:
   npm start

## API Endpoints

### Basic Note operations

1. Create a Note:
   POST /notes
   Body: { "title": "Note Title", "content": "Note content", "tags": ["tag1", "tag2"] }
2. Retrieve all notes:
   GET /notes
3. Retrieve a note by ID:
   GET /notes/:id
4. Update a note by ID:
   PUT /notes/:id
   Body: { "title": "Updated Title", "content": "Updated content", "tags": ["tag1"] }
5. Delete a node by ID:
   DELETE /notes/:id

### Tag Management

1. Add tags to a note:
   PUT /notes/:id/tags
   Body: { "tags": ["newTag"] }
2. Remove tags from a note:
   DELETE /notes/:id/tags
   Body: { "tags": ["tagToRemove"] }

### Querying

1. Retrieve notes by tags:
   GET /notes/query?tagQuery=+tag1 -tag2 tag3
   This will retrieve notes with tag1 and tag3, excluding tag2.

With this setup procedures, Our RESTful API for a note-taking application with tagging and querying features is ready. We can further enhance it by adding persistent storage, authentication, or other features as needed.
