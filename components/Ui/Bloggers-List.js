import NoBlogAvailable from "../NoBlogAvailable";
import Blogger_Card from "./Blogger-Card";
import BodyLayout from "./BodyLayout";

export default function Bloggers_List({bloggers}) {
    return (
        <>
          <BodyLayout>
            {bloggers.length > 0 ? (
              <div >
                {bloggers.map((blogger) => {
                  return (
                    <>
                      <Blogger_Card blogger={blogger} />
                    </>
                  );
                })}
              </div>
            ) : (
              <NoBlogAvailable />
            )}
          </BodyLayout>
        </>
      );
}
