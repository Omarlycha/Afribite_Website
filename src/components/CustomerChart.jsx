import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Online', value: 0 },
    { name: 'Offline', value: 0 },
  ];
  const COLORS = ['#808000', '#E2725B'];

const CustomerChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
    <PieChart>
    <Pie 
      data={[{ value: 100 }]} 
      dataKey="value" 
      innerRadius="86%" 
      outerRadius="100%" 
      fill="#BCB5B5" 
      isAnimationActive={false}       
      startAngle={180}
      endAngle={-180}
      legendType='none'
      />
    <Pie
      data={data}
      innerRadius="86%"
      outerRadius="100%"
      fill="#8884d8"
      startAngle={180}
      endAngle={-180}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>

    <Legend/>
    </PieChart>
      
    </ResponsiveContainer>
  )
}

export default CustomerChart
