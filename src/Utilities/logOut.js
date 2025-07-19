



export function logOut(navigate, user) {
   localStorage.clear() ;
   user.setUser({}) ;
   user.setUsers([]) ;
   user.setRole("") ;
   user.setLoggedUser({}) ; 
   user.setUserToken("") ;
   user.setError(null) ;
   user.setLoading(false) ; 
   user.setTeam([]) ; 
   document.documentElement.style.setProperty("--main-color" , "#c30bf6" ) ;
   navigate("/")
}



