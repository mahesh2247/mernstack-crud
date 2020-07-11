//save login response (user's name and token) saved to session storage
export const authenticate = (response, next) => {
    if(window !== 'undefined')
    {
        sessionStorage.setItem('token',JSON.stringify(response.data.token));
        sessionStorage.setItem('user',JSON.stringify(response.data.name)); //convert to JSON object
    }

    next();
};
//access token name from session storage
export const getToken = () => {
    if(window !== 'undefined')
    {
        if(sessionStorage.getItem('token'))
        {
            return JSON.parse(sessionStorage.getItem('token')); //parse JSON data and convert to Javascript object
        }else {
            return false;
        }
       
        
    }

  
};
//access user name from session storage
export const getUser = () => {
    if(window !== 'undefined')
    {
        if(sessionStorage.getItem('user'))
        {
            return JSON.parse(sessionStorage.getItem('user')); //parse JSON data and convert to Javascript object
        }else {
            return false;
        }
       
        
    }

  
};


//remove token from session storage

export const logout = next => {
    if(window !== 'undefined')
    {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user'); //convert to JSON object
    }

    next();
};