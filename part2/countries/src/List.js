import ListItem from "./ListItem";

const List = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <ListItem country={country} />
      ))}
    </>
  );
};

export default List;
