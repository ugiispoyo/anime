import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnimePage from "@/pages/anime";
import DetailPage from "@/pages/detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimePage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
