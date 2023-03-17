import { useCounter, useFetch } from "../hooks";
import { LoadingQuote, Quote } from "../03-examples";

export const Layout = () => {
  const { increment, counter } = useCounter(1);
  const { data, isLoading, hasError } = useFetch(
    `https://api.breakingbadquotes.xyz/v1/quotes/${counter}`
  );

  //si la data es true entonces me va a devolver data en la posicion 0
  const { author, quote } = !!data && data[0];

  return (
    <>
      <h1>BreakingBad Quotes</h1>
      <hr />

      {isLoading ? <LoadingQuote /> : <Quote author={author} quote={quote} />}

      <button
        onClick={() => increment()}
        disabled={isLoading}
        className="btn btn-primary"
      >
        Next quote
      </button>
    </>
  );
};
