import React from "react";

const SarcasmRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="dashboard"
          element={<DummyPage name={"Fake Dashboard"} />}
        />
      </Route>
      <Route path="dummy" element={<DummyPage name={"fake Page"} />} />
    </Routes>
  );
};

export default SarcasmRoute;
