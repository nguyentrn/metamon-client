import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import SkyEye from "../pages/SkyEye";
import NotFound from "../pages/NotFound";
import Background from "./Background";

function Main() {
  return (
    <>
      <Background />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" index element={<SkyEye />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Main;
