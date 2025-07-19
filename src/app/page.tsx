'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  missingLetter: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();
      setProducts(data); 
    };
    fetchProducts();
  }, []); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      price: parseFloat(price),
      sku,
    };

    setErrorMessage(''); 

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro desconhecido ao cadastrar produto');
        return;
      }

      const createdProduct: Product = await response.json();

      setProducts((prev) => [...prev, createdProduct]);

      setName('');
      setPrice('');
      setSku('');
    } catch (error) {
      setErrorMessage('Erro ao cadastrar produto');
      console.error('Erro no fetch:', error);
    }
  };

  const handleDelete = async (id: number) => {
    console.log(`Tentando excluir o produto com ID: ${id}`);  

    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

    if (response.ok) {
      console.log(`Produto com ID ${id} excluído com sucesso`);
      
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } else {
    
      const errorData = await response.json();
      console.error('Erro ao excluir o produto:', errorData.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Cadastro de Produtos
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Digite o nome do produto"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Digite o preço"
              required
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Digite o SKU"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center mt-2">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-full mt-4 hover:bg-blue-600 transition duration-300"
            >
              Cadastrar Produto
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-medium text-center text-gray-800 mb-4">
            Lista de Produtos
          </h2>

          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="text-lg font-medium text-gray-700">{product.name}</p>
                  <p className="text-sm text-gray-500">Preço: R$ {product.price}</p>
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  <p className="text-sm text-gray-500">
                    Letra Ausente: {product.missingLetter}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
