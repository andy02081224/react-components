const auth = {
  login(username, password) {
    if (this.authenticated()) {
      return Promise.resolve({
      	authenticated: true,
      	message: 'Already logged in'
      });
    }

    return new Promise((resolve, reject) => {
      fakeLoginRequest(username, password)
        .then((response) => {
          if (response.authenticated) localStorage.token = response.token;

          resolve({
          	authenticated: response.authenticated,
          	message: response.message
          });
        })
        .catch((reason) => {
          console.log(reason);
        });
    });


    /*
    return new Promise((resolve, reject) {
	    fetch('/loginEndPoint')
	    	.then((response) => {
	    		if (response.authenticated) {
	    			resolve(true);
	    		}
	    		else {
	    			resolve(false);
	    		}
	    	})
	    	.catch((reason) => {
	    		console.log(reason);
	    	});
    });
    */
    
  },
  logout(callback) {
    return new Promise((resolve, reject) => {
	    fetch('/logoutEndPoint')
	    	.then(() => {
	    		resolve(true);
	    	});
    });
    
  },
  authenticated() {
    return !!localStorage.token;
  }
};

function fakeLoginRequest(username, password) {
  // Fake request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'abc' && password === '123') {
        resolve({
          authenticated: true,
          token: Math.random().toString(36).substring(7),
          message: 'Suuccessfully logged in'
        });
      } else {
        resolve({
          authenticated: false,
          message: 'Invalid username or password'
        });
      }
    }, 1000);
  });

}

export default auth;
