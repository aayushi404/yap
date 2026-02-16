# API Routes

## 1. Signup
   post `/auth/signup`

   ### Request Body
   ```
   {
    username: john
    email: john@gmail.com
    password: 123456789
   }
   ```

   ### Success
   ```
    {
        message: "User successfully created"
    }
   ```

   ### Errors

   - `400` Invalid input (Zod)
   - `409` Email already exists
   - `500` Internal server error
  
## 2. Login
   post `/auth/login`

   ### Request Body
   ```
    {
        username/email: john/john.gmail.com
        password: 123456789
    }
   ```

   ### Success 
   ```
    {
        message: {
            token: access token
            }
    }
   ```

   ### Error
   - `400` Invalid input
   - `401` Invalid credentials
   - `500` Internal server error
  
## 3. Create Post
   post `/post`

   ### Request Body
   ```
   {
    text: Hii! everyone
    media: 
   }
   ```

## 4. update Post

## 5. Delete Post

## 6. Like Post

## 7. Dislike Post

## 8. Comment Post

## 9. Follow user

## 10. Unfollow User

## 11. File upload
    post `/upload`
    
    ### Request Body
    ```
    {
        
    }
    ```
