import { useState, useEffect } from 'react';
import RoutesElement from '../src/Routes/RoutesElement'
import Loader from './components/Loader';
import Header from './components/Header';
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header/>
      <main className="flex-grow">
       <RoutesElement></RoutesElement>           
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-10">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;
