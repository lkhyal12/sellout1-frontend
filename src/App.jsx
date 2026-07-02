import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <>
      <main className="min-h-dvh py-18 bg-background">
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
