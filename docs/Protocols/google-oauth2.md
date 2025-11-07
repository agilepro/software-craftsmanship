# OAuth 2.0 to Google

The purpose of this page is to clarify exactly how you would integrate a bare bones web application with Google to allow people to authenticate.

Authentication is simply proving WHO the user is, and OAuth it is done without ever seeing the password.  You won't be able to take over the user's account else or access anything else, but you will get reliable confirmation of who the user is.

Once the user is authenticates, I assume you application is going to handle all the authorization of what that user has access to in your own application.  Google doesn't know what you want to allow this user to do, and so there is no way to access this from Google.  Your application is handling authorization, but you want to get the authentication (the login user id) from Google so that the user does not need to set up a separate password for your application.

Once the user is logged into Google, they will come to your application and see a "Log in with Google" button.  They press that button, confirm that they want to allow Google to authenticate them, and then they will be logged into your application, and you will reliably know their name and email address (and maybe some other things)

This document will tell you exactly what must be sent where to accomplish this.

# Setting up Google Project

You have to set some things up before Google will allow you to do this.  First you have to register a project with Google Cloud so that it knows what to do with the requests that are received.  

Go to: [https://console.cloud.google.com/](https://console.cloud.google.com/)

As the project owner, you will need to be logged into Google, and Google will always associate this project with you.  Keep track of the account you use to register because you will need to come back to that account if you want to change anything in the project.

Take a look at the terms of service, and agree to them.

Clicking on "Select Project" will brin gup a screen that will allow you to create a new project.

Name your project. You don't need to specify an organization.

It should be created, and you can select the project.

In the project screen, you should see on the left column a link for "API and Services"

Look again in the left column for "OAuth consent screen".  This is a screen that Google will present to the user to ask them if they consent to sharing information with your application.

### App information

I got a prompt saying that auth was not configured, and it had a button to "get started"

Enter the application name: probably the same as the project name.  Put your email in can there is a need for support

### Setting up Users

You are prompted for internal or external.  As far as I can tell, internal is where you set up a specific set of users that are useful only for your application.  That is not what you want, because you want people to use the account that they are already logged into.  Internal users would force them to log out of their normal user, and into a special one.  So choose external.  When you finally open this up for use there will be a need to verify the app.

Enter contact info

And Finish.  you might need to refresh the browser.

# Create OAuth Client

Click on create client.  You application is going to be the client.  For me it was a web application.  Give it a name.  

### Authorized JavaScript origins

This has to be specified in order to defeat the CORS protection in the browser.  This is the web address of the place where the page that people will be redirecting from, or will be including Google JavaScript from.  You have to tell Google this information, so it can tell the browser that it knows about your application and to please please please allow this JS to run.  

Remember this is for your JS code to make a request to Google API, and it is going to be the address that the browser thinks it requested the page from.  I am running app locally, so I will use the local web address for this (localhost:8080)

If the site has multiple places it might be hosted you can enter multiple addresses.

### Authorized redirect URIs

The user's browser will be redirected to Google so they can answer the question with a log-in session there.  Once they have successfully logged in, Google will redirect back to this.  Again, any address that the browser can see is find, so you can use "localhost" even if Google can not access that.

You will probably want to make a new page in your application, because this page will need to receive the information back from Google for processing.  You will need to confirm the token provided because you can't just trust that a token received this way is valid.

I got a client id like this:  516813515475-bi2ambf4e82jhb3d4uab4dsn9vcvskbu.apps.googleusercontent.com

You should see the OAuth client listed in a list of clients.

# Setting Data Access (Scope)

Again in the left you should see "Data Access" option.  Click on that and you should see an ability to "Add or Remove Scopes"

Scopes are different pieces of data that you can get from Google itself as part of the authenticating process.

You will need

* userinfo.email is going to be the authenticated email for the user.  That is your key, and your application should use this as the way to identify the user that has logged in.
* userinfo.profile should be where the name of the user is.

If you just want authentication, that should be all you need.

# Test Users

There is a link for "Audience" and in there is a button to set up test users.  Only the users listed in the test users will be allowed to log in.

You should add yourself as a test user so that you can try yourself to authenticate this way.  Later you can try a second test user to test switching between accounts.

# Initial Redirect

The whole process starts on you web application where you know the user is not logged in.  You might have several ways to authenticate, but one way is a button that says "Log in with Google".

This button redirect to the google login UI at:

https://accounts.google.com/o/oauth2/v2/auth?client_id={**clientid**}&redirect_uri={**place to return**}&response_type=code&scope=email%20profile%20openid"/

That takes you first to a screen that you select which account to use, and then to a screen to confirm you want to actually log in and share profile information with you application.

## Initial Return

The Google system returns the browser to the URL you specified, but it includes some additional query parameters.

* code - this is a special value you can use to get a token, while the token is what you use to get everything else.
* scope - returns back the accepted scopes from the ones you specified
* authuser - This was set to 0 for me, not sure what that means
* prompt - I got "consent" which you mean the user consented.  Presumably if they didn't consent nothing else would work.

# Getting the token

The code given is not the token needed to get anything else, so the first thing to do is to request the token at `https://oauth2.googleapis.com/token`.  Everything up to this point is "front channel" that goes through the browser and the information is all in query parameters.  The code is then used, along with the client secret, to get the actual token on the "back channel".

the request is a POST request with the following data encoded as URLEncoding within the POST request body.

* client_id - your client id for your application endpoint.
* client_secret - The client secret obtained from the Cloud Console Clients page.
* code - The authorization code returned from the initial request.
* grant_type - As defined in the OAuth 2.0 specification, this field's value must be set to authorization_code.
* redirect_uri- One of the redirect URIs listed for your project in the Cloud Console Clients page for the given client_id.

This returns a JSON structure, and token is of of the option in the JSON object.

# Getting the email address

To get the user's email a call must be made to the following using the token as a bearer authentication token.




# References

* [Google Reference on Auth service calls](https://developers.google.com/identity/protocols/oauth2/web-server)
