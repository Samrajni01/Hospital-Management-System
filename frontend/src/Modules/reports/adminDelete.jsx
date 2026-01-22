import { deleteReportApi } from "./report.api";

export const handleDelete = async (id) => {
  if (!window.confirm("Delete report?")) return;
  await deleteReportApi(id);
  alert("Deleted");
};
