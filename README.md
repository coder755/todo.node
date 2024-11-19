# todo.node
Firt time working in Node. Lots of learning and trying things out. Next step would be to write tests and add Todo functionality

# Running Locally notes
Use Powershell for `nodemon --watch` to work

# Expected Flow
*** The JWT Secret is created at start time. You will need to create a JWT each time you restart the application.

1 - Post a user via  https://localhost:3000/admin/user with following body template:
`{
    "userName": "best",
    "firstName": "user",
    "familyName": "ever",
    "email": "123@123.com"
}`

2 - Get a user token via http://localhost:3000/admin/token?userid=`${userId returned from previous request}`

3 - Get user information via http://localhost:3000/user using returned token from previous request in the authorization header as a 'Bearer' token.
