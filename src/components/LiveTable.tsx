import { useEffect, useState } from "react";

export default function LiveTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9001/ws");
    ws.onmessage = (msg) => {
      setLogs(JSON.parse(msg.data));
    };
    return () => ws.close();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Live DNS Logs</h3>
      <table className="table-auto w-full border text-sm">
        <thead><tr><th>Time</th><th>Client</th><th>Query</th></tr></thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.timestamp}</td>
              <td>{log.client}</td>
              <td>{log.query}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
