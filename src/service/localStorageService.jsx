export let localServ = {
    setUser: (user) => {
      let dataJson = JSON.stringify(user);
      localStorage.setItem("USER_LOGIN", dataJson);
    },
  
    setAccessToken: (accessToken) => {
      let dataJson = JSON.stringify(accessToken);
      localStorage.setItem("ACCESS_TOKEN", dataJson);
    },
  
    getUser: () => {
      let dataJson = localStorage.getItem("USER_LOGIN");
      return JSON.parse(dataJson);
    },
    
    getAccessToken: () => {
      let dataJson = localStorage.getItem("ACCESS_TOKEN");
      return JSON.parse(dataJson);
    },
    
    removeUser: () => {
      localStorage.removeItem("USER_LOGIN");
    },
  
    removeAccessToken: () => {
      localStorage.removeItem("ACCESS_TOKEN");
    },
  };
  