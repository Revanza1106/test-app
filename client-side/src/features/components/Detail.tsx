"use client";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { useEffect, useState } from "react";
import { getKabupaten, type teritorry } from "../../service/api";

interface DetailProps {
  show: boolean;
  onClose: () => void;
  kode_pro: number;
  nama: string;
}

export default function Detail({ show, onClose, kode_pro, nama }: DetailProps) {
  const [data, setData] = useState<teritorry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && kode_pro) {
      setLoading(true);
      getKabupaten(kode_pro).then((res) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [show, kode_pro]);

  // chart data → agregasi per jenis di kabupaten
  const chartData = [
    { name: "PAUD", value: data.reduce((a, b) => a + b.anggaranpaud, 0) },
    { name: "PKT", value: data.reduce((a, b) => a + b.anggaranpkt, 0) },
    { name: "Kursus", value: data.reduce((a, b) => a + b.anggarankursus, 0) },
    { name: "PKBM", value: data.reduce((a, b) => a + b.anggaranpkbm, 0) },
    { name: "SKB", value: data.reduce((a, b) => a + b.anggaranskb, 0) },
  ].filter((c) => c.value > 0);

  return (
    <Modal show={show} onHide={onClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detail Provinsi {nama}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Header className="fw-bold">Tabel Kabupaten/Kota</Card.Header>
              <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Kabupaten/Kota</th>
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
                      data.map((kab) => (
                        <tr key={kab.id}>
                          <td>{kab.nama}</td>
                          <td>{kab.jmlrevpaud}</td>
                          <td>{kab.jmlrevpkt}</td>
                          <td>{kab.jmlrevkursus}</td>
                          <td>{kab.jmlrevpkbm}</td>
                          <td>{kab.jmlrevskb}</td>
                          <td>
                            Rp{" "}
                            {(
                              kab.anggaranpaud +
                              kab.anggaranpkt +
                              kab.anggarankursus +
                              kab.anggaranpkbm +
                              kab.anggaranskb
                            ).toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
