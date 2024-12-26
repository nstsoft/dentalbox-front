import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { type FC } from "react";

type Props = {
  cols: string[];
  tooths: number[][];
  toothNumberPosition?: "top" | "bottom";
};

export const Row: FC<Props> = ({ cols, tooths, toothNumberPosition }) => {
  return (
    <Grid2 container flexWrap={"nowrap"} spacing={1} sx={{ mb: 1 }}>
      <Grid2 size={2}>
        {toothNumberPosition === "top" && <Grid2 textAlign="end" height={21} />}
        {cols.map((col) => (
          <Grid2 key={col} textAlign="end">
            <Typography sx={{ fontSize: "14px" }}>{col}</Typography>
          </Grid2>
        ))}
        {toothNumberPosition === "bottom" && (
          <Grid2 textAlign="end" height={21} />
        )}
      </Grid2>

      {tooths.map((toothMap, index) => (
        <Grid2 sx={{ display: "flex" }} key={toothMap[0] + index}>
          {toothMap.map((tooth) => (
            <Grid2 size={0.4} key={tooth} textAlign="center">
              {toothNumberPosition === "top" && (
                <Typography variant="subtitle1" height={21}>
                  {tooth}
                </Typography>
              )}
              {cols.map((col) => (
                <Grid2 key={col + tooth} height={21} textAlign="end">
                  <TextField
                    type="text"
                    variant="outlined"
                    sx={{
                      height: "100%",
                      "& .MuiInputBase-root": { height: "100%" },
                      "& .MuiInputBase-input": { p: 0, height: "100%" },
                    }}
                  />
                </Grid2>
              ))}
              {toothNumberPosition === "bottom" && (
                <Typography variant="subtitle1" height={21}>
                  {tooth}
                </Typography>
              )}
            </Grid2>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};
