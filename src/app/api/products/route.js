import prisma from '../../../../lib/prisma'; 


function calculateMissingLetter(name) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const nameLowerCase = name.toLowerCase().replace(/[^a-z]/g, ''); 
  const lettersPresent = new Set(nameLowerCase); 

  for (let letter of alphabet) {
    if (!lettersPresent.has(letter)) {
      return letter; 
    }
  }
  return '_'; 
}


export async function POST(req) {
  try {
    const { name, price, sku } = await req.json();

    if (!name || name.trim() === "") {
      return new Response(JSON.stringify({ message: 'Nome do produto é obrigatório' }), { status: 400 });
    }

    if (price <= 0) {
      return new Response(JSON.stringify({ message: 'Preço deve ser maior que zero' }), { status: 400 });
    }

    if (!sku || sku.trim() === "") {
      return new Response(JSON.stringify({ message: 'SKU é obrigatório' }), { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      return new Response(JSON.stringify({ message: 'SKU já existe' }), { status: 400 });
    }

    const product = await prisma.product.create({
      data: { name, price, sku },
    });

    const missingLetter = calculateMissingLetter(product.name);

    return new Response(
      JSON.stringify({ ...product, missingLetter }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return new Response(JSON.stringify({ message: 'Erro ao criar o produto' }), { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    const productsWithMissingLetter = products.map((product) => ({
      ...product,
      missingLetter: calculateMissingLetter(product.name),
    }));

    return new Response(JSON.stringify(productsWithMissingLetter), { status: 200 });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return new Response(JSON.stringify({ message: 'Erro ao listar produtos' }), { status: 500 });
  }
}
