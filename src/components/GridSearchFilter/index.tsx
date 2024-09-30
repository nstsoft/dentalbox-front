import { SearchInput } from "@elements";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  applyFilters: () => void;
};

export const GridSearchFilter: FC<Props> = ({
  search,
  setSearch,
  applyFilters,
}) => {
  const { t } = useTranslation("", { keyPrefix: "buttons" });

  return (
    <Grid2
      sx={{ m: 1 }}
      container
      gap={1}
      alignContent="center"
      alignItems="center"
    >
      <SearchInput value={search} onChange={setSearch} />
      <Button onClick={applyFilters}>
        {t("applyFilter")}
      </Button>
    </Grid2>
  );
};
