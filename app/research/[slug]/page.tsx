import { redirect } from "next/navigation";

type FacultyProfileProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyFacultyProfilePage({ params }: FacultyProfileProps) {
  const { slug } = await params;
  redirect(`/research-team/${slug}`);
}
