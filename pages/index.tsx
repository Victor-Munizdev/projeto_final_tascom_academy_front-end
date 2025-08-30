
import { useEffect, useState } from 'react';
import Header from '../src/components/Header';
import PortfolioCard from '../src/components/PortfolioCard';
import { PortfolioService } from '../src/services/portfolioService';

interface Portfolio {
  id: number;
  name: string;
  skills: string;
  email?: string;
  phone?: string;
  description?: string;
}

export default function Home() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolios() {
      setLoading(true);
      const service = PortfolioService.getInstance();
      const response = await service.getAllPortfolios();
      if (response.success && response.data && Array.isArray(response.data.data)) {
        setPortfolios(response.data.data);
      } else {
        setPortfolios([]);
      }
      setLoading(false);
    }
    fetchPortfolios();
  }, []);

  return (
    <>
      <Header />
      <main className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Portfólios</h1>
        {loading ? (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>Carregando...</div>
        ) : portfolios.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>Nenhum portfólio encontrado.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} onDelete={() => {}} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
