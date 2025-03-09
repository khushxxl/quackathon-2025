"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import ForestScene from "@/components/forest-ground";

export default function ForestPage() {
  const [selectedForest, setSelectedForest] = useState("edinburgh");
  const [treeCount, setTreeCount] = useState(50);
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleForestChange = (forest: string) => {
    setSelectedForest(forest);
    // Adjust tree count based on selected forest
    if (forest === "edinburgh") setTreeCount(200);
    if (forest === "glasgow") setTreeCount(300);
    if (forest === "birmingham") setTreeCount(100);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchName(searchInput);
  };

  // Sample data for forest progress graphs
  const forestData = {
    edinburgh: {
      treesPlanted: 12500,
      carbonOffset: 250,
      biodiversityIncrease: 35,
      monthlyGrowth: [120, 150, 200, 180, 220, 250],
    },
    glasgow: {
      treesPlanted: 18700,
      carbonOffset: 374,
      biodiversityIncrease: 42,
      monthlyGrowth: [180, 210, 250, 300, 330, 370],
    },
    birmingham: {
      treesPlanted: 8300,
      carbonOffset: 166,
      biodiversityIncrease: 28,
      monthlyGrowth: [80, 100, 130, 140, 150, 170],
    },
  };

  const currentForest = forestData[selectedForest as keyof typeof forestData];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main>
        <div className="relative">
          <ForestScene treeCount={treeCount} searchName={searchName} />
          <div
            className="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
            style={{ zIndex: 1000 }}
          >
            <h1 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400">
              Virtual Impact Experience
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2 mb-3">
              Explore our interactive 3D impact environment. Drag to rotate,
              scroll to zoom.
            </p>

            {/* Add tree search form */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Find your tree by name"
                  className="px-3 py-2 rounded-lg bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 w-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Search
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Find and highlight trees by name (e.g., Emma, Noah)
              </p>
            </form>

            <div className="mt-2">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Choose a forest:
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleForestChange("edinburgh")}
                  className={`px-3 py-2 rounded-lg ${
                    selectedForest === "edinburgh"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-300"
                  }`}
                >
                  Edinburgh
                </button>
                <button
                  onClick={() => handleForestChange("glasgow")}
                  className={`px-3 py-2 rounded-lg ${
                    selectedForest === "glasgow"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-300"
                  }`}
                >
                  Glasgow
                </button>
                <button
                  onClick={() => handleForestChange("birmingham")}
                  className={`px-3 py-2 rounded-lg ${
                    selectedForest === "birmingham"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-300"
                  }`}
                >
                  Birmingham
                </button>
              </div>
            </div>

            {/* Progress Graphs Section */}
            <div className="mt-6 border-t pt-4 border-gray-300 dark:border-gray-600">
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
                Forest Progress
              </h2>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-white/90 dark:bg-gray-700/90 p-3 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trees Planted
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {currentForest.treesPlanted.toLocaleString()}
                  </p>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{
                        width: `${(currentForest.treesPlanted / 20000) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-700/90 p-3 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Carbon Offset (tons)
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentForest.carbonOffset}
                  </p>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width: `${(currentForest.carbonOffset / 400) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-700/90 p-3 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Biodiversity Increase (%)
                  </h3>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {currentForest.biodiversityIncrease}%
                  </p>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div
                      className="h-2 bg-amber-500 rounded-full"
                      style={{
                        width: `${
                          (currentForest.biodiversityIncrease / 50) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-700/90 p-3 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Growth
                  </h3>
                  <div className="flex items-end h-12 mt-2 space-x-1">
                    {currentForest.monthlyGrowth.map((value, index) => (
                      <div
                        key={index}
                        className="bg-green-500 dark:bg-green-600 rounded-t w-full"
                        style={{
                          height: `${
                            (value / Math.max(...currentForest.monthlyGrowth)) *
                            100
                          }%`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Jan</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
