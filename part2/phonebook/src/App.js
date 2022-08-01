import { useState, useEffect } from "react";
import numbersService from "./services/numbers";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import List from "./List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    numbersService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let personAlreadyExists = persons.some((person) => person.name === newName);

    if (personAlreadyExists) {
      let personToUpdate = persons.find((person) => person.name === newName);

      let confirmation = window.confirm(
        `${personToUpdate.name} is already added to phonebook. Do you want to replace the old number with the new one? `
      );

      if (confirmation) {
        let person = { ...personToUpdate, number: newNumber };

        let id = personToUpdate.id;
        numbersService.update(id, person).then((data) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : data))
          );
        });
        setNewName("");
        setNewNumber("");
      }
    } else {
      let newObj = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };

      numbersService
        .create(newObj)
        .then((data) => setPersons(persons.concat(data)));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleClickonDelete = (id) => {
    let personName = persons.filter((person) => person.id === id)[0].name;

    let confirmation = window.confirm(`Do you want to delete ${personName}?`);

    if (confirmation) {
      numbersService
        .del(id)
        .then((_) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

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
      <List
        persons={persons}
        filter={filter}
        handleClick={handleClickonDelete}
      />
    </div>
  );
};

export default App;
