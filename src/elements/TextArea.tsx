import TextareaAutosize from "@mui/material/TextareaAutosize";

import { styled } from "@mui/material/styles";

export const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 16.5px 14px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    &:hover {
      border-color: ${theme.palette.text.primary};
    }
    &:focus, &:focus-within {
      border-color: #008fba;
      outline: 1px solid #008fba;
    }
  `
);
