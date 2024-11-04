import "./styles.scss";
import Box from "@mui/material/Box";
import { useLazyGetHistoryItemsQuery, useGetHistoryItemsQuery } from "@api";
import { type FC } from "react";
import { ControlPanel } from "./components";
import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

type Props = { patientId: string; dateFilter: { to?: Dayjs; from?: Dayjs } };

export const CaseHistory: FC<Props> = ({ patientId }) => {
  const [dateFilter, setDateFilter] = useState<{ to?: Dayjs; from?: Dayjs }>(
    {}
  );

  const [fetchHistory, { data, isUninitialized }] =
    useLazyGetHistoryItemsQuery();

  useEffect(() => {
    if (isUninitialized) {
      fetchHistory({
        patientId,
      });
    }
  }, [fetchHistory, isUninitialized, patientId]);

  const apply = () => {
    fetchHistory({
      patientId,
      from: dateFilter?.from?.toISOString(),
      to: dateFilter?.to?.toISOString(),
    });
  };

  return (
    <Box className="case-history">
      <ControlPanel
        apply={apply}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <div>case history</div>
    </Box>
  );
};
