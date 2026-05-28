import { useState } from "react";

const initialShops = [
  { id: 1, name: "Shop Alpha", sales: 12400, revenue: 3100, month: "May 2026" },
  { id: 2, name: "Shop Beta", sales: 9800, revenue: 2450, month: "May 2026" },
  { id: 3, name: "Shop Gamma", sales: 15200, revenue: 3800, month: "May 2026" },
];

const initialAttendance = [
  { id: 1, worker: "James O.", shop: "Shop Alpha", shift: "Morning", date: "2026-05-28", status: "Present" },
  { id: 2, worker: "Sara M.", shop: "Shop Beta", shift: "Evening", date: "2026-05-28", status: "Present" },
  { id: 3, worker: "Leo K.", shop: "Shop Gamma", shift: "Morning", date: "2026-05-28", status: "Absent" },
  { id: 4, worker: "Nina P.", shop: "Shop Alpha", shift: "Night", date: "2026-05-28", status: "Present" },
  { id: 5, worker: "Tom R.", shop: "Shop Beta", shift: "Morning", date: "2026-05-27", status: "Late" },
  { id: 6, worker: "Amy J.", shop: "Shop Gamma", shift: "Evening", date: "2026-05-27", status: "Present" },
];

const STATUS_COLORS = {
  Present: "#22c55e",
  Absent: "#ef4444",
  Late: "#f59e0b",
};

const TABS = ["Sales & Revenue", "Attendance & Shifts"];

export default function App() {
  const [tab, setTab] = useState(0);
  const [shops, setShops] = useState(initialShops);
  const [attendance, setAttendance] = useState(initialAttendance);

  // Add shop form state
  const [newShop, setNewShop] = useState({ name: "", sales: "", revenue: "", month: "May 2026" });
  const [newAttendance, setNewAttendance] = useState({ worker: "", shop: "Shop Alpha", shift: "Morning", date: "", status: "Present" });

  const totalSales = shops.reduce((s, r) => s + r.sales, 0);
  const totalRevenue = shops.reduce((s, r) => s + r.revenue, 0);
  const presentCount = attendance.filter(a => a.status === "Present").length;
  const absentCount = attendance.filter(a => a.status === "Absent").length;
  const lateCount = attendance.filter(a => a.status === "Late").length;

  function addShop() {
    if (!newShop.name || !newShop.sales || !newShop.revenue) return;
    setShops([...shops, { id: Date.now(), ...newShop, sales: Number(newShop.sales), revenue: Number(newShop.revenue) }]);
    setNewShop({ name: "", sales: "", revenue: "", month: "May 2026" });
  }

  function addAttendance() {
    if (!newAttendance.worker || !newAttendance.date) return;
    setAttendance([...attendance, { id: Date.now(), ...newAttendance }]);
    setNewAttendance({ worker: "", shop: "Shop Alpha", shift: "Morning", date: "", status: "Present" });
  }

  function removeShop(id) { setShops(shops.filter(s => s.id !== id)); }
  function removeAttendance(id) { setAttendance(attendance.filter(a => a.id !== id)); }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f14",
      fontFamily: "'Georgia', serif",
      color: "#e8e4da",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderBottom: "2px solid #c9a84c",
        padding: "28px 40px 20px",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: "#c9a84c", marginBottom: 6, textTransform: "uppercase" }}>
          Management System
        </div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "normal", letterSpacing: 2, color: "#f0eadc" }}>
          Work & Shop Statistics
        </h1>

        {/* Summary Cards */}
        <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
          {[
            { label: "Total Sales", value: `$${totalSales.toLocaleString()}`, accent: "#c9a84c" },
            { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, accent: "#c9a84c" },
            { label: "Present Today", value: presentCount, accent: "#22c55e" },
            { label: "Absent Today", value: absentCount, accent: "#ef4444" },
            { label: "Late Today", value: lateCount, accent: "#f59e0b" },
          ].map(card => (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${card.accent}44`,
              borderRadius: 10,
              padding: "14px 22px",
              minWidth: 130,
            }}>
              <div style={{ fontSize: 11, color: "#9a9080", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 26, fontWeight: "bold", color: card.accent }}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 28, borderBottom: "none" }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              background: tab === i ? "#c9a84c" : "transparent",
              color: tab === i ? "#0f0f14" : "#c9a84c",
              border: "1px solid #c9a84c",
              borderRight: i === 0 ? "none" : "1px solid #c9a84c",
              borderRadius: i === 0 ? "6px 0 0 6px" : "0 6px 6px 0",
              padding: "9px 24px",
              cursor: "pointer",
              fontSize: 13,
              letterSpacing: 1,
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "36px 40px" }}>

        {/* SALES & REVENUE TAB */}
        {tab === 0 && (
          <div>
            <h2 style={{ fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: "#c9a84c", fontWeight: "normal", marginBottom: 20 }}>
              Shop Sales & Revenue
            </h2>

            {/* Add Shop Form */}
            <div style={{
              background: "#1a1a2e",
              border: "1px solid #2a2a4a",
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "flex-end",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>SHOP NAME</label>
                <input value={newShop.name} onChange={e => setNewShop({ ...newShop, name: e.target.value })}
                  placeholder="e.g. Shop Delta"
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>SALES ($)</label>
                <input type="number" value={newShop.sales} onChange={e => setNewShop({ ...newShop, sales: e.target.value })}
                  placeholder="0"
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>REVENUE ($)</label>
                <input type="number" value={newShop.revenue} onChange={e => setNewShop({ ...newShop, revenue: e.target.value })}
                  placeholder="0"
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>MONTH</label>
                <input value={newShop.month} onChange={e => setNewShop({ ...newShop, month: e.target.value })}
                  placeholder="May 2026"
                  style={inputStyle} />
              </div>
              <button onClick={addShop} style={addBtnStyle}>+ Add Shop</button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#1a1a2e" }}>
                    {["Shop Name", "Month", "Sales ($)", "Revenue ($)", "Margin %", "Action"].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shops.map((s, i) => {
                    const margin = s.sales > 0 ? ((s.revenue / s.sales) * 100).toFixed(1) : "0.0";
                    return (
                      <tr key={s.id} style={{ background: i % 2 === 0 ? "#13131e" : "#17172a", transition: "background 0.2s" }}>
                        <td style={tdStyle}><span style={{ color: "#c9a84c", fontWeight: "bold" }}>{s.name}</span></td>
                        <td style={tdStyle}>{s.month}</td>
                        <td style={tdStyle}>${s.sales.toLocaleString()}</td>
                        <td style={tdStyle}>${s.revenue.toLocaleString()}</td>
                        <td style={tdStyle}>
                          <span style={{
                            background: Number(margin) > 30 ? "#22c55e22" : Number(margin) > 20 ? "#f59e0b22" : "#ef444422",
                            color: Number(margin) > 30 ? "#22c55e" : Number(margin) > 20 ? "#f59e0b" : "#ef4444",
                            padding: "3px 10px", borderRadius: 20, fontSize: 12,
                          }}>{margin}%</span>
                        </td>
                        <td style={tdStyle}>
                          <button onClick={() => removeShop(s.id)} style={deleteBtnStyle}>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#1e1e32", borderTop: "2px solid #c9a84c" }}>
                    <td style={{ ...tdStyle, color: "#c9a84c", fontWeight: "bold" }}>TOTAL</td>
                    <td style={tdStyle}>—</td>
                    <td style={{ ...tdStyle, color: "#c9a84c", fontWeight: "bold" }}>${totalSales.toLocaleString()}</td>
                    <td style={{ ...tdStyle, color: "#c9a84c", fontWeight: "bold" }}>${totalRevenue.toLocaleString()}</td>
                    <td style={tdStyle}>
                      <span style={{ color: "#c9a84c" }}>
                        {totalSales > 0 ? ((totalRevenue / totalSales) * 100).toFixed(1) : "0.0"}%
                      </span>
                    </td>
                    <td style={tdStyle}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {tab === 1 && (
          <div>
            <h2 style={{ fontSize: 16, letterSpacing: 3, textTransform: "uppercase", color: "#c9a84c", fontWeight: "normal", marginBottom: 20 }}>
              Attendance & Shifts
            </h2>

            {/* Add Attendance Form */}
            <div style={{
              background: "#1a1a2e",
              border: "1px solid #2a2a4a",
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "flex-end",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>WORKER NAME</label>
                <input value={newAttendance.worker} onChange={e => setNewAttendance({ ...newAttendance, worker: e.target.value })}
                  placeholder="e.g. John D."
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>SHOP</label>
                <select value={newAttendance.shop} onChange={e => setNewAttendance({ ...newAttendance, shop: e.target.value })}
                  style={inputStyle}>
                  {shops.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>SHIFT</label>
                <select value={newAttendance.shift} onChange={e => setNewAttendance({ ...newAttendance, shift: e.target.value })}
                  style={inputStyle}>
                  {["Morning", "Evening", "Night"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>DATE</label>
                <input type="date" value={newAttendance.date} onChange={e => setNewAttendance({ ...newAttendance, date: e.target.value })}
                  style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2 }}>STATUS</label>
                <select value={newAttendance.status} onChange={e => setNewAttendance({ ...newAttendance, status: e.target.value })}
                  style={inputStyle}>
                  {["Present", "Absent", "Late"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={addAttendance} style={addBtnStyle}>+ Add Record</button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#1a1a2e" }}>
                    {["Worker", "Shop", "Shift", "Date", "Status", "Action"].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a, i) => (
                    <tr key={a.id} style={{ background: i % 2 === 0 ? "#13131e" : "#17172a" }}>
                      <td style={tdStyle}><span style={{ color: "#e8e4da", fontWeight: "500" }}>{a.worker}</span></td>
                      <td style={tdStyle}>{a.shop}</td>
                      <td style={tdStyle}>
                        <span style={{
                          fontSize: 11, letterSpacing: 1,
                          color: a.shift === "Morning" ? "#f59e0b" : a.shift === "Evening" ? "#818cf8" : "#64748b",
                          textTransform: "uppercase",
                        }}>{a.shift}</span>
                      </td>
                      <td style={tdStyle}>{a.date}</td>
                      <td style={tdStyle}>
                        <span style={{
                          background: `${STATUS_COLORS[a.status]}22`,
                          color: STATUS_COLORS[a.status],
                          padding: "3px 12px", borderRadius: 20, fontSize: 12,
                        }}>{a.status}</span>
                      </td>
                      <td style={tdStyle}>
                        <button onClick={() => removeAttendance(a.id)} style={deleteBtnStyle}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary row */}
            <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
              {[["Present", presentCount, "#22c55e"], ["Absent", absentCount, "#ef4444"], ["Late", lateCount, "#f59e0b"]].map(([label, count, color]) => (
                <div key={label} style={{
                  flex: 1,
                  background: `${color}11`,
                  border: `1px solid ${color}44`,
                  borderRadius: 8,
                  padding: "12px 18px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, color: "#9a9080", letterSpacing: 2, marginBottom: 4, textTransform: "uppercase" }}>{label}</div>
                  <div style={{ fontSize: 28, color, fontWeight: "bold" }}>{count}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  background: "#0f0f14",
  border: "1px solid #2a2a4a",
  borderRadius: 6,
  color: "#e8e4da",
  padding: "8px 12px",
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  minWidth: 130,
};

const addBtnStyle = {
  background: "#c9a84c",
  color: "#0f0f14",
  border: "none",
  borderRadius: 6,
  padding: "9px 20px",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: "bold",
  fontFamily: "inherit",
  letterSpacing: 1,
};

const deleteBtnStyle = {
  background: "transparent",
  color: "#ef4444",
  border: "1px solid #ef444444",
  borderRadius: 5,
  padding: "4px 12px",
  cursor: "pointer",
  fontSize: 12,
  fontFamily: "inherit",
};

const thStyle = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: 11,
  letterSpacing: 2,
  color: "#9a9080",
  textTransform: "uppercase",
  borderBottom: "1px solid #2a2a4a",
};

const tdStyle = {
  padding: "13px 16px",
  borderBottom: "1px solid #1e1e2e",
  color: "#c8c4bc",
};
