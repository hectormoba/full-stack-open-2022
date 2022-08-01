import { useState, useEffect } from "react";
import numbersService from "./services/numbers";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import List from "./List";
import FeedbackMessage from "./FeedbackMessage";
import "./index.css";

const getMessageText = (name, type) => {
  return type === "error"
    ? `${name} has been already deleted`
    : type === "update"
    ? `${name} has been updated successfully`
    : `${name} has been added successfully`;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState({
    error: false,
    message: null,
  });

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
        numbersService
          .update(id, person)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id !== id ? person : data))
            );
            setFeedbackMessage({
              error: false,
              message: getMessageText(newName, "update"),
            });
          })
          .catch((_) => {
            setFeedbackMessage({
              error: true,
              message: getMessageText(newName, "error"),
            });
          });
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setFeedbackMessage({ eror: false, message: null });
        }, 3000);
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
      setFeedbackMessage({
        error: false,
        message: getMessageText(newName, "create"),
      });
      setTimeout(() => {
        setFeedbackMessage({ eror: false, message: null });
      }, 3000);
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
      <FeedbackMessage feedback={feedbackMessage} />
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
