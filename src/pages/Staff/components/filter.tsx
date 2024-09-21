import { SearchInput, CustomMultiSelect } from "@elements";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { UserRole } from "@types";

const verifiedItems = ["verified", "notVerified"];

type Props = {
  verified: string[];
  setRole: Dispatch<SetStateAction<string[]>>;
  setIsVerified: Dispatch<SetStateAction<string[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
  roles: string[];
  search: string;
  applyFilters: () => void;
};

export const Filter: FC<Props> = ({
  verified,
  setRole,
  setIsVerified,
  roles,
  search,
  setSearch,
  applyFilters,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });

  return (
    <Grid2
      sx={{ m: 1 }}
      container
      gap={1}
      alignContent="center"
      alignItems={"center"}
    >
      <SearchInput value={search} onChange={setSearch} />
      <CustomMultiSelect
        data={Object.values(verifiedItems).map((el) => ({
          value: el,
          label: t(`verifiedItems.${el}`),
        }))}
        selected={verified}
        setValue={setIsVerified}
        label={t("verification")}
      />
      <CustomMultiSelect
        data={Object.values(UserRole).map((role) => ({
          value: role,
          label: t(`roleItems.${role}`),
        }))}
        selected={roles}
        setValue={setRole}
        label={t("roles")}
      />
      <Button onClick={applyFilters}>
        {t("applyFilter", { keyPrefix: "buttons" })}
      </Button>
    </Grid2>
  );
};
