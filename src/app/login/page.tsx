export default async function Page({ params }: { params: Promise<any> }) {
  const resolvedParams = await params;
  
  return (
    <section className="container section">
      <p className="eyebrow">Paramètres : {JSON.stringify(resolvedParams)}</p>
      <h1 className="display">Page en construction : /login</h1>
    </section>
  );
}
