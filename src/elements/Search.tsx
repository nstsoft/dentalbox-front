import { styled, SxProps, Theme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction, FC } from "react";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "35px",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey["50"],
  height: "35px",
  marginLeft: 0,
  width: "100%",
  maxWidth: "250px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
  ".MuiSvgIcon-root": {
    color: "green",
  },
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  sx?: SxProps<Theme>;
};

export const SearchInput: FC<Props> = ({ value, onChange, sx }) => {
  const { i18n } = useTranslation();
  return (
    <Search sx={{ ...sx, mt: 1, mb: 1 }}>
      <SearchIconWrapper>
        <StyledSearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={i18n.language === "ua" ? "Пошук..." : "Search…"}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </Search>
  );
};
