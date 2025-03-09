"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  const router = useRouter();
  return (
    <header className="top-0 sticky z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-poppins-bold text-green-600 dark:text-green-400"
            >
              The Green Life
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("mission")}
              className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection("campaigns")}
              className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
            >
              Volunteer
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("feedback")}
              className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
            >
              Feedback
            </button>

            <button
              onClick={() => router.push("/forum")}
              className="font-poppins  dark:text-gray-300 bg-gradient-to-r from-green-500 to-green-600 text-white dark:hover:text-white px-3 py-2 text-sm rounded transition-colors"
            >
              Community Forums
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
