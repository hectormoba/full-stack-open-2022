import ListItem from "./ListItem";

const List = ({ persons, filter, handleClick }) => {
  const toShow =
    filter.length === 0
      ? persons
      : persons.filter((person) => person.name.match(new RegExp(filter, "i")));

  return (
    <>
      {toShow.map((person) => (
        <ListItem key={person.id} person={person} handleClick={handleClick} />
      ))}
    </>
  );
};

export default List;
