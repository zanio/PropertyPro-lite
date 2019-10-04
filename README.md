
# PropertyPro-lite

This a project titled PropertyPro-lite. It is an online platform that allow users (Agent or Customer ) to see posted property advert which may be in form of Housing, personal property and mcuh more

## Project management information on pivatal tracker

* See the project stories [here](https://www.pivotaltracker.com/n/projects/2354433).

## UI Design

I designed the UI of PropertyPro-lite  on **figma** and you can check the url for prototyping reason:
[Figma](https://www.figma.com/proto/fIy9zqI7fmW2oKMDHSKLimzl/PropertyPro-Lite?node-id=2%3A2&scaling=scale-down)


![PropertyPro-lite screenshot](/UI/images/home.png?raw=true "Home page screenshot")

## User Interface (UI) Tech Stack (Frontend)

* HTML
* CSS
* Javascript

### GitHub Pages link for UI Frontend

[PropertyPro-lite/UI link](https://zanio.github.io/PropertyPro-lite/UI)

**Note:** 
* Two types of database was used in this project. The develop branch uses postgres database
* And the non-persistence data which used javascript object model. The [bg-clean-167071582](https://zanio.github.io/PropertyPro-lite/UI) uses non-persistence

### REST API Docs

[PropertyPro-lite documentation link](https://propertpro-lite.herokuapp.com/api-docs/)

### Required Features

```
User can sign up.
User can sign in.
User (agent) can post a property advert
User (agent) can update detail of a property advert.
User (agent) can mark his/her posted advert as sold.
User (agent) can delete a property advert.
User can view all properties adverts.
User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
User can view a specific property advert.
```
### More Features

```
Users (admin) can create new admin.
User can delete his/her account. This action cannot be undone
User when logged in can Gets and display all property in his dashboard
User (agent) can report an advert
Users (admin) can flag an advert
users can see flagged property matching the particular id
users can see all flagged property
User can a specific property aaddress to be displayed on the map with the red flag
User (agent) can post a property advert
User (agent) can update detail of a property advert.
User (agent) should get Email verification when signed up
User (agent) should get Password reset link sent to user mail for if he/she does not remember the password
User (agent) should be redirected to a password reset page where he can reset password
User (agent) can reset password if he/she remembers old password

```

### Programming paradigm

```
The style of programming as seen in this project is functional. Functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It is a declarative programming paradigm in that programming is done with expressions or declarations instead of statements. Functional code is idempotent: a function's return value depends only on its arguments, so calling a function with the same value for an argument always produces the same result.
```

## Installation and Running the Application

Ensure that you have nodejs and npm installed in your computer

a. Clone this repository into your named folder

```bash
git clone -b develop https://github.com/zanio/PropertyPro-lite.git .
git status
```

b. Install the project dependencies

```bash
npm install
```

c. start the application

```bash
npm run dev
```

## Test the application

```bash
npm run test
```

## Test the endpoints

The application can be tested locally through localhost on port 3300 or through the live [url](https://propertpro-lite.herokuapp.com/api-docs/) using postman or directly with swagger

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints to test

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | api/v1/auth/signup  | Create user account  |
POST  | api/v1/auth/signin  | Login a user |
POST  | api/v1/property  | Create a property advert |
PATCH  | api/v1/property/<:property-id>  | Update property data |
PATCH  | api/v1/property/<:property-id>/sold  | Mark a property as sold so users know it’s no longer available |
DELETE  | api/v1/property/<:property-id>  | Delete a property advert |
GET  | api/v1/property/ | Get all property adverts |
GET  | api/v1/property/search?type =​ propertyType  | Get all property advertisement offering a specific type of property (e,g flat, mini-flat,etc) |
GET  | api/v1/property/<:property-id>  | View a specific property advert |

**please see the [api-docs](https://propertpro-lite.herokuapp.com/api-docs/) for a full documentation**

## Acknowledgements

* [Andela](https://andela.com/)

* [Google](https://google.com/)

## Author

* [Aniefiok Akpan](https://github.com/zanio)
