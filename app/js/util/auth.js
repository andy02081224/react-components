const auth = {
  login(username, password) {
    if (this.authenticated()) {
      return Promise.resolve({
        authenticated: true,
        message: 'Already logged in'
      });
    }

    return new Promise((resolve, reject) => {
      if (!username.trim() || !password.trim()) {
        resolve({
          authenticated: false,
          message: 'Missing required fields',
          type: 'missing-required'
        });
        return;
      }

      fakeLoginRequest(username, password)
        .then((response) => {
          if (response.authenticated) {
            localStorage.token = response.token;
            resolve({
              authenticated: response.authenticated,
              message: response.message
            });
          } else {
            resolve({
              authenticated: response.authenticated,
              message: response.message,
              type: response.type
            });
          }
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
          message: 'Suuccessfully logged in',
          token: Math.random().toString(36).substring(7)
        });
      } else {
        resolve({
          authenticated: false,
          message: 'Invalid username or password',
          type: 'invalid-info'
        });
      }
    }, 1000);
  });

}

export default auth;
