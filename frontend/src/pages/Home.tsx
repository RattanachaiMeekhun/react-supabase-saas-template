import type { ChartLayoutItem } from "../components/Charts/TChartType";
import Dashboard from "../components/Dashboard/Dashboard";

const Home = () => {
  const chartItems: ChartLayoutItem[] = [
    {
      key: "bar",
      title: "Bar Chart",
      insight:
        "กลุ่มอาหารมียอดขายสูงสุดในไตรมาสล่าสุด ขณะที่เครื่องเขียนต่ำสุด",
      description:
        "เปรียบเทียบยอดขายสินค้าแต่ละประเภทใน Q2/2025 (หน่วย: ล้านบาท)",
      chartType: "bar",
      chartData: {
        labels: ["เครื่องใช้ไฟฟ้า", "เสื้อผ้า", "อาหาร", "เครื่องเขียน"],
        datasets: [
          {
            label: "ยอดขาย Q2/2025",
            data: [120, 90, 150, 60],
            backgroundColor: ["#2563eb", "#06b6d4", "#22c55e", "#f59e42"],
          },
        ],
      },
      i: "bar",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "line",
      title: "Line Chart",
      insight: "จำนวนผู้ใช้งานใหม่เติบโตต่อเนื่อง โดยเฉพาะเดือนมิถุนายน",
      description: "แนวโน้มผู้ใช้งานใหม่รายเดือน (คน)",
      chartType: "line",
      chartData: {
        labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
        datasets: [
          {
            label: "ผู้ใช้งานใหม่ 2025",
            data: [120, 135, 150, 170, 160, 180],
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.2)",
            fill: true,
          },
        ],
      },
      i: "line",
      x: 2,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "pie",
      title: "Pie Chart",
      insight: "ลูกค้าส่วนใหญ่สั่งซื้อผ่าน Website รองลงมาคือ Mobile App",
      description: "สัดส่วนช่องทางการสั่งซื้อสินค้า",
      chartType: "pie",
      chartData: {
        labels: ["Website", "Mobile App", "หน้าร้าน"],
        datasets: [
          {
            label: "ช่องทาง",
            data: [55, 35, 10],
            backgroundColor: ["#2563eb", "#06b6d4", "#f59e42"],
          },
        ],
      },
      i: "pie",
      x: 4,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "doughnut",
      title: "Doughnut Chart",
      insight: "สมาชิกแบบ Free มีสัดส่วนมากที่สุด",
      description: "สัดส่วนประเภทสมาชิก",
      chartType: "doughnut",
      chartData: {
        labels: ["Free", "Premium", "Enterprise"],
        datasets: [
          {
            label: "สมาชิก",
            data: [70, 25, 5],
            backgroundColor: ["#22c55e", "#2563eb", "#ef4444"],
          },
        ],
      },
      i: "doughnut",
      x: 6,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "radar",
      title: "Radar Chart",
      insight: "คุณภาพสินค้าและบริการหลังการขายได้คะแนนสูงสุด",
      description: "คะแนนความพึงพอใจแยกตามหมวดบริการ (เต็ม 10)",
      chartType: "radar",
      chartData: {
        labels: [
          "บริการหลังการขาย",
          "ความเร็ว",
          "คุณภาพสินค้า",
          "ราคา",
          "ความสะดวก",
        ],
        datasets: [
          {
            label: "คะแนนเฉลี่ย",
            data: [8, 7, 9, 6, 8],
            backgroundColor: "rgba(99,102,241,0.2)",
            borderColor: "#6366f1",
          },
        ],
      },
      i: "radar",
      x: 0,
      y: 2,
      w: 2,
      h: 2,
    },
    {
      key: "polarArea",
      title: "Polar Area Chart",
      insight: "ภาคกลางมียอดคำสั่งซื้อสูงสุด รองลงมาคือภาคเหนือ",
      description: "จำนวนคำสั่งซื้อแยกตามภูมิภาค",
      chartType: "polarArea",
      chartData: {
        labels: ["เหนือ", "กลาง", "อีสาน", "ใต้"],
        datasets: [
          {
            label: "คำสั่งซื้อ",
            data: [80, 120, 60, 40],
            backgroundColor: ["#06b6d4", "#22c55e", "#ef4444", "#f59e42"],
          },
        ],
      },
      i: "polarArea",
      x: 2,
      y: 2,
      w: 2,
      h: 2,
    },
    {
      key: "bubble",
      title: "Bubble Chart",
      insight: "สินค้า A มียอดขายและจำนวนออเดอร์สูงสุด",
      description:
        "ยอดขายและจำนวนออเดอร์ของแต่ละสินค้า (ขนาดฟอง = จำนวนออเดอร์)",
      chartType: "bubble",
      chartData: {
        datasets: [
          {
            label: "สินค้า A",
            data: [{ x: 100, y: 30, r: 15 }],
            backgroundColor: "#2563eb",
          },
          {
            label: "สินค้า B",
            data: [{ x: 80, y: 50, r: 10 }],
            backgroundColor: "#06b6d4",
          },
          {
            label: "สินค้า C",
            data: [{ x: 60, y: 20, r: 8 }],
            backgroundColor: "#22c55e",
          },
        ],
      },
      i: "bubble",
      x: 4,
      y: 2,
      w: 2,
      h: 2,
    },
    {
      key: "scatter",
      title: "Scatter Chart",
      insight: "ผู้ใช้ที่อายุมากขึ้นมีแนวโน้มใช้จ่ายสูงขึ้น",
      description: "ความสัมพันธ์ระหว่างอายุผู้ใช้กับยอดใช้จ่าย (บาท)",
      chartType: "scatter",
      chartData: {
        datasets: [
          {
            label: "ผู้ใช้",
            data: [
              { x: 18, y: 1200 },
              { x: 25, y: 2500 },
              { x: 32, y: 1800 },
              { x: 40, y: 3000 },
              { x: 55, y: 2200 },
            ],
            backgroundColor: "#6366f1",
          },
        ],
      },
      i: "scatter",
      x: 6,
      y: 2,
      w: 2,
      h: 2,
    },
  ];

  return <Dashboard ChartItem={chartItems} />;
};

export default Home;
