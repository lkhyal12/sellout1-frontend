export function getErrMsg(err) {
  return err.response?.data?.message || err.message || "Something went wrong";
}
