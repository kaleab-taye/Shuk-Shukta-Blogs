import PageNotFound from "../pages/404";

export default function NoBlogAvailable() {
  return (
    <>
      <div className="max-w-contentWid 2xl:max-w-contentWidLg mx-auto grid">
        <div className="mx-auto text-center flex m-auto text-xl  font-semibold font-commonFont text-onSecondary">
          No Blog Available! <br /> Please create one now.
        </div>
      </div>
    </>
  );
}
