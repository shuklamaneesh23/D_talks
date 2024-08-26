# D-Talks

**D-Talks** is a comprehensive web application designed for learners to ask questions, share knowledge, and connect with fellow learners. Built with Next.js, this project integrates various technologies to provide a seamless and interactive experience.

## Features

- **Ask Doubts**: Users can ask questions with textual and photographic content.
- **Answer Questions**: Anyone can provide answers, which can be upvoted or downvoted by other users.
- **Generate Answers**: Use the Gemini integration to generate answers to questions.
- **Blog Section**: Write and read blogs. If you don’t have a blog, you can use the Gemini button to summarize articles.
- **User Dashboard**: Track user reputation based on the number of answers and upvotes.
- **Chat Section**: Connect with fellow learners through real-time chat.
- **Video Calls**: Initiate video calls with other users if both are online, using WebRTC and Socket.IO.
- **Real-Time Updates**: Real-time updates for answers and upvotes using Pusher and pusher-js.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Express and Next.js API routes
- **Databases**:
  - MongoDB for major data storage
  - PostgreSQL for handling user details
- **Authentication**: Firebase Authentication (Email and Google)
- **Real-Time Communication**:
  - WebRTC and Socket.IO for video calls
  - Pusher and pusher-js for real-time chat and updates
- **AI Integration**: Gemini for generating and summarizing content

## Getting Started

### Prerequisites

- Node.js and npm/yarn
- MongoDB
- PostgreSQL
- Firebase project setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/d-talks.git
   ```

2. Navigate to the project directory:

   ```bash
   cd d-talks
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following variables:

   ```
   NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_key
   NEXT_PUBLIC_PUSHER_APP_CLUSTER=your_pusher_cluster
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   MONGO_URI=your_mongo_db_uri
   POSTGRES_URI=your_postgres_db_uri
   ```

5. Start the development server:

   ```bash
   npm run nodemon
   # or
   yarn dev
   ```

   Visit `http://localhost:3000` to view the application.

## Usage

- **Asking a Question**: Navigate to the question section and submit your query with text and/or image.
- **Answering a Question**: View questions and provide your answers. You can upvote or downvote answers.
- **Blogging**: Access the blog section to write or read blogs. Use Gemini for summarizing articles.
- **Chat and Video Calls**: Connect with other users through the chat feature. Initiate video calls when both users are online.

  
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Firebase](https://firebase.google.com/)
- [WebRTC](https://webrtc.org/)
- [Socket.IO](https://socket.io/)
- [Pusher](https://pusher.com/)
- [Gemini](https://www.gemini.com/)

---
