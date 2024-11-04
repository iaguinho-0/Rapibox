import React, { useState, useEffect } from 'react';
import Sidebar from '../../Session/SidebarSession';
import InfoPerfil from '../../Session/InfoPerfil';
import ProfilePerfilMock from '../../../assets/ProfilePerfilMock2.png';

interface SessaoLogadaProps {}

interface ItemPedido {
    nome: string;
    detalhes: string;
    imagem: string;
    preco: number;
    quantidade: number;
}

const Entregas: React.FC<SessaoLogadaProps> = () => {
    const [nomeUsuario, setNomeUsuario] = useState<string | null>(null); 
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<ItemPedido | null>(null);

    useEffect(() => {
        const nome = localStorage.getItem('nomeUsuario');
        setNomeUsuario(nome);
    }, []);

    const openModal = (item: ItemPedido) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setModalVisible(false);
    };

    const items: ItemPedido[] = [
        {
            nome: 'Cadeira Gamer - Fortrek',
            detalhes: 'Vermelho | 15 Kg',
            imagem: '/path/to/cadeira-gamer.jpg',
            preco: 759.00,
            quantidade: 51,
        },
        {
            nome: 'Mouse Gamer',
            detalhes: 'RGB | 200g',
            imagem: '/path/to/mouse-gamer.jpg',
            preco: 120.00,
            quantidade: 30,
        },
        // Adicione mais itens conforme necessário
    ];

    const calcularTotal = () => {
        return items.reduce((total, item) => total + item.preco * item.quantidade, 0);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-16">

                {/* Perfil do Usuário */}
                <div className="flex justify-end mb-6 pt-28">
                    <InfoPerfil 
                        name={nomeUsuario || 'Usuário'} 
                        cargo={'admin'} 
                        profileImage={ProfilePerfilMock} 
                        onNotificationClick={() => console.log('Notificação clicada')} 
                    />
                </div>

                {/* Card Principal de Entregas */}
                <div className="bg-white p-6 shadow-lg rounded-lg ">
                    {/* Cabeçalho de Código do Pedido e Rastreamento */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-black">Código: 3354654654526</h2>
                        <div className="flex space-x-4">
                            <button className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded">Dashboard</button>
                            <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded">Rastreio</button>
                        </div>
                    </div>

                    {/* Detalhes da Postagem e Estimativa de Entrega */}
                    <div className="text-gray-600 text-sm mb-6">
                        <p>Data de postagem: <span className="font-semibold text-black">Feb 16, 2022</span></p>
                        <p className="text-orange-600 font-semibold">Entrega estimada: 16/09/2025</p>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span className="font-semibold text-orange-600">(SS) Solicitando Serviço</span>
                            <span>(MR) Motoboy em Rota</span>
                            <span>(PE) Produto Entregue</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <div className="w-1/3 h-1 bg-orange-600"></div>
                            <div className="w-1/3 h-1 bg-gray-300"></div>
                            <div className="w-1/3 h-1 bg-gray-300"></div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                            <span>30/08/2025</span>
                            <span>05/09/2025</span>
                            <span>16/09/2025</span>
                        </div>
                    </div>

                    {/* Itens no Pedido */}
                    <h2 className="text-lg font-semibold text-center mb-4 text-black">ITENS NO PEDIDO</h2>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                <img src={item.imagem} alt={item.nome} className="w-20 h-20 bg-gray-200 rounded" />
                                <div className="flex flex-col flex-grow ml-4">
                                    <h3 className="font-semibold text-gray-700">{item.nome}</h3>
                                    <p className="text-gray-500 text-sm">{item.detalhes}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-700">R${item.preco.toFixed(2)}</p>
                                    <p className="text-gray-500 text-sm">Qty: {item.quantidade}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sumário */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">Sumário</h2>
                        <div className="flex justify-between mt-2 font-semibold text-black">
                            <p>Total</p>
                            <p className="text-orange-600">R${calcularTotal().toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Modal */}
                    {modalVisible && selectedItem && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                                <img src={selectedItem.imagem} alt={selectedItem.nome} className="w-full h-40 object-cover rounded mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">{selectedItem.nome}</h3>
                                <p className="mt-4 text-gray-600">{selectedItem.detalhes}</p>
                                <p className="mt-2 text-gray-800 font-semibold">Preço: R${selectedItem.preco.toFixed(2)}</p>
                                <p className="text-gray-600">Quantidade: {selectedItem.quantidade}</p>
                                <button 
                                    className="mt-6 bg-orange-600 text-white px-4 py-2 rounded"
                                    onClick={closeModal}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Entregas;
