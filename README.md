# Modulo

Modulo is an online chat forum that gives teachers and students a standard platform to have meaningful conversations. It helps the students to engage with their peers virtually.

````bash
> Microsoft Engage-21 Project Submission
> App Name: modulo
> Created by: Kritika Srivastava
> Email: kritika.s1408@gmail.com
````

## Tech Stack

1. React.js 
2. Firebase
3. Redux
4. HTML
5. CSS
6. Semantic-Ui (frontend templates)


<img align="left" height="50px" src="https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png" alt="image" />

<img align="left" height="50px" src="https://firebase.google.com/images/brand-guidelines/logo-vertical.png" alt="image" />

<img align="left" height="50px" src="https://cdn.iconscout.com/icon/free/png-256/redux-283024.png" alt="image" />


<img align="left" height="50px" src="https://cdn-icons-png.flaticon.com/512/919/919827.png" alt="image" />
<img  align="left" height="50px" src="https://icon-library.com/images/css-icon-png/css-icon-png-0.jpg" alt="image" />
<img  height="50px" src="https://cdn.worldvectorlogo.com/logos/semantic-ui.svg" alt="image" />


## Video Demo:

[Access the video demonstration here.](https://youtu.be/GwnlF9DFUUU)

## Features
### 1. Easy registeration and login.
Users can easily register for the application and login using their credentials.
### 2. Creating channels.
Every user is authorised to create their own channel. The messages and files in the channels are accessible to all the users(including messages sent before registration).
#### 3. Private chatting with all the users.
modulo enables the users to have one-on-one private communication.

#### 4. Searching messages using keywords.
In order to search messages in a channel or in private messages, all you have to do is enter the keyword present in the message.

#### 5. Starring Channels
Users can add the favourite channels to the starred list for easy accessibility.

#### 6. Notifications for new text messages when logging in.
Users need not worry about the messages after logging out. There will be notifications once you login again in the website.

#### 7. File uploads (jpg,jpeg,png, pdf files supported).
#### 8. Emoji support for text messages.

## Building from Source
1. Clone this repository.
2. Create a firebase project.
3. Replace the configuration codes in src/server/firebase.js.
4. Enable storage and realtime database in firebase console.
5. Install the packages using `npm install` command.
6. Run the app locally using `npm start` command.

## Repository Structure
````bash
modulo
├── firebase.json
├── package.json
├── package-lock.json
├── public
│   ├── 4846450.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── actions
    │   ├── actioncreator.js
    │   ├── actiontypes.js
    │   └── reducer.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── AppLoader
    │   │   ├── AppLoader.css
    │   │   └── AppLoader.jsx
    │   ├── auth
    │   │   ├── auth.css
    │   │   ├── Login
    │   │   │   └── Login.jsx
    │   │   └── Register
    │   │       └── Register.jsx
    │   ├── Messages
    │   │   ├── FileUpload
    │   │   │   └── FileUpload.jsx
    │   │   ├── MessageContent
    │   │   │   └── MessageContent.jsx
    │   │   ├── MessageHeader
    │   │   │   └── MessageHeader.jsx
    │   │   ├── MessageInput
    │   │   │   └── MessageInput.jsx
    │   │   ├── messages.css
    │   │   └── Messages.jsx
    │   └── sidebar
    │       ├── channels
    │       │   ├── channels.css
    │       │   └── channels.jsx
    │       ├── favouriteChannels
    │       │   └── FavouriteChannels.jsx
    │       ├── Notification
    │       │   └── Notification.jsx
    │       ├── PrivateChat
    │       │   └── PrivateChat.jsx
    │       ├── sidebar.css
    │       ├── Sidebar.jsx
    │       └── UserInfo
    │           ├── UserInfo.css
    │           └── UserInfo.jsx
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── server
    │   └── firebase.js
    └── setupTests.js
````

## Features for Future updates
1. Private channels with invited members
2. Submission channels 
3. Banning users for some time in channels
4. Email authentication with OAuth


References:

1. [React](https://reactjs.org/docs/getting-started.html)
2. [Firebase](https://firebase.google.com/docs?gclid=Cj0KCQiA7oyNBhDiARIsADtGRZb0hOGHVmG2-yh5mJUb1xW73wEfZde1c-Qti04YSkIC8CAELT1ay9IaAvy6EALw_wcB&gclsrc=aw.ds)
