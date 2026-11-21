function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-[#232B40] bg-[#151B2B] p-4 motion-reduce:animate-none">
      <div className="h-3 w-8 rounded bg-[#232B40]"></div>
      <div className="mt-2 h-3 w-12 rounded bg-[#232B40]"></div>
      <div className="mx-auto mt-2 h-24 w-24 rounded-full bg-[#232B40]"></div>
      <div className="mx-auto mt-4 h-5 w-24 rounded bg-[#232B40]"></div>
      <div className="mx-auto mt-3 h-6 w-20 rounded-full bg-[#232B40]"></div>
      <div className="mt-4 h-9 w-full rounded-lg bg-[#232B40]"></div>
    </div>
  );
}

export default SkeletonCard;