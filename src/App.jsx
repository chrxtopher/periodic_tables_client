import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo("/dashboard");
  }, []);
};

export default App;
