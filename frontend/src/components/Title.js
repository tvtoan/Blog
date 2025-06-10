import Link from "next/link";

const Title = () => {
  return (
    <div className="text-center my-5 bg-white text-black">
      <h1 className="text-2xl m-0">
        <Link href="/" className="text-black no-underline">
          LEMONARI
        </Link>
      </h1>
      <p className="text-xs m-0 text-gray-600">THE HANOI CHAMOMILE</p>
    </div>
  );
};

export default Title;
