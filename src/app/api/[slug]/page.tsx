import { apiConfigurations } from '@apidocs/common';
import { APIPage } from '@/components/APIPage';

export async function generateStaticParams() {
  return apiConfigurations.map((apiConfig) => ({ slug: apiConfig.id }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <APIPage apiId={slug} />;
}
