
# node_express_2

## Description
The News Aggregator API is a Node.js project built with Express.js. It allows users to register, log in, and retrieve personalized news articles based on their preferences. The project includes user authentication using bcrypt for password hashing and JWT for token-based authentication. It interacts with external news APIs to fetch news articles from multiple sources.

## Getting Started

### Prerequisites
Ensure you have the following software installed on your local machine:
- Node.js
- NPM (Node Package Manager)

### Installation
1. **Clone the Repository:**
    
    git clone https://github.com/SriramKg/node_express_2.git
    cd node_express_2
    

2. **Install Dependencies:**

    npm install


3. **Create Environment Variables:**
    Create a `.env` file in the root directory and add your environment variables, including your JWT secret and API keys for external news services.
    
    JWT_SECRET=your_jwt_secret
    NEWS_API_KEY=your_news_api_key


4. **Start the Server:**

    npm run start
    

## Usage

### API Endpoints

#### User Registration
- **POST /register:** Register a new user.
    - **Request Body:**
        {
            "name": "Virat Kohli",
            "email": "virat@kohli.com",
            "password": "@AnushkhaSharma",
            "preferences": ["Cricket"]
        }
        
    - **Response:**
        
        {
          "message": "User registered successfully."
        }
        ```

#### User Login
- **POST /login:** Log in a user and receive a JWT.
    - **Request Body:**
        
        {
            "email": "virat@kohli.com",
            "password": "@AnushkhaSharma"
        }
        
    - **Response:**
    
        {
            "message": "User authenticated successfully",
            "token": "your_jwt_token"
        }
        ```

#### User Preferences
- **GET /preferences:** Retrieve the news preferences for the logged-in user.
- **PUT /preferences:** Update the news preferences for the logged-in user.
    - **Request Body:**
        
        {
          "preferences": ["technology", "sports"]
        }
        

#### Fetch News Articles
- **GET /news:** Fetch news articles based on the logged-in user's preferences.

### Authentication
Use JWT for authentication. Include the token in the Authorization header for endpoints that require authentication:
```
Authorization: Bearer your_jwt_token
```

### Error Handling
The API includes comprehensive error handling for:
- Invalid requests
- Authentication errors
- Authorization errors

## Testing
Use Postman or Curl to test the API endpoints. Ensure to include the JWT token in the Authorization header where needed.