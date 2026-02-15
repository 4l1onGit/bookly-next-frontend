"use client";

const BookCardSkeleton = () => {
  return (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg">
      <div className="p-4">
        <div className="h-60 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-20 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
