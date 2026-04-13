"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";

type Stats = {
  total_users: number;
  emails_send: number;
  ai_failed: number;
  ai_sucess: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchstatus = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`)
    // fetch("http://127.0.0.1:8000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
    };
    fetchstatus(); // initialize the fetch status

    const interval=setInterval(fetchstatus,3000); // after every 3 second it will auto refresh

    return ()=> clearInterval(interval); // it will clean the things
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        Loading...
      </div>
    );
  }

  const chartData = [
    { name: "Users", value: stats.total_users },
    { name: "Emails", value: stats.emails_send },
    { name: "AI Fail", value: stats.ai_failed },
    { name: "AI Success", value: stats.ai_sucess },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white min-h-screen pt-24 px-6 pb-10 space-y-8">
      
      <Navbar />

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Monitoring Dashboard 📊
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Track system performance and AI activity in real-time
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        
        {[
          { label: "Total Users", value: stats.total_users },
          { label: "Emails Sent", value: stats.emails_send },
          { label: "AI Failures", value: stats.ai_failed },
          { label: "AI Success", value: stats.ai_sucess },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-[1.03] hover:shadow-purple-500/20 transition-all duration-300"
          >
            <CardContent className="p-5">
              <p className="text-sm text-gray-300">{item.label}</p>
              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>
            </CardContent>
          </Card>
        ))}

      </div>

      {/* Chart */}
      <Card className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-lg">
        <CardContent className="p-6 h-[320px]">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Analytics Overview
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              
              <XAxis 
                dataKey="name" 
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
              />
              
              <YAxis 
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
              />
              
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e2f",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                }}
              />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="#8b5cf6"
              />

            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}