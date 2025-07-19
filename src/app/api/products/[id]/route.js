import prisma from '../../../../../lib/prisma';  


export async function DELETE(req, { params }) {
  const { id } = params;  

  try {
    
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return new Response(JSON.stringify({ message: 'Produto não encontrado' }), { status: 404 });
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Produto excluído com sucesso' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return new Response(JSON.stringify({ message: 'Erro ao excluir produto' }), { status: 500 });
  }
}
