"use client";
import { Card, Row, Col, Table } from "react-bootstrap";
import { MapContainer, TileLayer } from "react-leaflet";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import "leaflet/dist/leaflet.css";
import Detail from "./Detail";
import { useEffect, useState } from "react";
import { getProvince, type teritorry } from "../../service/api";

export default function Dashboard() {
const [show, setShow] = useState(false);
const [selectedProvinsi, setSelectedProvinsi] = useState<{kode_pro: number; nama: string} | null>(null);
const [provinces, setProvinces] = useState<teritorry[]>([]);
const [loading, setLoading] = useState(false);

const handleClose = () => setShow(false);
const handleShow = (prov: teritorry) => {
  setSelectedProvinsi({ kode_pro: prov.kode_pro, nama: prov.nama });
  setShow(true);
};

useEffect(() => {
setLoading(true);
getProvince().then((data) => {
    setProvinces(data);
    setLoading(false);
});
}, []);

const chartData = [
{ name: "PAUD", value: provinces.reduce((a, b) => a + b.anggaranpaud, 0), color: "#28a745" },
{ name: "PKT", value: provinces.reduce((a, b) => a + b.anggaranpkt, 0), color: "#ffc107" },
{ name: "Kursus", value: provinces.reduce((a, b) => a + b.anggarankursus, 0), color: "#0dcaf0" },
{ name: "PKBM", value: provinces.reduce((a, b) => a + b.anggaranpkbm, 0), color: "#0d6efd" },
{ name: "SKB", value: provinces.reduce((a, b) => a + b.anggaranskb, 0), color: "#dc3545" },
].filter((c) => c.value > 0);

return (
    <>
        <div style={{ marginLeft: "250px", padding: "20px" }}>
        <Row className="mb-4">
            <Col md={8}>
            <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold">Persebaran Program Revitalisasi</Card.Header>
                <Card.Body>
                <div style={{ height: "400px" }}>
                    <MapContainer
                    center={[-2.5489, 118.0149]}
                    zoom={5}
                    style={{ height: "100%", borderRadius: "12px" }}
                    >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </MapContainer>
                </div>
                </Card.Body>
            </Card>
            </Col>

            <Col md={4}>
            <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold">Anggaran Revitalisasi</Card.Header>
                <Card.Body>
                <div style={{ height: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip
                        formatter={(value: number) =>
                            `Rp ${value.toLocaleString("id-ID")}`
                        }
                        />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
                </Card.Body>
            </Card>
            </Col>
        </Row>

        <Row>
            <Col>
            <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold">
                Tabel Revitalisasi Berdasarkan Provinsi
                </Card.Header>
                <Card.Body>
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>Provinsi</th>
                        <th>PAUD</th>
                        <th>PKT</th>
                        <th>Kursus</th>
                        <th>PKBM</th>
                        <th>SKB</th>
                        <th>Total Anggaran</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading && (
                        <tr>
                        <td colSpan={7}>Loading...</td>
                        </tr>
                    )}
                    {!loading &&
                        provinces.map((prov) => (
                        <tr
                            key={prov.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleShow(prov)}
                        >
                            <td style={{ color: "blue" }}>{prov.nama}</td>
                            <td>{prov.jmlrevpaud}</td>
                            <td>{prov.jmlrevpkt}</td>
                            <td>{prov.jmlrevkursus}</td>
                            <td>{prov.jmlrevpkbm}</td>
                            <td>{prov.jmlrevskb}</td>
                            <td>
                            Rp{" "}
                            {(
                                prov.anggaranpaud +
                                prov.anggaranpkt +
                                prov.anggarankursus +
                                prov.anggaranpkbm +
                                prov.anggaranskb
                            ).toLocaleString("id-ID")}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                </Card.Body>
            </Card>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col>
            <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold">Diagram Batang Anggaran</Card.Header>
                <Card.Body>
                <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `Rp ${value / 1_000_000_000}M`} />
                        <Tooltip
                        formatter={(value: number) =>
                            `Rp ${value.toLocaleString("id-ID")}`
                        }
                        />
                        <Bar dataKey="value" fill="#0d6efd" />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </div>

    {selectedProvinsi && (
    <Detail
        show={show}
        onClose={handleClose}
        kode_pro={selectedProvinsi.kode_pro}
        nama={selectedProvinsi.nama}
    />
    )}
    </>
);
}
