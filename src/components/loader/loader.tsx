
import './loader.css';

function Loader(): JSX.Element {
  const Spinner = () => <div className="loader"></div>;

  return (
    <div className="pos-center">
      <Spinner />
    </div>
  );
}
export default Loader;
