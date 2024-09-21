import { useState } from "react";

type Props = {
  totalCount: number;
  pageSize?: number;
};

export const usePagination = ({ totalCount, pageSize = 20 }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (currentPage - 1) * pageSize;

  return {
    currentPage,
    totalPages,
    skip,
    limit: pageSize,
    setCurrentPage,
  };
};
