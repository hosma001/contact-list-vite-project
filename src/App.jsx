import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'

function App() {
  const [userData, setUserData] = useState([]);
  const [hash, setHash] = useState(window.location.hash.slice(1) * 1);
  
  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
      const json = await response.json();
      setUserData(json);
      //console.log(json);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setHash(window.location.hash.slice(1) * 1);
    });
  }, []);

  const user = userData.find( user => hash === user.id);
  console.log(user);

  return (
      <div>
        <h1>Contact List ({ userData.length })</h1>
        <div>
          {
            user ? `Company: ${ user.company.name }` : null
          }
        </div>
        <div>
          {
            user ? `Email: ${ user.email }` : null
          }
        </div>
        <div>
          {
            user ? `Phone: ${ user.phone }` : null
          }
        </div>
        <hr/>
        <div>
          {
            userData.map( users => {
              return (
                <p key={ users.id } className={ users.id === hash ? 'selected' : '' }> 
                  <a href={`#${users.id === hash ? '': users.id}`}>
                    { users.name }
                  </a>
                </p>  
              );
            })
          }
        </div>
      </div>

  )
}

export default App
