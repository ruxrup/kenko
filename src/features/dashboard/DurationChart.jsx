import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "<100$",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "<200$",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "<300$",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "<400$",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "<500$",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "<750$",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "<1000$",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: ">=1000$",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "<100$",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "<200$",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "<300$",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "<400$",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "<500$",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "<750$",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "<1000$",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: ">=1000$",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, orders) {
  function incArrayValue(arr, field) {
    return arr.map((obj) => {
      return obj.duration === field ? { ...obj, value: obj.value + 1 } : obj;
    });
  }

  const data = orders
    .reduce((arr, cur) => {
      const num = cur.price + cur.extraPrice;
      if (num < 100) return incArrayValue(arr, "<100$");
      if (num < 200) return incArrayValue(arr, "<200$");
      if (num < 300) return incArrayValue(arr, "<300$");
      if (num < 400) return incArrayValue(arr, "<400$");
      if (num < 500) return incArrayValue(arr, "<500$");
      if (num < 750) return incArrayValue(arr, "<750$");
      if (num < 1000) return incArrayValue(arr, "<1000$");
      if (num >= 1000) return incArrayValue(arr, ">=1000$");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ orders }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, orders);
  return (
    <ChartBox>
      <Heading as={"h2"}>Order value summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey={"duration"}
            dataKey={"value"}
            innerRadius={85}
            outerRadius={110}
            cx={"40%"}
            cy={"50%"}
            paddingAngle={3}
          >
            {data.map((entry, i) => (
              <Cell fill={entry.color} stroke={entry.color} key={i} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
