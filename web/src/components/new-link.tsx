//import { Header } from "./header";
import { LinkForm } from "./link-form";

export function NewLink() {
  return (
    <div className=" flex flex-col gap-2 max-w-[366px] md:max-w-[380px] w-full ">
      <LinkForm />
    </div>
  );
}
