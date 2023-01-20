import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home";
import Contest from "./pages/Contest";

export default function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contest" element={<Contest />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
