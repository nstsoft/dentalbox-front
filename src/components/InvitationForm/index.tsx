import { useLazyInviteUserQuery } from "@api";
import { CustomSelect } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Popover from "@mui/material/Popover";
import { UserRole } from "@types";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  anchorEl: HTMLButtonElement | null;
  onSubmit: () => void;
  onClose: () => void;
};

export const InvitationForm: FC<Props> = ({ anchorEl, onClose, onSubmit }) => {
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
  });
  const [inviteUser] = useLazyInviteUserQuery();
  const { t } = useTranslation("", { keyPrefix: "invitationForm" });

  const inviteUserHandler = async () => {
    if (!inviteForm.email || !inviteForm.role) return;

    await inviteUser(inviteForm);
    onSubmit();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
        <FormControl sx={{ mb: 1 }}>
          <InputLabel htmlFor="email">{t("email")}</InputLabel>
          <OutlinedInput
            id="outlined-login"
            type="email"
            onChange={(el) =>
              setInviteForm((p) => ({ ...p, email: el.target.value }))
            }
            value={inviteForm.email}
            color="primary"
            name="email"
            label="email"
            fullWidth
          />
        </FormControl>

        <CustomSelect
          data={Object.values(UserRole)
            .filter((role) => role !== UserRole.owner)
            .map((role) => ({
              value: role,
              label: t(role, { keyPrefix: "roleItems" }),
            }))}
          selected={inviteForm.role}
          setValue={(role) => setInviteForm((form) => ({ ...form, role }))}
          label={t("role")}
        />

        <Button variant="contained" onClick={inviteUserHandler}>
          {t("addStuff")}
        </Button>
      </Box>
    </Popover>
  );
};
