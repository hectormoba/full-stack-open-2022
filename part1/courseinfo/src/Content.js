import Part from "./Part";

const Content = ({ content }) => {
  return (
    <div>
      {content.map((element, index) => (
        <Part key={index} element={element} />
      ))}
    </div>
  );
};

export default Content;
