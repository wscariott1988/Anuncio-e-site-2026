import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined
  );
  const qs = entries.length
    ? `?${new URLSearchParams(
        entries.map(([k, v]) => [k, String(v)])
      ).toString()}`
    : "";
  redirect(`/landingpage${qs}`);
}
