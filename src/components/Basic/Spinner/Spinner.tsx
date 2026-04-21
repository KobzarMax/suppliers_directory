import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container" role="status" aria-label="Loading">
      <span className="spinner"></span>
    </div>
  );
}