# Todo-Tracker
Trello clone app to practice CRUD with Mongo, Express and Node

## Features
 [] View all to-do's in easy to understand groupings
 [] Easily modify grouping of to-do's
 [] Add new to-do's
 [] Remove old to-do's
 [] Click a to-do to view addtional details
 [] Edit details on to-do's from details page

 
## Admin Features
 [] Set priority on to-do's
 [] Modify other people's to-do's
 [] Make other people admins
 
## Reach Features
 [] Drag and drop to change groupings
 [] Auto sort by priority
 [] Email notification when update to ticket you made
 [] Assign multiple people to one ticket
 [] User can create new categories
 
# Views
 Index: https://wireframe.cc/MENqT0
 Show: https://wireframe.cc/H0BtzH
 
# Data Structure
  User = {username: String, password: String, email: String, todos_assigned: [todoSchema], todos_created: [todoSchema]}
  Todo = {name: String, assigned_to: [userSchema], comments: [String], deadline: String, status: String, date_created: Date, date_updated: Date}
