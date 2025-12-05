
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    searchParams: Record<string, string>
}

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    searchParams
}: PaginationProps) {

    if (totalPages <= 1) return null

    const getPageUrl = (page: number) => {
        const params = new URLSearchParams({ ...searchParams, page: String(page) })
        return `${baseUrl}?${params.toString()}`
    }


    const getVisiblePages = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
            // if currPage = 6 , totalPage = 10 , delta = 2 then the range = [4,5,6,7,8]
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...')
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages)
        } else {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }


    const visiblePages = getVisiblePages()

    return (
        <nav className="flex items-center justify-center gap-1">
            <Link className={`text-sm font-medium px-3 py-2 flex items-center rounded-lg ${currentPage <= 1 ? "text-gray-400 cursor-not-allowed bg-gray-100" : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"}`} aria-disabled={currentPage <= 1} href={getPageUrl(currentPage - 1)}><ChevronLeft />Previous</Link>

            {visiblePages.map((page, index) => {

                if (page === '...') {
                    return (
                        <span key={index} className="px-3 py-2 text-sm text-gray-500 ">...</span>
                    )
                }
                const pageNumber = page as number
                const isCurrentPage = currentPage === pageNumber

                return (
                    <Link key={index} className={`rounded-lg px-3 py-2 text-sm font-medium ${isCurrentPage ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"}`} href={getPageUrl(pageNumber)}>{pageNumber}</Link>
                )
            })}

            <Link className={`text-sm font-medium px-3 py-2 flex items-center rounded-lg ${currentPage >= totalPages ? "text-gray-400 cursor-not-allowed bg-gray-100" : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"}`} aria-disabled={currentPage >= totalPages} href={getPageUrl(currentPage + 1)}><ChevronRight />Next</Link>
        </nav>
    )
}