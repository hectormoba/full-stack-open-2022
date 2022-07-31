import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const API_URL = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let personAlreadyExists = persons.some((person) => person.name === newName);

    if (personAlreadyExists) {
      alert(`${newName} is already added to the Numberbook`);
    } else {
      let newObj = { name: newName, number: newNumber, id: persons.length + 1 };
      setPersons(persons.concat(newObj));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    axios.get(API_URL).then((response) => setPersons(response.data));
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <h2>Add new number</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        inputNameValue={newName}
        inputNumberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
