const Filter = ({ value, handleChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with </label>
      <input value={value} onChange={handleChange} name="filter" />
    </div>
  );
};

export default Filter;
