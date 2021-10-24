import React, { useEffect } from 'react';
import { useParams, Route, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function QuoteDetails() {
    const { quoteId } = useParams();
    const match = useRouteMatch();

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId])
    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }
    if (error) {
        return <p className="centered focused">{error}</p>;
    }
    if (
        !loadedQuote.text
    ) {
        return <p className='centered'>No quote found</p>;
    }

    return (
        <>
            <HighlightedQuote
                text={loadedQuote.text}
                author={loadedQuote.author}
            ></HighlightedQuote>
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link
                        className="btn--flat"
                        to={`${match.url}/comments`}
                    >
                        Load Comments
                    </Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments></Comments>
            </Route>
        </>
    );
}

export default QuoteDetails;
