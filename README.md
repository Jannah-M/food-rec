# food-rec

# Restaurant Recommendation App

## Authentication and User profile:

- User registration and login 
- Get user preferences for creation of profile
- Be able to update user profile post-creation of user profile


## Recommendation:
 - Serves a recommendation based on user profile preferences stated
 - What the user rejects and accepts
 - User is able to reroll recommendations
 - Ask user to provide feedback on what they should be recommended next time
 - This will happen when the user opens the app again
## Restaurant Data & integration:
 - The app will use Google places API to pull restaurant data such as name, type of food, ratings, etc.
 - See the open/close status of a restaurant

## Database:
- User tables: profile, preferences, and onboarding state
 - Create a recommendations table on what was accepted/rejected, served, and the users’ feedback
 - Supabase: Stores the users profiles with onboarding inputs: location, dietary restrictions (if any), cuisine preferences, budget, and distance radius
 - Handles user registration, login, and session tokens 

## Tools used: 
- FastAPI
- Supabase
- Google places API


