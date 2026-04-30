import { useTranslations } from 'next-intl';
import { FlightList } from '@/features/flights/components/flight-list';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="mt-4 text-xl text-gray-600">{t('description')}</p>
      </div>

      <FlightList />
    </main>
  );
}
