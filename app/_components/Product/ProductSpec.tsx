export function ProductSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-white bg-zinc-800 p-2 rounded-lg">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}