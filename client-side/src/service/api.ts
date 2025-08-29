export interface teritorry {
    id: number;
    kode_pro: number;
    kode_kab: number;
    nama: string;
    tingkat_label: string;
    jmlrevpaud: number;
    jmlrevpkt: number;
    jmlrevkursus: number;
    jmlrevpkbm: number;
    jmlrevskb: number;
    anggaranpaud: number;
    anggaranpkt: number;
    anggarankursus: number;
    anggaranpkbm: number;
    anggaranskb: number;
}

const API_URL = "http://localhost:5000/api/teritorry";

export async function getProvince(): Promise<teritorry[]> {
    const res = await fetch(`${API_URL}/province`);
    return res.json();
}

export async function getKabupaten(kode_pro: number): Promise<teritorry[]> {
    const res = await fetch(`${API_URL}/city/${kode_pro}`);
    return res.json();
}
