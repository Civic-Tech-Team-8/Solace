import { useContext, useEffect } from "react";
import { updateIsSafe } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/current-user-context.js";

export default function SafeButton() {
  const { isSafe, setIsSafe } = useContext(CurrentUserContext);

  useEffect(() => {
    updateIsSafe({ isSafe });
  }, [isSafe]);

  function clickHandler(e) {
    setIsSafe(!isSafe);
    updateIsSafe({ isSafe });
    isSafe
      ? (e.target.style.backgroundColor = "red")
      : (e.target.style.backgroundColor = "green");
    isSafe
      ? (e.target.innerText = "OUT SOLACE")
      : (e.target.innerText = "IN SOLACE");
  }

  return (
    <button className="safe-button" onClick={clickHandler}>
      Solace
    </button>
  );
}
