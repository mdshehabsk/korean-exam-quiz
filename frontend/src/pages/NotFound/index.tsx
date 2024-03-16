
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh" >
      <h1>Oops! Page not found.</h1>
      <p>We couldn't find the page you were looking for. Here are some options:</p>
      <ul>
        <li>Go back to the <Link  className="text-blue-700" to="/">homepage</Link>.</li>
        <li>Try searching for what you're looking for.</li>
      </ul>
    </div>
  );
}

export default NotFound;
