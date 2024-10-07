import "./App.css";
import { SortingContextProvider } from "./sortingContext"; // Use the correct import
import SortingVisualizer from "./pages/SortingVisualizer";

const App = () => {
  return (
    <div className="app">
      {/* Use SortingContextProvider to wrap components */}
      <SortingContextProvider>
        <SortingVisualizer />
      </SortingContextProvider>
    </div>
  );
};

export default App;
