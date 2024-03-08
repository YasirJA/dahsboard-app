import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Dashboard = (props) => {
  const [chartData, setChartData] = useState([]);
  const barChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the 'chart_data' table based on the account ID
        const { data, error } = await props.supabase
          .from("chart_data")
          .select("*")
          .eq("account_id", props.session.user.id);
        if (error) {
          throw error;
        }
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [props?.session?.user?.id, props.supabase]);

  useEffect(() => {
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }

    // Aggregate sales data for each month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    const salesData = months.map(
      (month) => chartData.find((item) => item.month === month)?.sales || 0
    );

    // Create bar chart
    const barChartContext = document
      .getElementById("bar-chart")
      .getContext("2d");
    const barData = {
      labels: months,
      datasets: [
        {
          label: "Sales",
          data: salesData,
          backgroundColor: "rgba(75,192,192)",
          borderColor: "rgba(75,192,192)",
          borderWidth: 1,
        },
      ],
    };
    barChartRef.current = new Chart(barChartContext, {
      type: "bar",
      data: barData,
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }, [chartData]);

  return (
    <div className="App">
      <div style={{ width: "50vw", margin: "auto" }}>
        <h2>Bar Chart</h2>
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
