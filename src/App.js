import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchFish } from "./helpers/fetcher";

import Header from "./pages/Header";
import Display from "./pages/Display";
import Home from "./pages/Home";
import "./styles/App.css";

const queryClient = new QueryClient();

// Where it all begins, wraps the entire project in react query
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pages />
    </QueryClientProvider>
  );
}

// lets us use react query whilst routing pages
function Pages() {
  const { data, error } = useQuery("fishData", fetchFish, {
    keepPreviousData: true,
    initialData: [],
  });


  const regions = Object.keys(data);
  const showError = error || regions.length === 0;

  return (
    <Router forceRefresh={true}>
      <div className="app">
        <Switch>
          <Route path="/:region">
            <Header pages={regions} />
            <Display showError={showError} fishData={data}/>
          </Route>
          <Route path="/">
            <Header pages={regions} />
            <Home showError={showError} fishData={data} regions={regions}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
