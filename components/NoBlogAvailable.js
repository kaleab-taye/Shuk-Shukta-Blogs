import PageNotFound from '../pages/404';

export default function NoBlogAvailable() {
  return (
    <>
      <div className="max-w-contentWid 2xl:max-w-contentWidLg mx-auto grid">
        <div className="mx-auto text-center grid text-center m-auto text-xl  font-semibold font-commonFont text-onSecondary">
          <span>No Blog Found!</span>
          <span className="text-md">You create one now.</span>
        </div>
      </div>
    </>
  );
}
