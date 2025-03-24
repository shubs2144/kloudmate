import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import SingleSeriesPanel from "./components/SingleSeriesPanel";
import MultiSeriesPanel from "./components/MultiSeriesPanel";

const ResponsiveGridLayout = WidthProvider(Responsive);

const singleSeriesData = {
  value: 67,
};

const multiSeriesData = [
  { label: "simple label", value: 1345.44 },
  { label: "simple label but longer", value: 44 },
  { label: "simple label but really long", value: 123.55 },
  { label: "short label", value: 567.89 },
  { label: "medium length label", value: 12 },
  { label: "extra long label to check", value: 250.67 },
  { label: "tiny label", value: 12.34 },
  { label: "a very descriptive and long", value: 98765 },
  { label: "label with numbers 12345", value: 5432.1 },
  { label: "testing with a moderately size", value: 678.9 },
];

function App() {
  const layout = {
    lg: [
      { i: "single", x: 0, y: 0, w: 4, h: 3 },
      { i: "multi", x: 0, y: 6, w: 12, h: 6 },
    ],
  };

  return (
    <div className="bg-gray-900 text-white p-4 min-h-screen">
      <h1 className="text-2xl mb-4">Statistical Dashboard</h1>

      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={100}
        margin={[16, 16]}
      >
        <div
          key="single"
          className="bg-gray-800 rounded-md overflow-hidden items-center"
        >
          <div className="p-2 border-gray-700">
            <span className="text-md text-white">Panel Title</span>
          </div>
          <div className="p-4 h-full ">
            <SingleSeriesPanel data={singleSeriesData} />
          </div>
        </div>

        <div key="multi" className="bg-gray-800 rounded-md overflow-hidden">
          <div className="p-2 border-gray-700">
            <span className="text-md text-white">Panel Title</span>
          </div>
          <div className="p-4 h-full">
            <MultiSeriesPanel data={multiSeriesData} />
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
