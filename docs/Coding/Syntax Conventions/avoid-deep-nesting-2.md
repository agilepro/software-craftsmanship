#  Avoid Unnecessary Nesting

It is well recognized that long routines with a lot of nesting can create code that is difficult to read.  Even if indented correctly, it is hard over many lines to accurately match the indent amount, particularly if indented a lot.  JavaScript takes this to a new level because you can create inline functions which are all operating asynchronously.  Execution order does not follow order of the code, as one request (an http request for example) sets up a function to be called when that request completes.  Here I make the case for simplifying the code by avoiding unnecessary nesting.

## Before

Here is an example real code.  It is correctly written, but as you will see, there are three asynchronous calls being made, and three levels of call back functions being defined.  See if you can get that correctly from the code:

```java
authService.loginToServer = function(user) {
    //initiateLogin:: getting the challenge from server
    authService.getChallenge(user.userId).success(function (resp) {
        var challenge = resp.challenge;
        //deliverChallenge:: Delivering the challenge to provider SSOFI
        authService.deliverChallenge(challenge).success(function (resp) {
            //deliverToken:: Sending the token to server
            var token = resp.token;
            if(angular.isUndefined(token)){
                var errorData = {
                    title:"Token value received as : "+token,
                    detail: JSON.stringify(response)
                };
                authService.userNotLoggedIn(errorData);
            }
            authService.deliverToken(token, challenge).success(function (resp) {
                if(!angular.isUndefined(resp.verified) && resp.verified){
                    isloggedIn = true;
                    user.isloggedIn = true;
                    user.userMsg=  "Logged in as , "+user.userName;
                }
            }).error(function (error) {
                $log.warn("Error while delivering token to server::"+ error );
                 authService.userNotLoggedIn(error);
            });
        }).error(function (error) {
            alert("Error while delivering Challenge to provider.");
            $log.warn("Error while delivering Challenge to provider::"+ error );
            authService.userNotLoggedIn(error);
        });
    })
    .error(function (error) {
        $log.warn("Error while initiating Login to server::"+ error );
        authService.userNotLoggedIn(error);
    });
}

```


There is nothing illegal in this code, but it is hard to read because you have to pay careful attention to the definitions of new functions, and count all the braces carefully, to be sure which error handler fits with which function call.

## After

Imagine instead that we break this into three functions, one for each step. The first call is made (or fails). If successful, it calls the second step, which makes its call. If that is successful, it calls the third step. In each case, the error handler is near the request call, and is easy to match up. It is clear which variables are available in which scopes. OVerall this looks far easier to understand what is going on, and will surely help in debugging / maintenance in the future.

```java
authService.loginToServerStep1 = function(user) {
    //initiateLogin:: getting the challenge from server
    authService.getChallenge(user.userId).success(function (resp) {
        authService.loginToServerStep2(user, resp.challenge);
    })
    .error(function (error) {
        $log.warn("Error while initiating Login to server::"+ error );
        authService.userNotLoggedIn(error);
    });
}
authService.loginToServerStep2 = function(user, challenge) {
    //deliverChallenge:: Delivering the challenge to provider SSOFI
    authService.deliverChallenge(challenge).success(function (response) {
        var token = response.token;
        if(!angular.isUndefined(token)){
            authService.loginToServerStep3(user, challenge, token);
        }
        else {
            var errorData = {
                title:"Token value received as : "+token,
                detail: JSON.stringify(response)
            };
            authService.userNotLoggedIn(errorData);
        }
    }).error(function (error) {
        alert("Error while delivering Challenge to provider.");
        $log.warn("Error while delivering Challenge to provider::"+ error );
        authService.userNotLoggedIn(error);
    });
}
authService.loginToServerStep3 = function(user, challenge, token) {
    //deliverToken:: Sending the token to server for validation
    authService.deliverToken(token, challenge).success(function (resp) {
        if(!angular.isUndefined(resp.verified) && resp.verified){
            isloggedIn = true;
            user.isloggedIn = true;
            user.userMsg=  "Logged in as , "+user.userName;
        }
    }).error(function (error) {
        $log.warn("Error while delivering token to server::"+ error );
        authService.userNotLoggedIn(error);
    });
}

```


The code does exactly the same thing. Well, actually, while doing this I found a bug in the original code which has been fixed. I can't prove that this format made it easier to find the bug, but I believe this format clarifies the logic, and makes it easier to find such problems.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/08/27/avoid-unnecessary-nesting/ "Permalink to Avoid Unnecessary Nesting").