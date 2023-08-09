import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  let errMsg = '';
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errMsg = `The requested URL was not found on this server. `;
    }
    if (error.status === 401) {
      errMsg = `You aren't authorized to see this.`;
    }

    return (
      <div id="error-page" className="m-8">
        <Link to="/" className="flex items-center mb-8">
          <img src="/favicons/favicon-32x32.png" alt="logo" width={32} />
          <span className="font-monda ml-4 text-3xl">Biblical</span>
        </Link>
        <h1 className="font-semibold">
          {error.status} {error.statusText}
        </h1>
        {errMsg && errMsg}
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page" className="m-8">
        <Link to="/" className="flex items-center mb-8">
          <img src="/favicons/favicon-32x32.png" alt="logo" width={32} />
          <span className="font-monda ml-4 text-3xl">Biblical</span>
        </Link>
        <h1 className="font-semibold">Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error?.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}
