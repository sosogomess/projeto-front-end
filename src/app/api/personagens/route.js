let personagens = [];

export async function GET() {
  return Response.json(personagens);
}

export async function POST(request) {
  const data = await request.json();
  const novoPersonagem = {
    id: personagens.length + 1,
    ...data
  };
  personagens.unshift(novoPersonagem);
  return Response.json(novoPersonagem, { status: 201 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  personagens = personagens.filter(p => p.id !== id);
  return Response.json({ ok: true });
}

export async function PUT(request) {
  const { id, ...rest } = await request.json();
  personagens = personagens.map(p => p.id === id ? { ...p, ...rest } : p);
  return Response.json({ ok: true });
}
