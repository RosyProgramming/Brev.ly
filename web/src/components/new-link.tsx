import { Header } from "./header";
import { LinkForm } from "./link-form";

export function NewLink() {
  return (
    <div className=" flex flex-wrap ">
      <Header />
      <LinkForm />
    </div>
  );
}
