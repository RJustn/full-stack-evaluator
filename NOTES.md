• What I Implemented

-Completed frontend CRUD operations for tasks (Create, Read, Update, Delete) using React and Axios.
-Implemented user-specific task assignment — each task is linked to a specific user.
-Added editing functionality with validation (which prevents empty task names).
-Displayed tasks and users in clean, structured tables instead of lists.
-Added “No tasks available” message for empty task lists.
-Enabled CORS in the backend to allow frontend-backend communication.
-Added cascade delete — when deleting a user it automatically removes their tasks.
-Added DTOs (Data Transfer Objects) to prevent circular references when returning JSON data from the backend.

• What Was Missing Initially

-CORS policy configuration in the backend.
-No frontend logic or components (only a blank React Task Evaluator header).
-No connection between frontend and backend.
-No way to create, edit, or delete tasks and users from the UI.
-Missing data display for users and their respective tasks.

• How to Test the Application

Start the backend
Run the ASP.NET Core backend (dotnet run or from Visual Studio).

Start the frontend
Run npm install (if not yet installed).
Run npm run dev or npm start.
Open the React app in your browser (usually http://localhost:5173).

• Test Features

-Create a Task: Enter a task title and assign a user.
-Edit a Task: Click “Edit”, change the title or status, then “Save”.
-Delete a Task: Click “Delete” next to any task.
-Delete a User: Deletes user and their associated tasks.
-Check UI: Verify that tables update automatically and show empty states when appropriate.