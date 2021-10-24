import { Route, Switch, Redirect } from 'react-router-dom';
import AllQuotes from './pages/AllQuotes';
import NewQuotes from './pages/NewQuotes';
import QuoteDetails from './pages/QuoteDetails';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/quotes"></Redirect>
                </Route>
                <Route path="/quotes" exact>
                    <AllQuotes></AllQuotes>
                </Route>
                <Route path="/quotes/:quoteId">
                    <QuoteDetails></QuoteDetails>
                </Route>
                <Route path="/new-quote">
                    <NewQuotes></NewQuotes>
                </Route>
                <Route path="*">
                    <NotFound></NotFound>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
