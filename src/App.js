import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import TemplateBody from "./components/TemplateBody";
import Preview from "./Pages/Preview";
function App() {
  return (
    <BrowserRouter basename="uday">
      <Routes>
        <Route path="/" element={<TemplateBody />} />
        <Route path="/uday/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
