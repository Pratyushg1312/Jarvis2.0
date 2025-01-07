import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieGraph = ({ allAccount, setCombinedFilter }) => {
  const [data, setData] = useState([]);

  // Define colors for each slice
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  useEffect(() => {
    const brandCount =
      allAccount?.filter((account) => account?.account_type_name === "Brand")
        ?.length || 0;
    const individualCount =
      allAccount?.filter(
        (account) => account?.account_type_name === "Individual"
      )?.length || 0;
    const agencyCount =
      allAccount?.filter((account) => account?.account_type_name === "Agency")
        ?.length || 0;

    setData([
      { name: "Brand", value: brandCount },
      { name: "Agency", value: agencyCount },
      { name: "Individual", value: individualCount },
    ]);
  }, [allAccount]);

  const handleClick = (data) => {
    setCombinedFilter(
      allAccount?.filter((account) => account?.account_type_name === data?.name)
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="cardHeading">
          <h5 className="cardTitle">Account Type</h5>
        </div>
      </div>
      <div className="card-body p-0">
        <PieChart width={600} height={235}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            onClick={handleClick}
            isAnimationActive={true}
            animationDuration={1000}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default PieGraph;
