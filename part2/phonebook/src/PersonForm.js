const PersonForm = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  inputNameValue,
  inputNumberValue,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={inputNameValue} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input
          inputMode="numeric"
          value={inputNumberValue}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
