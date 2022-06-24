1.)
React is a JavaScript library created by Facebook.
It is used for building user interfaces.
React is used to build single-page applications.
React allows us to create reusable UI components.

React creates a VIRTUAL DOM in memory.
Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory, where it does all the necessary manipulations, before making the changes in the browser DOM.
React only changes what needs to be changed!
React finds out what changes have been made, and changes only what needs to be changed.

2.)
npm is a package manager(node package manager). It is used for installing packages in node js.

first we create a react app by typing npx create-react-app myreactapp in terminal .
we have to do this whenever we create a new react app.
Public has index.html which contains a div with id = "root".
In src; index.js puts something in index.html by using document.getEleemntById("root").

3.)
App.js is the main thing and whatever we do we do in app.js
We can start our application in chrome by writing npm start in terminal. It will open on localhost:3000 .

4.)
npm, npx
react:
components
props
state

rfc: react function based components //Use this short form in vs code
rcc: react class based components // ""

5.)
In react there are 2 types of components.
i.) class based components.
ii.) function based components.

Funciton based components are used nowadays beacause they are more easy than class based components.

6.) \*\*\*\*

JSX stands for JavaScript XML.
JSX allows us to write HTML in React.
JSX makes it easier to write and add HTML in React.
JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.

In app.js in funciton App{} there is a return statement. whatever we write in return (....) will get reflected on localhost:3000.
JSX is wriiten in return (...).
JSX is HTML wearing a mask of JS.

In JSX :
-> Instead of class, className is used in JSX beacause class is a reserved keyword in JS.
-> htmlFor is used in place of for.
-> Tags which don't have a closing tag we use "/" in them . Eg : <input/> .
-> We can return only one tag in return().
But we can return more than one tags using <> </> in return (). OR we can wrap multiple tags in one parent <div></div>
-> js is written inside {} in jsx.

To write comments in JSX : {/_ Comment _/}

Babel compiles JSX code.

8.)
Adding bootstrap in react project :
Add bootstrap css link in head of index.html
and Add bootstrap js bundle link in body of index.html

Remove evrything from index.css if you want to remove it from your project. Or can add more styling as well.
Basically index.html and index.css are same as were previously while learning JS. They have same functionality as they had previously.

9.)
Import , export in js

10.)
Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.
Components are like functions that return HTML elements.

We created a folder named Components in textutils to keep all our components in one place.
We will keep all our components in Components folder. (Eg: Navbar is a component)
Always write the first letter of the name of the component in capital.

Instead of writing the code for navigation bar in App.js we can write it in the Navbar component an can include it in App.js

Benefit of react:
We can use Navbar component at different places ie. we can use it in different projects .

We can use Navbar component at different places and can just change the required part using props.
The thing which we want different at different places can be created as props. We can pass it's value like a variable.

rfc (shortcut for react functional components)

11.)
Props stand for properties.

PropTypes :

Used for defining the datatype of the props .

impt (shortcut for importing the proptypes)

Navbar.PropTypes ={
title : PropTypes.string, // We have set the prop type for title as string.
//Now if we pass anything other than string then error will come.
}

Deafult props :

If we don't pass value of some prop in app.js then automatically deafult value will be picked(if we have set any )

We can also set .isrequired in proptypes to ensure that it is not missed.
If we have set isrequired and no default values have been set and we don't pass it's value in app.js
then error will come in console.

12.)
State :

State means à¤…à¤µà¤¸à¥à¤¥à¤¾ of a component.

i.) First import useState hook from react :
import {useState} from 'react'.

ii.)const [text, setText] = useState('Enter text here');

      text is a variable.(It can be string, integer, object ... anything).
      We will update it using setText function.
      Default value of text is given in useState('').

Let us consider text is a string.
We gave it's default value as "Enter text here" in useState.
When we want to update it's value : setText("Updated value")
Now "Updated value" will be stored in text.

useState is a hook.
Hooks helps us in using features of class without wriring a class.

13.) We can also pass functions as props.

14.)
React router DOM :
Router is used for navigating between different pages on our website without reloading the whole website.
Router helps in loading only that part which has to be changed .
Like if we navigate to AboutUs page then also navbar, left column, footer ... will be same .
So instead of reloading everything only AboutUs part will be loaded ..rest will be same.

Download react-router-dom using npm install react-router-dom in VSCode terminal
first : import react router from https://reactrouter.com/docs/en/v6/getting-started/overview
import{
BrowserRouter as Router,
Routes,
Route,
Link
} from "react-router-dom";

second : copy Routes from https://reactrouter.com/docs/en/v6/getting-started/overview and paste it in return()
In Routes we define what has to be done on which route. i.e we define path like /about and tell that <AboutUs/> has to be called on that path.

third : wrap everything inside of <> </> in router
i.e : return(){
<>
<Router>
.
.
.

                        </Router>
                      </>
                   }

Now we put the paths defined in Routes in Link,to
(Link , to ) is used in place of (a,href) respectively to stop the page from reloading .
Using a,href will reload the whole page.
Use "/" in place of "#".

15.)
Class based components :

In app.js write rcc . { rcc -> react class component}
Create a components folder. Create Navbar.js in it. In Navbar.js write rcep. {rcep -> react class extends proptypes}
render method is a life cycle method. It first compiles JSX to html then renders it on screen.

State in class based components :
State is an object in CBC.
We set state by : this.state{
articles: this.articles,
loading : false
}

changing state : in render(){
return (
this.state.articles. ..
)
}

map is an array method used for traversing an array.

16.)
Whenever setState is called the render runs again . i.e. everything gets re rendered.
It calls the render() method every time we call setState only except when shouldComponentUpdate returns false.

There are two steps of what we may call "render":

1.) Virtual DOM renders: when render method is called it returns a new virtual dom structure of the component.
As I mentioned before, this render method is called always when you call setState(),
because shouldComponentUpdate always returns true by default.
So, by default, there is no optimization here in React.

2.) Native DOM renders: React changes real DOM nodes in your browser only if they were changed in the Virtual DOM
and as little as needed - this is that great React's feature which optimizes real DOM
mutation and makes React fast.

17.) video-33
Refactoring our code :
Refactoring of code is done to increase it's readability and making
it conscise and easy to read and understand and wasy to make any future changes.
Instaed of writing same code in componentdidmount
and prevhandler and nexthandler we wrote the code here in this function
and used those other functions just to make necessary changes and
call this function.

18.)
For changing the title and favicon of our website go to public/index.html
There in title change it.
Download a image of our choice. Type favicon generator on google .
generate favicon of our image.
download it, extract files, copy favicon images and manifest.json in our public folder.
In index.html do the required changes for favicon.

19.)
Changing title whenever we go to some other page i.e using link. i.e using routes.

20.) video-35
Infinite Scroll :
In modern websites Infinite scroll is used in place of prev next buttons.
On chrome search infonte scroll react.
Download package for infinte scroll using vs code terminal.
Import infinte scroll
copy from website it's syntax.
Create logic for fetchmoredata and hasmore and put some spinner in loading

We removed <div container> from return and put it over <div row> to prevent horizontal scroll bar.

21.)
video-37 Hiding api key

If we have any sensitive info/data in our project then we can hide it in .env.local so that it will not be avaiable to users.
crete .env.local file in src .It is also present in .gitignore.
in env file write REACT_APP_NEWS_API = "af4c53ce14c743b497f8b4314aae658c"
create a variable ApiKey = process.env.REACT_APP_NEWS_API
Now pass it as props.

38.)
React Hooks
They help us access functionalities of class without using a class

39.)
In class based components we create a class. Inside it is a render method and in it is a return statement.
In return statement we write JSX code.

Example - In Navbar.js :

export class navbar extends component{ //Here navbar is a class which has a render method which contains a return statement(containing JSX code) returning the things to be displayed/performed on UI.
render(){
return(

       )
     }

}

whereas,
In function based components :
There is a function which returns the things to be displayed/performed on UI.

Example - In Navbar.js :

const navbar =()=>{ //Here navbar is a function which contains a return containing JSX code.
return {

     }

}

40.)
setPage is an asynchronous function.
So put it after const url ..

41.) Video-41 MERN Stack
M - MongoDB - document database
E - Express(.js) - Node.js web framework
R - React(.js) - a client-side JavaScript framework
N - Node(.js) - the premier JavaScript web server

The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.
Mern Stack

web React.js
â†“â†‘
---------------
server | Express.js |  
 | Node.js | //Express.js is a server-side framework, running inside a Node.js server.
---------------
â†“â†‘
database MongoDB

(This image link : https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

Here in project we kept backend inside react folder so that it is easy to learn and maintain.
But in ideal scenario in production phase we will keep react folder and backend folder separate and maintain separate git repositories for both.

42.) video-42 setting up frontend and backend for inotebook

First create a react app using npx create-react-app inotebook.
Then in inotebook create a backend folder.(But in ideal situtation frontend and back are kept separate.)
(Here, Just for the sake of learning and simplicity we kept the backend
folder with frontend)

In backend folder in vs code terminal :
first: npm init
second: Then give the package name i.e inotebook-backend (whatever name we want to give)  
 third: give description

Now install Express using "npm i exepress " (i stands for install)
install mongoose using "npm i mongoose"

Mongoose helps in managing the database.

All these will get stored in package.json
package.json :
{
"name": "inotebook-backend",
"version": "1.0.0",
"description": "Your notebook on the cloud",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC",
"dependencies": { //\*\* we installed express and mongoose.
"express": "^4.17.1", // So they are present as dependencies in package.json
"mongoose": "^6.0.12"
}
}

Now from gitignore remove / from node_modules so that node_modules doesn't get pushed on git.

MongoDB:
When we use remote database (MongoAtlas ,MongoCloud .. ) there we get a string which we put in our mongoDBCompass to connect with it.
But here we will be using our local database i.e our database will be on our computer.

db.js :
In this we will write the code for connnecting to the mongo database.
We created a db.js file in which we imported mongoose.
Then we put took the link from our mongoDB and put it in mongoURI variable.
Then we connnected to mongo by creating connectToMongo() function.
Then we exported connectToMongo from db.js

index.js :
In index.js we first included db.js
Then we copied some code from express website

In database contains collection and collection contains documents. documents are json files.

                                                      JSON

JSON syntax is derived from JavaScript object notation syntax:

Data is in name/value pairs
Data is separated by commas
Curly braces hold objects
Square brackets hold arrays

JSON data is written as name/value pairs (aka key/value pairs).
A name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value
Example
"name":"John"

mongoose_models :
We created a folder for models (named it as models)
This folder will contains mongoose models.
It contains schemas for database.
In MongoDb we can enter key value pairs in any format in any order. Here mongoose comes in action.
Mongoose helps us in managing our database in a proper organised manner.
So we created 2 schemas : User and Notes defining what will be present in them

Routes:
In index.js we mentioned routes in app.use()
We created a routes folder. In this we created notes.js and auth.js whose routes have been mentioned in index.js.
We will get the response from notes.js when we will go to localhost:3000/api/notes . Same for auth.js

                   -------X--------------------X--------------------X-------

video: 43 - mongoDB and express setup :

Creating db.js and index.js

db.js:

//In this file(ie db.js) we are writing the code for connection with mongo db and then export the function for connection.
//We will import this in index.js

const mongoose = require('mongoose');
const mongoURI ="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
//This is the connection string of our database.

const connectToMongo = ()=>{
mongoose.connect(mongoURI, ()=>{
console.log("Connected to Mongo Successfully");
})
}

module.exports = connectToMongo;
---------------------------------
index.js :

const connectToMongo = require('./db'); //Importing connectToMongo function from db.js
connectToMongo(); //calling the imported function.

//copied from express website :
const express = require('express'); //importing express
const app = express() //using express
const port = 3000 //defining the port number on ehich we want to listen
app.listen(port, () => { //listening on the mentioned port.
console.log(`Example app listening at http://localhost:${port}`)
})
app.get('/', (req, res) => { //sending get request on the mentioned url : '/'.
res.send('Hello World!')
})

                       -------X--------------------X--------------------X-------

Only db.js, index.js, package files and node modules are present till video-43

video: 44 -

We can write all our routes in index.js ; like :

app.get('/', (req, res) => {  
 res.send('Hello World!')

app.get('/about', (req, res) => {  
 res.send('Hello World!')

app.get('/notes', (req, res) => {  
 res.send('Hello World!')

But this is a bad practice. To maintain a good folder structure and make things arranged properly we will keep these things in separate folder.

video-45 :
We are using thunder client to test our requests and responses.
select the method : get/post/delete/put..
Write the link in the box (i.e localhost:3000/api/auth) on which we want to send the request .
Write the data in the request.body
set the header : Content-type: application/json

To be able to use req.body ; we must include a middleware express.json . i.e app.use(express.json) in app.js

See auth.js :

     router.post('/', (req, res)=>{    //Using the post request to send data in the database

     console.log(req.body);          //printing the reuest.body in console
     const user= User(req.body);   //creating a new user. The user created will contain the data of request.body
     user.save();              //To save the data in the database.
     res.send(req.body);     //To get the request.body as response


video-46 :

Data Validation : We need to first verify the data before sending a post request. i.e user should not send email in the field of the name . Any imp field should not be sent empty....
Refer to the github for code and comments/explaination.

video-47:
Refer to gihub.

Thunderclient collections : We created a collection name iNotebook. In iNotebook we created a new request Create a new User.
Collections are made to keep all the requests at one place.

video-48: Password hashing, salt & Pepper

                    ---------     ------------    ------------
                    | client | <- | Backend  | <- | Database |
                    |        | -> |          | -> |          |
                    ---------     ------------    ------------

Passwords are never stored as plain text in database. Because if the database gets hacked then the hacker will get all the userNames and their corresponding passwords. He can then easily login in to website in any uaer account.
So, To overcome this Hashing is done. Password is converted into a hash code using hash function. This function is a one way function i.e we can generate hash code using password but can't generate password using hash code. If we pass a hash code in hash function ..then a different hash code for the pased hash code will be generated.
These hash codes will be completely different for every password and all will be of fixed length.

But hackers have a Rainbow Table which consists of billions of passwords and their corresponding hash codes.
Rainbow table consists of commonly used passwords. That is why it is told to set a complicated password.
If user hacks our databse and gets the list of hash codes then he can eaily find passwords corresponding to some hash codes by searching in the Rainbow Table.

To overcome this limitation salt and pepper are used.
An additional value is added to the password and then it is passed in hash function to generate hash code.
Eg : Password + salt ----passed in----> hash function -----> gives hash code
harry + 1bex ------> hash fxn -----> 1z2erhn$7%

Pepper is also somewhat same as salt : Password+salt+pepper ----hash fxn---> hash code

video-49 : hashing password using bcryptjs :

bcryptjs is a nodejs library used for hashing passwords.
step1: npm i bcryptjs (in terminal)
step2: const bcrypt = require('bcryptjs'); // import bcryptjs (in Auth.js)
step3: const salt = await bcrypt.genSalt(10); //Generates salt. bcrypt.genSalt(10) returns a promise. Promises can be handled by either .then() or by using async,await. await means wait till this promise doesn't gets resolved.
step4: const secPass = await bcrypt.hash(req.body.password, salt); //bcrypt.hash() also returns a promise. generating hash code using password and salt

step5: Now while creating and sending a user info in databse pass secPass in password parameter so that secPass will get stored in database.

Web Tokens :
A token is given to a user when he logs in on our website. Because after logging in whenever he wants go to any route he will not enter his userName and password again and again. So everytime whenever he wants to go to any route he will pass his token and we will verify him and then he can go to that route.
generated using jwt.sign()

video-50 :

const JWT_SECRET = "MyNameIs#Sarthak$"; //Secret key. This should be kept in env folder for privacy.

Creating endpoints :
router.post('/endpoint', [validation checks],
async(req,res){
write code for handling result of validation checks

try{
code for functioning which we want on this end point.
}
catch(error){
handle errors(if any) which occured while executing try block.
}
}
)

video -51 :
Creating a route for getting the data of the logged in user.

In this we will fetch the userID from the auth token and then fetch the user data using the ID.

We created a middleware fetchuser which will fetch the data of the logged in user using auth token.
This middleware will fetch user from the token and modify the request by appending userID to it(request).
No validations/checks are required in this functionality.
We may require the functionality of fetching the user data at different places also. So, we created a middleware(fetchuser) which can be used at any place we want for fetching the user data.  
Called the fetchuser middleware in the 3rd post request(i.e. getting user data).

middleware - fetchuser :

- const data = jwt.verify(token, JWT_SECRET); // data will get an object consisting of user and iat . user consists of id.
  // data :- { user: { id: '619d34dfc6ba86f6adfc4803' }, iat: 1637743389 }

Now we will extract user from the data and pass it in the request :

- req.user=data.user;

//We can do console.log(data), .... anything .... to understand what we will be getting by it.
// So to understand anything just console it and see it.

video-52 :

Created a route for fetching all the the notes of the logged in user. (in routes/notes.js)
Since, every user will have their own notes; so we will have to create a user field in notes schema to conect notes with user.
In models/Notes.js in schema :- user: { //To connect notes with user.
type: mongoose.Schema.Types.ObjectId, //To specify that user is a foreign key.
ref: 'user' //this means referring to User.js. 'user' because in User.js we exported it as 'user'. (mongoose.model('user', UserSchema))
}

Created a route for adding a note

video-53 : Update an existing note.

We can use POST request for updating a note but PUT request is used for the update functionality.

It should be like that a user can update only his notes not any other user's notes.
Like sarthak can update only his notes. Not Rahul's notes.
So validation will be required.

Steps:
First check wether the note which is requested to be updated; it exists or not. (By using ID passed in the request url)
Then check that the user requesting is the one who owns that note or not.
Then extract the title,description,tag from the request body .
Then create a new empty obj and pass the extracted parameters in it.
Then use FindByIdAndUpdate for updating the note.

We will update a note using it's ID.(i.e id of the note)

video-54 : Delete an existing note.

Use delete method
somewhat similar to update one.
First check wether the note which is requested to be deleted; it exists or not. (By using ID passed in the request url)
Then check that the user requesting is the one who owns that note or not.
Then use FindByIdAndDelete for deleting the note.

video-55 : Our api is now ready(i.e.Backend)
Now we will work on client side(i.e on frontend)
We will create our frontend and connect it with the backend.

We did npm i react-router-dom concurrently.  
concurrently is a npm package used to start frontend and backend simultaneously.
Otherwise we have to start frontend by npm start. Then start Backend by :-> Opening new terminal: cd Backend . Then nodemon index.js
Now after installing ... Add "both": "concurrently \"npm run start\" \"nodemon backend/index.js \"" in scripts in package.json

Now just write npm run both to start both frontend and backend.
Run backend on 5000 and frontend on 3000. (i.e run both on different ports)

video-56 :
We can use tailwind and any other library also for styling but we will use Bootstrap as it is easy and more popular.
We should use reactbootstrap as it is more organised for react and SEO friendly. But since we are studying course for react we should not divert ourselves to styling part here in this course.

video-57 : Context API

If we created a State in App.js and we want to use it in components then we have to pass it using props.
If there are many components one under the other then (like grandparent, parent, child,...)(let us assume 10)... Then to use the state in
10th component we have to pass the state using props from app to 1 then from 1 to 2 then from 2 to 3 .... till 10.

The React Context API is a way for a React app to effectively produce global variables that can be passed around.
This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on.
Context is also touted as an easier, lighter approach to state management using Redux.

Context API is a (kind of) new feature added in version 16.3 of React that allows one to share state across the entire app (or part of it) lightly and with ease.

With the help of context api we can create a variable and can use it in any component we want without need to pass as props from parent to child then to child..

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome
for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application.
Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

video-58 :

Create a Contexts folder.
In this create a Notes foleder. In Notes folder create a NotesContext File and a NotesState file.

In NotesContext file we will import createContext, create a Context , and then export that created Context:
import { createContext } from "react"; //import createContext from react.
const NotesContext = createContext; //create a Context named NotesContext.
export default notesContext; //export the created context.

In NotesState file import the created context. Create a function that returns a state which will be accessible to all
the components. Use NotesContext to return the state.
In NotesState file we create the states and return them.
import NotesContext from "./NotesContext"; //importing NotesContext

                       const NotesState = (props)=>{

                           const state  ={                      //state created
                               "name":"Sonu",
                               "class":"10b"
                           }
                           return(                               //here we will return the state using NotesContext.
                               <NotesContext.Provider value={state}>
                                   {props.childern}
                               </NotesContext.Provider>
                           )
                       }

                       export default NotesState;                //exporting NotesState

Now in App.js in return block .... wrap everything inside <NotesState> </NotesState> so that
the state created and exported in NotesState file becomes accessible to every component present in the wrapped content
and their childern components.

second half of video :
//We can create states and functions for updating the value of the states and can export them in this file.

video-59 : useLocation Hook

useLocation hook: The useLocation hook returns the location object that represents the current URL.
You can think about it like a useState that returns a new location whenever the URL changes.
Using useLocation hook we can get details of the current URL in the form of object.
Location Object which we get :
{pathname: '/about', search: '', hash: '', state: null, key: 'dtrszdwm'}

This will be helpful whenever the user navigates to different URLs on our website.
Example: In navbar when user click on About the URL changes and he goes to the About page.
We want that on whichever item he clicks in Navbar and goes to that page ; that item should get highlighted(or className="active") in the Navbar.
For this we will use useLocation to get the current path/URL and useEffect to display Location in the console whenever the Location/URL changes

video-60 :

understanding to display notes to the user.
created a state named notes in NotesState file.
Use map method to display the notes to the user in Home Component.

video-61 :

We created a Notes component and a NoteItem component.
NoteItem component consists of a card in which we will display a note.
Notes component will contain all the NoteItem cards.
We will call Notes component in Home component.
In Notes component we will return NotesItem components(in which we will pass note as a prop) using map method.

video-62 :

Used fontawesome to add icons in our website.
Copy and paste the link(<script src="https://kit.fontawesome.com/55a074d395.js" crossorigin="anonymous"></script>) in index.html
Then copy html code of icon and paste wherever we need that icon.

video-63 :

Created functions for adding, deleting and editing note in the NotesState file.
These functions will update the state of notes array.

addNote function :
setNotes(notes.concat(note));
This will change the state of notes array using setNotes. It will add a new note in the notes array and return that array.

Created a new component AddNote.js:
Removed the form from the Home component and put it here in AddNote.js.

name attribute in input field :
name is the name that is used when the value is passed (in the URL or in the posted data), while id is used to uniquely identify the element for CSS styling and JavaScript.

Adding a note on the client side and showing it on client side.(Here Note is not added to the server side, will do it later)

video-64 :

Created the functionality for deleting the note (But only frontend part)

In the trash icon we created a function for onclick.
In the notesState write the code for deleteNote function.

This will delete the note from the client side. But nothing will get updated in the server side because no API Call is made. We will do it later.

video-65 :

Adding the fetch notes functionality to get all the notes from the database.

In NotesState we created a function getAllNotes for gettng all the notes from the backend.
In this function first we did a get request using fetch method.
Fetch method does the same thing as we were doing previously using Thunderclient (i.e sending requests by using url, method, body, headers ... )
Then we updated the state of the notes array using setNotes.
In notes.js we called getAllNotes function using useEffect hook. useEffect hook runs whenever the page gets rendered.

Did the same for addNote, and editNote.

Basically 2 things have to be done in these functions :
a.) first use fetch method to inteact with the backend.(i.e sending requests, and interacting with the database).
b.) Then make the logic for doing the changes in the notes array(state variable).

IMP\*\*\*  
We have to use CORS to be able to send request from frontend to the backend.
In backend do : npm i cors
Then in index.js of backend : var cors = require('cors')
app.use(cors())

---

video-66 :
Adding the modal and doing fronend setup for editing a note.
When the edit modal will open it will contain the data already present in that note which we can edit.

In Notes.js copy the modal from the bootstrap. In the modal body paste the form from the AddNote.js

We used useRef Hook to call the modal when clicked on the edit icon. We will be refering to the Launch demo modal button when clicked on the edit icon.
When we will click on the edit icon it will appear like we clicked on the Launch demo modal button.
useRef returns an object.

We created an updateNote funciton which we passed as props from Notes.js to NoteItem.js
NoteItem will call the updateNote function with that particular note passed as parameter in it.

video-67 :
Adding functionality for editing the node.

In NotesState.js create editNote function.
In Notes.js call the editNote function in handleClick (handleClick runs on clicking on save Changes button).

We can't change the value of a state variable directly in react.
So we have to create a new variable newNotes in which we will put new values. Then using setNotes we will update the notes variable.

video-68 :

Adding frontend validations and some minor fixes:

Added disabled attribute to the add note and save changes buttons containing the validations.
We can't use required and minlength={5} in input because we are not using onSubmit here. These work only with onSubmit.
So we have to use the disabled logic here.

In NotesState.js in addNote :
the note which we will add will also get returned in the response.
So we will take it from response and add it to frontend.

When we submit the add note form then the data in the input fields should also get removed from there.
For this we have to set the input fields to blank when we click on add note btn.
In AddNote.js in the handleClick btn use setNote to set the note to blank.
Then in the input fields add the value attributes to set the value of the input field = note
value={note.title}
..
..

video-69 :
Adding Login functionality to our webiste.

create a Login component.
rafce

For frontend add a form from bootstrap.
Here are are using onSubmit; so we can use required and minlength={5} for validations.

For backend : we did the api call in this component itself.
created a state variable named Credentials.
the value of the Credentials changes with the change in the input fields (used onClick for this).
Credentials contain the email and password which we type in the input fields.
When we submit the form :
Fetch method runs which sends a request to the backend. Credentials is passed in the body of the request.
After Successfull response from the backend the authToken gets returned in the response.
We save this authToken in the localStorage.
And then we navigate the user to the Home page using useNavigate Hook.

video-70:
Creating Signup functionality.

Same as of prev video(i.e Login).

Also created validation for confirm Password i.e value of confirm password should be same as of password.
Created a function matchPassword for this. matchPassword will be called whenever the confPassword input feild will change(i.e whenever we will type or remove even a single word from confPassword input field)
Created a state variable for setting the submit button to disabled when confPassword.value !== data.password.
We set the confPassword field to required so that the user has to type something in the confPassword to be able to submit the form.
If he types in confPassword and it doesn't matches with the data.password then red border will appear and submit button will be disabled.
If matches; then green border will come and button will again get enabled.

video-71 :

Added the alert component.
It will show alerts when we will login, signup, add,delete,update note.

In Alert.js pass the props. This prop will contain an object named alert. alert object will contain msg and type.

In App.js create a state variable named alert. Initialize it to null.
Create a function showAlert. showAlert will take message and type and will update the state of alert using setAlert. It will also contain setTimeout to automatically remove the alert box after 1500ms.

Pass showAlert as prop to all the components(whichever required) using prop drilling.
In these components use showAlert to pass the message and the type of the alert.

video-72 :

User can't access home page without logging in :
In Notes.js in useEffect :Notes will be fetched only if the auth token is present in the local storage else he will be directed to the login page.
When user will click on home then Notes will be called .. If user is logged in then only notes will be fetched otherwise he will be directed to the Login Page.
Thus user can't access home page without logging in.

Showing user specific notes :
When user will Login his auth token which will be returned in response... we will store this auth token in the local storage.
In NotesState.js in fetch method in requests pass the auth token from the local storage. So that the user sepcific notes will be fetched and actions can be performed on only that notes.

So the user must have to Login to access home page and he can access only his notes.

Logout functionality :
In navbar- When the user is logged in then Logout btn should be shown. Otherwise login and signup should be shown.
When user will click on Login : handleLogout() will run (the auth token will get removed from the local storage and he will be directed to teh login page.)

video- 73-78 :
Redux

Redux helps in managing the states in our website.
Like suppose there is a baby(UI) . whatever he wants he will tell his parents. Then his parents will create an action and will tell Ramu to do that action
parents-action cerator
ramu-reducer
If baby wants bat ball. His parents will generate an action i.e buy bat and ball . And ramu will do this action.
So action creators create an action and reducer will do that action.

Create a state folder. In this create 2 folders :actions-creators & reducers.

index.js in action-creators:
It exports a function which returns a function
We created 2 functions depositMoney and withdrawMoney. Both these functions return functions.

Then we created amountReducer in reducers.
reducer is a function that takes state and action and performs that action
Here we have created only one reducer. But if there are multiple reducers in reducers folder then we will combine all the reducers and will export them as a single function
We created index.js in reducers in which we will combine all the reduces ans will export them .

We created index.js in state folder in which we exported actionCreators.

Then we created store.js in state. In this we will create a redux store.

Then in index.js of project we wrapped <App/> inside Provider which will provide store to the App .

Then in shop.js we will use this .
