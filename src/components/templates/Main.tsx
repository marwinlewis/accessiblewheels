import Tabs, { Tab } from "../molecules/Tabs";

interface MainProps {
  title: string;
  tabs: Tab[];
  openedTab?: number;
}

const Main = ({ title, tabs, openedTab }: MainProps) => (
  <>
    {title && (
      <h1 className="text-base sm:text-xl p-4 text-center w-full max-w-7xl m-auto">
        {title}
      </h1>
    )}
    <Tabs tabs={tabs} openedTab={openedTab} />
  </>
);

export default Main;
