import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import TemplateBody from "./components/TemplateBody";
import Preview from "./Pages/Preview";
import NewTemplate from "./components/NewTemplate";
import NewTemplate1 from "./components/NewTemplate1";
function App() {
  return (
    <BrowserRouter basename="uday">
      <Routes>
        {/* <Route path="/" element={<TemplateBody />} /> */}
        <Route path="/" element={<NewTemplate />} />
        {/* <Route path="/" element={<NewTemplate1 />} /> */}
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
