"use client";

import { useState } from "react";
import axios from "axios";

export default function page() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarUsuarios = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            const data = response.data;
            console.table(data);
            setUsuarios(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Usuários</h1>

                <div className="text-center mb-8">
                    <div className="mb-6">
                        <button onClick={buscarUsuarios} disable={loading} className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold">
                            {loading ? "Carregando ... " : "🔍 Buscar Usuários"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {usuarios.map((usuario) => (
                    <div key={usuario.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-bold text-lg text-gray-800">{usuario.name}</h3>
                        <p className="text-gray-600">{usuario.email}</p>
                        <p className="text-gray-600">{usuario.address.city}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}''
