import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/Header";
import { MainPage } from "./pages/MainPage";
import AudioContextProvider from "./context/AudioContext";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <Header />
      <Router>
        <QueryClientProvider client={queryClient}>
          <AudioContextProvider>
            <Routes>
              <Route path='/' element={<MainPage />} />
            </Routes>
          </AudioContextProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
};

export default App;
