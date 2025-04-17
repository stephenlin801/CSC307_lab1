// src/MyApp.jsx
import React, {useState, useEffect}  from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {

    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
    const removedchar = characters.at(index);
    console.log(removedchar);
    

    deleteUser(removedchar["id"])
    .then((res) => {
        if (res.status === 204){
          const updated = characters.filter((character, i) => {
            return i !== index;
        });
          setCharacters(updated);
        }
        else{
          throw new Error("204 not received");
        }
      }

    )
    .catch((error) => {console.log(error);})

    }

    function updateList(person) { // need to make it so that the list only updates if code 201 is returned, see if current implementation is ok, ask if backend needs to reject if no 201, though that wouldn't make sense
      postUser(person) 
      .then((response) => {
        console.log(response.status);
        if(response.status !== 201){
          throw new Error("not 201 status");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCharacters([...characters, data]);
      })
      .catch((error) => {
        console.log(error);
      })
      }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function deleteUser(id) {
      const promise = fetch("http://localhost:8000/users/"+id, {
        method: "DELETE"
      });

      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );


  return (
    <div className="container">
      <Table characterData={characters}
      removeCharacter={removeOneCharacter}/>
      <Form handleSubmit={updateList}/>
    </div>
  );
}



export default MyApp;