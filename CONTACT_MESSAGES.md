# Contact Form Messages System

## Overview
This system allows contact form submissions to be saved to a JSON file and viewed by administrators through the admin panel.

## How it Works

### 1. Contact Form Submission
- When a user submits the contact form on the website, the data is sent to `/api/contact` endpoint
- The server saves the message to `src/data/messages.json`
- The message includes:
  - User information (name, email, phone, company)
  - Service interest
  - Message content
  - Timestamp
  - Status (unread/read)

### 2. Admin Panel Viewing
- Administrators can view messages in the admin panel under the "Messages" section
- Messages are loaded from the `messages.json` file
- New messages are highlighted with a blue border and "NEW" badge
- Messages can be marked as read
- A refresh button allows manual reloading of messages

### 3. File Structure
```
src/data/messages.json - Main storage for contact form messages
public/data/messages.json - Copy for development access
```

### 4. API Endpoints
- `POST /api/contact` - Submit contact form (public)
- `GET /api/admin/messages` - Get all messages (admin only)

### 5. Message Format
```json
{
  "id": 1234567890,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "service": "trading",
  "message": "I'm interested in your services...",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "status": "unread"
}
```

## Features
- ✅ Automatic message saving to JSON
- ✅ localStorage fallback for offline functionality
- ✅ Admin panel integration
- ✅ Message status tracking (read/unread)
- ✅ Timestamp display
- ✅ Refresh functionality
- ✅ Visual indicators for new messages
- ✅ Responsive design
- ✅ Dual storage system (server + localStorage)

## Usage
1. Users fill out the contact form on the website
2. Messages are automatically saved to `messages.json`
3. Admins can view messages in the admin panel
4. Admins can mark messages as read
5. Admins can refresh to see new messages
