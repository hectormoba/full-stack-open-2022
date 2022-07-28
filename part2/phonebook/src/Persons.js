const Persons = ({ persons, filter }) => {
  const toShow =
    filter.length === 0
      ? persons
      : persons.filter((person) => person.name.match(new RegExp(filter, "i")));

  return (
    <>
      {toShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
