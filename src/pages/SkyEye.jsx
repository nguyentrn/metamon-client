import dynamic from "next/dynamic";

import App from "../components/App";
const Sidebar = dynamic(() => import("../features/Sidebar"), { ssr: false });
const Others = dynamic(() => import("../features/Others"), { ssr: false });

const Main = () => {
  return (
    <App>
      <Sidebar />
      <Others />
    </App>
  );
};

export default Main;
