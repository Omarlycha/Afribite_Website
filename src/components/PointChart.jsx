import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 0 },
  { name: 'Group B', value: 100 },
];
const COLORS = ['#808000', '#E2725B'];

const PointChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
       <PieChart>
        <Pie
          data={data}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PointChart
