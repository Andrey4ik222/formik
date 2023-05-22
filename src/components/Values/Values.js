import "./Values.css";

const Values = ({ firstName, email, phone }) => {
  return (
    <div className="value-wrapper">
      <h2 className="value-title">Values:</h2>
      <div>Name: {firstName}</div>
      <div>Email: {email}</div>
      <div>Phone: {phone}</div>
    </div>
  );
};

export default Values;
