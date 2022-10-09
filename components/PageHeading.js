import { useRouter } from "next/router";
import BackButton from "./BackButton";

export default function PageHeading(props) {
  const router = useRouter()
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-5 ">
        <div className={props.className}>
        {props.heading}
        </div>
        </div>
        <BackButton to={props.backTo} className="col-span-1" />
      </div>
    </>
  );
}
