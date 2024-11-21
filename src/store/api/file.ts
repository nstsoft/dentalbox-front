import { createApi } from "@reduxjs/toolkit/query/react";
import type { PatientFile } from "@types";
import { REDUCER, FILE_TAG } from "../constants";
import { baseQuery } from "./baseQuery";

export const fileApi = createApi({
  reducerPath: REDUCER.FILE,
  tagTypes: Object.values(FILE_TAG),
  baseQuery,
  endpoints: (builder) => ({
    getFiles: builder.query<{ data: PatientFile[]; count: number }, string>({
      query: (patientId) => `/file/${patientId}`,
      providesTags: () => [{ type: FILE_TAG.FILE_LIST }],
    }),
    uploadPatientFile: builder.mutation<
      void,
      { notes: string; file: File; patientId: string }
    >({
      query: ({ file, patientId, ...body }) => {
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        }

        formData.append("data", JSON.stringify(body));

        return {
          body: formData,
          url: `/file/${patientId}`,
          method: "POST",
        };
      },
      invalidatesTags: [FILE_TAG.FILE_LIST],
    }),
    updatePatientFileComment: builder.mutation<
      void,
      { notes: string; fileId: string }
    >({
      query: ({ notes, fileId }) => ({
        url: `/file/${fileId}`,
        method: "PATCH",
        body: { notes },
      }),
      invalidatesTags: [FILE_TAG.FILE_LIST],
    }),
    deletePatientFile: builder.mutation<void, string>({
      query: (fileId) => ({
        url: `/file/${fileId}`,
        method: "DELETE",
      }),
      invalidatesTags: [FILE_TAG.FILE_LIST],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useUploadPatientFileMutation,
  useUpdatePatientFileCommentMutation,
  useDeletePatientFileMutation,
} = fileApi;

export default { fileApi };
