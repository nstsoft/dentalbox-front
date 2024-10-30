import { type FC, useState, useEffect, useMemo } from "react";
import moment, { Moment } from "moment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import { AppointmentListItem } from "@types";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  AppointmentResources,
  EditableProps,
  UpdateEventHandler,
} from "../types";
import {
  AppointmentModalInput,
  AppointmentTimeRangeInput,
  AppointmentNoteInput,
} from "./elements";
import { AppointmentStatus } from "@types";
import { useTranslation } from "react-i18next";
import { getPersonNames } from "./helpers";
import { FaUserDoctor } from "react-icons/fa6";
import { SvgIcon } from "@mui/material";
import { GiNurseFemale } from "react-icons/gi";
import { FaClinicMedical } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CustomModal } from "@elements";

type CalendarEvent = Omit<
  AppointmentListItem,
  "id" | "status" | "workspace" | "_id"
> & {
  _id?: string;
  status?: AppointmentStatus;
};

type CalendarModalProps = {
  open: boolean;
  event?: CalendarEvent;
  mode?: string;
  resources: AppointmentResources;
  onClose: () => void;
  onUpdate: UpdateEventHandler;
  editableProps: EditableProps;
  onDelete: (id: string) => void;
};

export const CalenderModal: FC<CalendarModalProps> = ({
  open,
  event,
  onClose,
  onUpdate,
  resources,
  editableProps,
  onDelete,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.calendar" });

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [doctor, setDoctor] = useState<string | undefined>();
  const [cabinet, setCabinet] = useState<string | undefined>();
  const [chair, setChair] = useState<string | undefined>();
  const [patient, setPatient] = useState<string | undefined>();
  const [assistant, setAssistant] = useState<string | undefined>();
  const [status, setStatus] = useState<AppointmentStatus>(
    AppointmentStatus.pending
  );
  const [notes, setNotes] = useState<string | undefined>();
  const [start, setStart] = useState<Moment>(moment());
  const [end, setEnd] = useState<Moment>(moment());
  const chairValues = useMemo(() => {
    const arr: { key: string; value: string }[] = [];
    resources.chairsMap.forEach((p) => {
      if (p.cabinet === cabinet) {
        arr.push({ key: p._id, value: p.name });
      }
    });
    return arr;
  }, [cabinet, resources.chairsMap]);

  const doctorValues: { key: string; value: string }[] = [];
  const assistantValues: { key: string; value: string }[] = [];
  const cabinetValues: { key: string; value: string }[] = [];
  const patientValues: { key: string; value: string }[] = [];
  const statusValues: { key: string; value: string }[] = Object.values(
    AppointmentStatus
  ).map((key) => ({ key, value: t(`eventStatuses.${key}`) }));

  resources.usersMap.forEach((u) =>
    doctorValues.push({ key: u._id, value: getPersonNames(u) })
  );
  resources.cabinetsMap.forEach((c) =>
    cabinetValues.push({ key: c._id, value: c.name })
  );
  resources.patientsMap.forEach((p) =>
    patientValues.push({ key: p._id, value: getPersonNames(p) })
  );
  resources.assistantMap.forEach((p) =>
    assistantValues.push({ key: p._id, value: getPersonNames(p) })
  );

  useEffect(() => {
    if (event) {
      setDoctor(event.doctor._id);
      setAssistant(event.assistant?._id);
      setCabinet(event.cabinet._id);
      setChair(event.chair?._id);
      setPatient(event.patient?._id);
      setStatus(event.status ?? AppointmentStatus.pending);
      setStart(moment(event.start));
      setEnd(moment(event.end));
      setEnd(moment(event.end));
      setNotes(event.notes);
    }
  }, [event]);

  useEffect(() => {
    if (cabinet) {
      const availableChairs: string[] = [];
      resources.chairsMap.forEach((ch) => {
        if (ch.cabinet === cabinet) {
          availableChairs.push(ch._id);
        }
      });
      setChair(availableChairs[0]);
    }
  }, [cabinet, resources.chairsMap]);

  const isSaveButtonDisabled =
    !doctor || !cabinet || !patient || !status || !start || !end;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      className="modal-edit-appointment"
      sx={{ paddingTop: "30px" }}
    >
      <Box>
        <div className="modal-control-panel">
          {isEditingMode ? (
            <Button
              onClick={() => {
                setIsEditingMode(false);
              }}
            >
              <SaveIcon />
            </Button>
          ) : (
            <Button onClick={() => setIsEditingMode(true)}>
              <EditIcon />
            </Button>
          )}
          <Button
            onClick={() => {
              setIsEditingMode(false);
              onClose();
            }}
          >
            <CloseIcon />
          </Button>
        </div>
        <Box>
          <AppointmentTimeRangeInput
            start={start}
            end={end}
            setEnd={setEnd}
            setStart={setStart}
            isEditingMode={isEditingMode}
          />
          <AppointmentModalInput
            value={patient}
            icon={<PersonIcon />}
            label="Patient"
            isEditingMode={isEditingMode}
            items={patientValues}
            initialValue={getPersonNames(event?.patient)}
            onChange={setPatient}
            canEdit={editableProps.includes("patient")}
            searchable={true}
          />
          <AppointmentModalInput
            value={doctor}
            icon={
              <SvgIcon>
                <FaUserDoctor />
              </SvgIcon>
            }
            label="Doctor"
            isEditingMode={isEditingMode}
            items={doctorValues}
            initialValue={getPersonNames(event?.doctor)}
            onChange={setDoctor}
            canEdit={editableProps.includes("doctor")}
            searchable={true}
          />
          <AppointmentModalInput
            value={assistant}
            icon={
              <SvgIcon>
                <GiNurseFemale />
              </SvgIcon>
            }
            label="Assistant"
            isEditingMode={isEditingMode}
            items={assistantValues}
            initialValue={getPersonNames(event?.assistant)}
            onChange={setAssistant}
            canEdit={editableProps.includes("doctor")}
            searchable={true}
          />
          <AppointmentModalInput
            value={cabinet}
            icon={
              <SvgIcon>
                <FaClinicMedical />
              </SvgIcon>
            }
            label="Cabinet"
            isEditingMode={isEditingMode}
            items={cabinetValues}
            initialValue={event?.cabinet?.name}
            canEdit={editableProps.includes("cabinet")}
            onChange={(val: string) => {
              setCabinet(val);
            }}
          />
          <AppointmentModalInput
            value={chair ?? chairValues[0]?.key}
            icon={<ChairAltIcon />}
            label="Chair"
            isEditingMode={isEditingMode}
            items={chairValues}
            initialValue={event?.chair?.name}
            onChange={setChair}
            canEdit={editableProps.includes("chair")}
          />
          <AppointmentModalInput
            value={status}
            icon={<TaskAltIcon />}
            label="Status"
            isEditingMode={isEditingMode}
            items={statusValues}
            initialValue={t(`eventStatuses.${event?.status}`)}
            onChange={(st: string) => setStatus(st as AppointmentStatus)}
            canEdit={editableProps.includes("status")}
          />
          <AppointmentNoteInput
            isEditingMode={isEditingMode}
            notes={notes ?? ""}
            setNotes={setNotes}
          />
        </Box>
        <Box>
          <Button
            disabled={isSaveButtonDisabled}
            variant="contained"
            onClick={() => {
              onUpdate({
                doctor,
                cabinet,
                chair,
                patient,
                start,
                end,
                notes,
                status,
                assistant,
              });
              setIsEditingMode(false);
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            onClick={() => {
              onDelete(event?._id ?? "");
              setIsEditingMode(false);
              onClose();
            }}
          >
            <SvgIcon>
              <MdDelete />
            </SvgIcon>
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
