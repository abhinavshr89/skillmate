import React from "react";
import { Suspense } from "react";
import {BarLoader} from "react-spinners";

function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold custom-gradient leading-[100px]">Industry Insights</h1>
      </div>
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray"/>}>
        {children}
      </Suspense>
    </div>
  );
}

export default Layout;

