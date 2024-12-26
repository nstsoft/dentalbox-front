import { Loader, NoData } from "@components";
import { type FC } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Row, ToothGraph } from "./components";

import "./styles.scss";

export const PeriodontalCard: FC = () => {
  const data: string[] = [];
  const isLoading = false;
  const cols = [
    "Mobility",
    "Implant",
    "Furcation",
    "Bleeding on Probing",
    "Plaque",
    "Gingival Margin",
    "Probing Depth",
  ];
  const tooths = [
    [18, 17, 16, 15, 14, 13, 12, 11],
    [21, 22, 23, 24, 25, 26, 27, 28],
  ];
  const cols1 = [
    "Gingival Margin",
    "Probing Depth",
    "Plaque",
    "Bleeding on Probing",
    "Furcation",
    "Note",
  ];

  const cols2 = [
    "Notes",
    "Furcation",
    "Bleeding on Probing",
    "Plaque",
    "Gingival Margin",
    "Probing Depth",
  ];

  const tooths1 = [
    [48, 47, 46, 45, 44, 43, 42, 41],
    [31, 32, 33, 34, 35, 36, 37, 38],
  ];

  // if (!data.length) return <NoData />;

  // if (isLoading) return <Loader />;

  return (
    <Box className="periodontal-card">
      <Typography variant="h4" className="title">
        PERIODONTAL CHART
      </Typography>

      <Row cols={cols} tooths={tooths} toothNumberPosition="top" />

      <ToothGraph name="Buccal" />

      <ToothGraph name="Palatal" />

      <Row cols={cols1} tooths={tooths} />

      <Divider className="divider">
        <Box className="divider-content">
          <Typography variant="h6">Mean Probing Depth= 0mm</Typography>
          <Typography variant="h6">Mean Attachment Level= 0mm</Typography>
          <Typography variant="h6">0% Plaque</Typography>
          <Typography variant="h6">0% Bleeding on Probing</Typography>
        </Box>
      </Divider>

      <Row cols={cols2} tooths={tooths} />

      <ToothGraph name="Lingual" />

      <ToothGraph name="Buccal" />

      <Row cols={cols} tooths={tooths1} toothNumberPosition="bottom" />
    </Box>
  );
};
