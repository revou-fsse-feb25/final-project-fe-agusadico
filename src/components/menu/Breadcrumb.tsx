import Link from "next/link";

type BreadcrumbProps = {
  categoryParam: string;
  searchQuery: string;
};

export default function Breadcrumb({ categoryParam, searchQuery }: BreadcrumbProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/products" className="hover:text-red-600">Menu</Link>
          {categoryParam && (
            <>
              <span className="mx-2">›</span>
              <span className="text-gray-800 capitalize">{categoryParam}</span>
            </>
          )}
          {searchQuery && (
            <>
              <span className="mx-2">›</span>
              <span className="text-gray-800">Search: "{searchQuery}"</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}