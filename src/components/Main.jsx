import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SkyEye from "../pages/SkyEye";
import NotFound from "../pages/NotFound";
import Background from "./Background";
import MetamonGame from "../features/MetamonGame";

function Main() {
  return (
    <>
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skyeye" index element={<SkyEye />} />
        <Route path="/game" index element={<MetamonGame />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Main;
