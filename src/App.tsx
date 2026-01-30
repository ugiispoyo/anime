import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnimePage from "@/pages/anime";
import DetailPage from "@/pages/detail";

import Header from "@/components/Header";
import PageWrapper from "@/components/Wrapper";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<AnimePage />} />
          <Route path="/anime/:id" element={<DetailPage />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}
