const ListItem = ({ handleClick, person }) => {
  const { name, number, id } = person;

  return (
    <div>
      <span>
        {name} {number}
      </span>
      <button onClick={() => handleClick(id)}>delete</button>
    </div>
  );
};

export default ListItem;
