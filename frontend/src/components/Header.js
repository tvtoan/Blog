import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">
          <Link href="/">Hanoi Chamomile</Link>
        </h1>
      </div>
    </header>
  );
}
