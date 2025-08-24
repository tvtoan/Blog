import React from "react";

export default function Skeleton({ variant = "default", className = "" }) {
  switch (variant) {
    case "about":
      return (
        <div
          className={`animate-pulse space-y-6 max-w-[750px] mx-auto ${className}`}
        >
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          <div className="h-[300px] bg-gray-200 rounded mx-auto"></div>
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      );

    case "post":
      return (
        <div
          className={`animate-pulse space-y-4 max-w-[750px] mx-auto ${className}`}
        >
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="flex justify-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-[420px] bg-gray-200 rounded mx-auto"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-start gap-4">
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full"></div>
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      );

    case "home":
      return (
        <div
          className={`animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
        >
          {Array(8)
            .fill()
            .map((_, index) => (
              <div key={index} className="space-y-4 p-4">
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="flex justify-center gap-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
        </div>
      );

    case "comment":
      return (
        <div className={`animate-pulse space-y-4 ${className}`}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full mt-4"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-[74px] h-[74px] bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-5/6"></div>
              <div className="flex gap-3">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`animate-pulse p-4 space-y-3 ${className}`}>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      );
  }
}
