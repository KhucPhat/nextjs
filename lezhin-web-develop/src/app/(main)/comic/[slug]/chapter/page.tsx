import ListChapter from '@/components/feature/ListChapter';

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  return <ListChapter />;
}
