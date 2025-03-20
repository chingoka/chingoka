import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Card: React.FC<{ image: string }> = ({ image }) => {
  return (
    <div className="flex items-center justify-center p-4 rounded-lg bg-white shadow-md">
      <img src={image} alt="Card" className="w-full h-full object-cover rounded-lg" />
    </div>
  );
};

const Dashboard: React.FC = () => {
  // Dummy Data for Charts
  const data = [
    { name: "Jan", sales: 4000, users: 2400 },
    { name: "Feb", sales: 3000, users: 2210 },
    { name: "Mar", sales: 5000, users: 2290 },
    { name: "Apr", sales: 4780, users: 2000 },
    { name: "May", sales: 5890, users: 2181 },
    { name: "Jun", sales: 4390, users: 2500 },
    { name: "Jul", sales: 3490, users: 2100 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen mt-16 justify-center items-center">
      {/* Dashboard Content */}
      <div className="p-4 bg-gray-100 min-h-screen w-full">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Dashboard Overview</h1>

        {/* Stats Cards with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card image="src\assets\images__2_-removebg-preview.png" />
          <Card image="src\assets\images-removebg-preview (2).png" />
          <Card image="src\assets\images__9_-removebg-preview.png" />
          <Card image="src\assets\cf292218c4b993fc5df5e1286fa86ec3-removebg-preview.png" />
        </div>

        {/* Sales & Users Analytics Chart */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales & Users Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="name" stroke="gray" />
              <YAxis stroke="gray" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#ff3d00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
